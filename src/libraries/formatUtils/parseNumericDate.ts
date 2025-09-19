import moment from "moment";

/**
 * Parse a date from 'YYYYMMDD' format
 * @param value - The value to parse
 * @returns the parsed date or null if the format wasn't correct
 */
export function parseNumericDate(value: string) {
  if (!/^(\d){8}$/.test(value)) {
    try {
      return moment(value).toDate();
    } catch {
      return null;
    }
  }
  return moment(value, "YYYYMMDD").toDate();
}
