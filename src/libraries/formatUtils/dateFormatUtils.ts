import { isValid } from "date-fns";

export function safeFormatToIso(value: any) {
  return value instanceof Date && isValid(value)
    ? value?.toISOString()
    : undefined;
}
