import moment from "moment";
import { TOrder } from "./types";

const formats = [
  "DD/MM/YYYY",
  "YYYY-MM-DD",
  "YYYY-MM-DD HH:mm:ss",
  "DD/MM/YYYY HH:mm:ss",
];
export function dateComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (moment(b[orderBy], formats).isAfter(moment(a[orderBy], formats))) {
    return 1;
  }
  if (moment(b[orderBy], formats).isBefore(moment(a[orderBy], formats))) {
    return -1;
  }
  return 0;
}
export function defaultComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function getComparator<Key extends keyof any>(
  order: TOrder,
  orderBy: Key,
  descendingComparator: (
    a: any,
    b: any,
    orderBy: any
  ) => number = defaultComparator
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
