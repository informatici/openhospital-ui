import { TOrder } from "./types";
import moment from "moment";

export function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  //check if the value is formatted date in dd/MM/yyyy
  let isFormattedA = moment(a[orderBy], "DD/MM/YYYY", true).isValid();
  let isFormattedB = moment(b[orderBy], "DD/MM/YYYY", true).isValid();

  if (isFormattedA && isFormattedB) {
    return moment(b[orderBy]).format("YYYY-MM-DD") >
      moment(a[orderBy]).format("YYYY-MM-DD")
      ? 1
      : -1;
  }
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
  orderBy: Key
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
