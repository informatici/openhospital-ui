import moment from "moment";
import { TOrder } from "./types";

const formats = [
  "DD/MM/YYYY",
  "YYYY-MM-DD",
  "YYYY-MM-DD HH:mm:ss",
  "DD/MM/YYYY HH:mm:ss",
];
export function dateComparator<Key extends keyof any>(order: TOrder, key: Key) {
  let reverse = order === "desc" ? 1 : -1;
  return (a: any, b: any) => {
    if (moment(b[key], formats).isAfter(moment(a[key], formats))) {
      return 1 * reverse;
    }
    if (moment(b[key], formats).isBefore(moment(a[key], formats))) {
      return -1 * reverse;
    }
    return 0;
  };
}

export function defaultComparator<Key extends keyof any>(
  order: TOrder,
  key: Key
) {
  let reverse = order === "desc" ? 1 : -1;
  return (a: any, b: any) => {
    if (a[key] < b[key]) return 1 * reverse;
    if (a[key] > b[key]) return -1 * reverse;
    return 0;
  };
}
