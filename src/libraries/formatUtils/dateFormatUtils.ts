import { isValid } from "date-fns";

export function safeFormatToISO(value: any) {
  return value instanceof Date && isValid(value)
    ? value?.toISOString()
    : undefined;
}
