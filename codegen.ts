import { mkdir, readdir } from 'node:fs/promises';
import openapiTS, { astToString } from 'openapi-typescript';
import ts from 'typescript';

const FILE = ts.factory.createTypeReferenceNode(
	ts.factory.createIdentifier('File'),
);
const NULL = ts.factory.createLiteralTypeNode(ts.factory.createNull());

const ast = await openapiTS(new URL('./api/oh.yaml', import.meta.url), {
	transform(schemaObject, _metadata) {
		if (schemaObject.format === 'binary') {
			return {
				schema: schemaObject.nullable
					? ts.factory.createUnionTypeNode([FILE, NULL])
					: FILE,
				questionToken: true,
			};
		}
	},
});

let exists = false;
try {
	await readdir('./src/__generated__');
	exists = true;
} catch {
	console.warn('Directory does not exist');
}

if (!exists) {
	await mkdir('./src/__generated__');
}

const output = Bun.file('./src/__generated__/openapi.ts');

if (await output.exists()) {
	await output.delete();
}

const writer = output.writer();

writer.write(astToString(ast));

writer.end();
