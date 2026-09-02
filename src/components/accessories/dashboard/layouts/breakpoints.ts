/**
 * Dashboard responsive breakpoints and column configuration for react-grid-layout.
 *
 * Kept in its own module, free of any browser/session-storage dependency, so the breakpoint mapping can be
 * unit-tested in isolation.
 */

export const defaultGridLayoutCols: { [key: string]: number } = {
	lg: 12,
	md: 12,
	sm: 12,
	xs: 12,
	xxs: 12,
};

export const defaultGridLayoutBreakpoints = {
	lg: 1280,
	md: 992,
	sm: 760,
	xs: 490,
	xxs: 0,
};

/**
 * Determine breakpoint to apply based on display size
 * @param width number
 * @returns The breakpoint to be applied
 */
export const getBreakpointFromWidth = (width: number): string => {
	if (width >= defaultGridLayoutBreakpoints.lg) {
		return 'lg';
	}

	if (width >= defaultGridLayoutBreakpoints.md) {
		return 'md';
	}

	if (width >= defaultGridLayoutBreakpoints.sm) {
		return 'sm';
	}

	if (width >= defaultGridLayoutBreakpoints.xs) {
		return 'xs';
	}

	// OH2-475: below the xs breakpoint (phone widths) use the xxs layout, which stacks the widgets
	// full-width, instead of falling back to md and squeezing them into half-width columns
	return 'xxs';
};
