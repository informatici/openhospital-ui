import { MOBILE_BREAKPOINT } from "../../consts";

/**
 * Check if width is less than breakpoint
 * @param {number} width (in px)
 * @param breakpoint - defaults to MOBILE_BREAKPOINT
 */
export const isMobile = (
  width: number,
  breakpoint = MOBILE_BREAKPOINT
): boolean => width < breakpoint;

/**
 * Check if width is gtoe than breakpoint
 * @param {number} width (in px)
 * @param breakpoint - defaults to MOBILE_BREAKPOINT
 */
export const isDesktop = (
  width: number,
  breakpoint = MOBILE_BREAKPOINT
): boolean => width >= breakpoint;
