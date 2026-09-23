import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { FIELD_LENGTHS } from './consts';

/**
 * Reads `components.schemas.<DTO>.properties.<field>.maxLength` out of the
 * specification. The block is read by indentation rather than through a YAML
 * parser so that the check costs the project no dependency; a specification
 * written differently yields no constraint, and every expectation below fails.
 */
const readPublishedLengths = (): Record<string, Record<string, number>> => {
	const lines = readFileSync(
		new URL('../api/oh.yaml', import.meta.url),
		'utf8',
	).split('\n');

	const published: Record<string, Record<string, number>> = {};
	let inSchemas = false;
	let schema = '';
	let property = '';

	for (const line of lines) {
		if (/^ {2}schemas:\s*$/.test(line)) {
			inSchemas = true;
			continue;
		}
		if (!inSchemas) continue;
		if (/^ {0,2}\S/.test(line)) {
			inSchemas = false;
			continue;
		}

		const schemaName = line.match(/^ {4}([A-Za-z0-9_]+):\s*$/);
		if (schemaName) {
			schema = schemaName[1];
			property = '';
			continue;
		}

		const propertyName = line.match(/^ {8}([A-Za-z0-9_]+):\s*$/);
		if (propertyName) {
			property = propertyName[1];
			continue;
		}

		const maxLength = line.match(/^ {10}maxLength: (\d+)\s*$/);
		if (maxLength && schema && property) {
			published[schema] ??= {};
			published[schema][property] = Number(maxLength[1]);
		}
	}

	return published;
};

const published = readPublishedLengths();

const declared: Record<string, Record<string, number>> = FIELD_LENGTHS;

const cases = Object.entries(declared).flatMap(([schema, fields]) =>
	Object.entries(fields).map(([property, length]) => ({
		field: `${schema}.${property}`,
		schema,
		property,
		length,
	})),
);

describe('FIELD_LENGTHS', () => {
	it('reads the lengths the specification publishes', () => {
		expect(Object.keys(published).length).toBeGreaterThan(0);
	});

	it.each(cases)('$field keeps the length the API accepts', ({
		schema,
		property,
		length,
	}) => {
		expect(published[schema]?.[property]).toBe(length);
	});
});
