import { describe, expect, it } from 'vitest';
import { getBreakpointFromWidth } from './breakpoints';

describe('getBreakpointFromWidth', () => {
	it('maps desktop and tablet widths to their breakpoints', () => {
		expect(getBreakpointFromWidth(1440)).toBe('lg');
		expect(getBreakpointFromWidth(1280)).toBe('lg');
		expect(getBreakpointFromWidth(1000)).toBe('md');
		expect(getBreakpointFromWidth(800)).toBe('sm');
		expect(getBreakpointFromWidth(500)).toBe('xs');
	});

	it('maps phone widths below the xs breakpoint to xxs (OH2-475: no longer falls back to md)', () => {
		expect(getBreakpointFromWidth(489)).toBe('xxs');
		expect(getBreakpointFromWidth(390)).toBe('xxs');
		expect(getBreakpointFromWidth(0)).toBe('xxs');
	});
});
