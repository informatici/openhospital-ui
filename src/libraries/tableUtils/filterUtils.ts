import {
  TFilterField,
  TFilterValues,
} from "components/accessories/table/filter/types";
import moment from "moment";

const removeRowWhere = (
  rawData: Record<string, any>[] | undefined,
  rowData: Record<string, any>[],
  rowKey: string,
  values: Record<string, any>[],
  predicate: (row: Record<string, any>) => boolean
) => {
  return values.filter((entry) => {
    const row = (rawData ?? rowData).find(
      (item) => item[rowKey ?? ""] === entry[rowKey ?? ""]
    );
    return !!row ? !predicate(row) : false;
  });
};

export const filterData = (
  rawData: Record<string, any>[] | undefined,
  rowData: Record<string, any>[],
  rowKey: string,
  filterColumns: TFilterField[],
  filters: Record<string, TFilterValues>,
  manualFilter: boolean
) => {
  if ((filterColumns?.length ?? 0) === 0 || manualFilter) {
    return rowData;
  }
  let result = rowData;
  filterColumns.forEach((field) => {
    const filter = filters[field.key];
    if (filter) {
      switch (field.type) {
        case "boolean":
          result = removeRowWhere(rawData, rowData, rowKey, result, (row) =>
            filter.value === undefined
              ? false
              : (row[field.key] ?? false) !== filter.value
          );
          break;
        case "number":
          result = removeRowWhere(
            rawData,
            rowData,
            rowKey,
            result,
            (row) =>
              (filter.value === undefined
                ? false
                : row[field.key] !== filter.value) ||
              (filter.min === undefined
                ? false
                : row[field.key] < filter.min) ||
              (filter.max === undefined ? false : row[field.key] > filter.max)
          );
          break;
        case "text":
          result = removeRowWhere(rawData, rowData, rowKey, result, (row) =>
            filter.value === undefined
              ? false
              : !row[field.key]
                  ?.toString()
                  .toLowerCase()
                  .includes(filter.value.toString().toLowerCase())
          );
          break;

        case "select":
          result = removeRowWhere(rawData, rowData, rowKey, result, (row) =>
            filter.value === undefined ? false : row[field.key] !== filter.value
          );
          break;

        default:
          result = removeRowWhere(
            rawData,
            rowData,
            rowKey,
            result,
            (row) =>
              (filter.value === undefined
                ? false
                : !moment(row[field.key]).isSame(
                    moment(filter.value as string)
                  )) ||
              (filter.min === undefined
                ? false
                : moment(row[field.key]).isBefore(
                    moment(filter.min as string)
                  )) ||
              (filter.max === undefined
                ? false
                : moment(row[field.key]).isAfter(moment(filter.max as string)))
          );
      }
    }
  });
  return result;
};
