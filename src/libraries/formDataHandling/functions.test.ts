import { describe, expect, it } from 'vitest';
import { removeTime } from './functions';

describe('removeTime', () => {
	it('returns an invalid date without throwing', () => {
		expect(() => removeTime(new Date(Number.NaN))).not.toThrow();
		expect(removeTime(new Date(Number.NaN))).toBe('Invalid Date');
	});

	it('handles a cleared or dropped field value', () => {
		expect(removeTime(null)).toBe('');
		expect(removeTime(undefined)).toBe('');
	});

	it('removes the time without mutating the provided date', () => {
		const date = new Date('2026-08-27T14:30:45.000Z');
		const expectedLocalDate = [
			date.getFullYear(),
			`${date.getMonth() + 1}`.padStart(2, '0'),
			`${date.getDate()}`.padStart(2, '0'),
		].join('-');

		expect(removeTime(date)).toBe(expectedLocalDate);
		expect(date.toISOString()).toBe('2026-08-27T14:30:45.000Z');
	});

	it('keeps the calendar day selected at local midnight', () => {
		const date = new Date(2026, 7, 28);

		expect(removeTime(date)).toBe('2026-08-28');
	});

	it('removes the time from an ISO date string', () => {
		const date = new Date('2026-08-27T14:30:45.000Z');
		const expectedLocalDate = [
			date.getFullYear(),
			`${date.getMonth() + 1}`.padStart(2, '0'),
			`${date.getDate()}`.padStart(2, '0'),
		].join('-');

		expect(removeTime('2026-08-27T14:30:45.000Z')).toBe(expectedLocalDate);
	});
});
