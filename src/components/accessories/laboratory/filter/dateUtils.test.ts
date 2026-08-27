import { describe, expect, it } from 'vitest';
import {
	formatLocalFilterDateFrom,
	formatLocalFilterDateTo,
	isFutureLocalDate,
} from './dateUtils';

describe('laboratory filter date utilities', () => {
	it('keeps the locally selected calendar day in the API range', () => {
		const selectedDate = new Date(2026, 7, 28);

		expect(formatLocalFilterDateFrom(selectedDate)).toBe(
			'2026-08-28T00:00:00.000Z',
		);
		expect(formatLocalFilterDateTo(selectedDate)).toBe(
			'2026-08-28T23:59:59.999Z',
		);
	});

	it('does not consider today future just after local midnight', () => {
		const now = new Date(2026, 7, 28, 0, 12);
		const today = new Date(2026, 7, 28);

		expect(isFutureLocalDate(today, now)).toBe(false);
	});

	it('still rejects the following local calendar day', () => {
		const now = new Date(2026, 7, 28, 23, 59);
		const tomorrow = new Date(2026, 7, 29);

		expect(isFutureLocalDate(tomorrow, now)).toBe(true);
	});
});
