import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { TOrder } from "../../../libraries/sortUtils/types";
import {
  IconButton,
  Table as MaterialComponent,
  TablePagination,
  TableSortLabel,
} from "@material-ui/core";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {
  Edit,
  Delete,
  Print,
  InfoOutlined,
  MonetizationOn,
  Archive,
  Add,
  Close,
} from "@material-ui/icons";
import "./styles.scss";
import TableBodyRow from "./TableBodyRow";
import { IProps, TActions } from "./types";
import {
  dateComparator,
  defaultComparator,
} from "../../../libraries/sortUtils/sortUtils";
import ConfirmationDialog from "../confirmationDialog/ConfirmationDialog";
import { useTranslation } from "react-i18next";
import warningIcon from "../../../assets/warning-icon.png";
import Button from "../button/Button";
import { FilterButton } from "./filter/FilterButton";
import { TFilterValues } from "./filter/types";
import moment from "moment";

const Table: FunctionComponent<IProps> = ({
  rowData,
  tableHeader,
  dateFields = [],
  labelData,
  isCollapsabile,
  rowsPerPage,
  columnsOrder,
  initialOrderBy,
  onEdit,
  onDelete,
  onPrint,
  onPay,
  onView,
  onAdd,
  addTitle,
  showEmptyCell = true,
  renderItemDetails,
  getCoreRow,
  onClose,
  onCancel,
  detailColSpan,
  displayRowAction,
  detailsExcludedFields,
  filterColumns = [],
  onFilterChange,
  manualFilter = true,
  rawData,
  rowKey = "code",
  headerActions,
}) => {
  const { t } = useTranslation();
  const [order, setOrder] = React.useState<TOrder>("desc");
  const [orderBy, setOrderBy] = React.useState(initialOrderBy ?? "date"); //keyof -> DTO
  const [page, setPage] = React.useState(0);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [openCancelConfirmation, setOpenCancelConfirmation] = useState(false);
  const [currentRow, setCurrentRow] = useState({} as any);
  const [expanded, setExpanded] = useState(false);
  const [filters, setFilters] = useState<Record<string, TFilterValues>>({});
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const createSortHandler =
    (property: any) => (event: React.MouseEvent<unknown>) => {
      handleRequestSort(event, property);
    };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: any
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const renderIcon = (type: TActions, row?: any) => {
    switch (type) {
      case "edit":
        return (
          <IconButton
            title="Edit"
            size="small"
            onClick={() => onEdit && onEdit(row)}
          >
            <Edit />
          </IconButton>
        );
      case "delete":
        return (
          <IconButton
            size="small"
            title="Delete"
            onClick={() => {
              setCurrentRow(row);
              setOpenDeleteConfirmation(true);
            }}
          >
            <Delete color="primary" />
          </IconButton>
        );
      case "print":
        return (
          <IconButton
            size="small"
            title="Print"
            onClick={() => onPrint && onPrint(row)}
          >
            <Print color="secondary" />
          </IconButton>
        );

      case "view":
        return (
          <IconButton
            size="small"
            title="View details"
            onClick={() => onView && onView(row)}
          >
            <InfoOutlined color="primary" titleAccess={"View Details"} />
          </IconButton>
        );
      case "pay":
        return (
          <IconButton
            size="small"
            title="Add a payment"
            onClick={() => onPay && onPay(row)}
          >
            <MonetizationOn htmlColor="#00912c" />
          </IconButton>
        );

      case "close":
        return (
          <IconButton
            size="small"
            title="Close the bill"
            onClick={() => onClose && onClose(row)}
          >
            <Archive htmlColor="#0373fc" />
          </IconButton>
        );

      case "cancel":
        return (
          <IconButton
            size="small"
            title="Cancel"
            onClick={() => {
              setCurrentRow(row);
              setOpenCancelConfirmation(true);
            }}
          >
            <Close color="primary" />
          </IconButton>
        );
      case "add":
        return (
          <IconButton
            size="small"
            title={addTitle ?? "Add"}
            onClick={() => onAdd && onAdd(row)}
          >
            <Add />
          </IconButton>
        );
    }
  };

  const renderActions = (row: any) => {
    if (onEdit || onDelete || onPrint || onView || onCancel) {
      return (
        <TableCell
          scope="row"
          align="right"
          size="small"
          style={{ minWidth: 125 }}
        >
          {onView && (displayRowAction ? displayRowAction(row, "view") : true)
            ? renderIcon("view", row)
            : ""}
          {onPay && (displayRowAction ? displayRowAction(row, "pay") : true)
            ? renderIcon("pay", row)
            : ""}
          {onEdit && (displayRowAction ? displayRowAction(row, "edit") : true)
            ? renderIcon("edit", row)
            : ""}
          {onPrint && (displayRowAction ? displayRowAction(row, "print") : true)
            ? renderIcon("print", row)
            : ""}
          {onClose && (displayRowAction ? displayRowAction(row, "close") : true)
            ? renderIcon("close", row)
            : ""}
          {onDelete &&
          (displayRowAction ? displayRowAction(row, "delete") : true)
            ? renderIcon("delete", row)
            : ""}
          {onAdd && (displayRowAction ? displayRowAction(row, "add") : true)
            ? renderIcon("add", row)
            : ""}
          {onCancel &&
          (displayRowAction ? displayRowAction(row, "cancel") : true)
            ? renderIcon("cancel", row)
            : ""}
        </TableCell>
      );
    }
  };
  const handleDelete = () => {
    if (onDelete) onDelete(currentRow);
    setOpenDeleteConfirmation(false);
  };

  const handleCancel = () => {
    if (onCancel) onCancel(currentRow);
    setOpenCancelConfirmation(false);
  };

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const removeRowWhere = useCallback(
    (
      values: Record<string, any>[],
      predicate: (row: Record<string, any>) => boolean
    ) => {
      return values.filter((entry) => {
        const row = (rawData ?? rowData).find(
          (item) => item[rowKey ?? ""] === entry[rowKey ?? ""]
        );
        return !!row ? !predicate(row) : false;
      });
    },
    [rawData, rowData, rowKey]
  );

  const filteredData = useMemo(() => {
    if ((filterColumns?.length ?? 0) === 0 || manualFilter) {
      return rowData;
    }
    let result = rowData;
    filterColumns.forEach((field) => {
      const filter = filters[field.key];
      if (filter) {
        switch (field.type) {
          case "boolean":
            result = removeRowWhere(result, (row) =>
              filter.value === undefined
                ? false
                : (row[field.key] ?? false) !== filter.value
            );
            break;
          case "number":
            result = removeRowWhere(
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
            result = removeRowWhere(result, (row) =>
              filter.value === undefined
                ? false
                : !(row[field.key] as string)
                    ?.toLowerCase()
                    ?.includes(filter.value.toString().toLowerCase())
            );
            break;

          case "select":
            result = removeRowWhere(result, (row) =>
              filter.value === undefined
                ? false
                : row[field.key] !== filter.value
            );
            break;

          default:
            result = removeRowWhere(
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
                  : moment(row[field.key]).isAfter(
                      moment(filter.max as string)
                    ))
            );
        }
      }
    });
    return result;
  }, [filterColumns, filters, manualFilter, removeRowWhere, rowData]);

  useEffect(() => {
    if (onFilterChange && !manualFilter) {
      onFilterChange(filters);
    }
  }, [filters]);

  return (
    <>
      {!!isCollapsabile && !!headerActions && (
        <div className="header">
          {!!isCollapsabile && (
            <Button type="button" onClick={handleExpand}>
              {expanded ? t("common.collapse_all") : t("common.expand_all")}
            </Button>
          )}
          {headerActions && (
            <div className="headerActions">{headerActions}</div>
          )}
        </div>
      )}
      <TableContainer component={Paper}>
        <MaterialComponent className="table" aria-label="simple table">
          <TableHead className="table_header">
            <TableRow>
              {isCollapsabile ? <TableCell /> : ""}
              {tableHeader.map((h: string, i) => {
                const filterField = filterColumns?.find(
                  (item) => item.key === h
                );

                return (
                  <TableCell key={i}>
                    <div className="headerCell">
                      {columnsOrder.includes(h) ? (
                        <TableSortLabel
                          active={orderBy === h}
                          direction={
                            orderBy === h
                              ? order
                              : dateFields.includes(h)
                              ? "desc"
                              : "asc"
                          }
                          onClick={createSortHandler(h)}
                        >
                          {labelData[h]}
                        </TableSortLabel>
                      ) : (
                        labelData[h]
                      )}
                      {filterField && (
                        <FilterButton
                          field={filterField}
                          onChange={(value) =>
                            setFilters((previous) => ({
                              ...filters,
                              [filterField.key]: value,
                            }))
                          }
                        />
                      )}
                    </div>
                  </TableCell>
                );
              })}
              <TableCell>&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="table_body">
            {filteredData
              .sort(
                dateFields.includes(orderBy)
                  ? dateComparator(order, orderBy)
                  : defaultComparator(order, orderBy)
              )
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableBodyRow
                    row={row}
                    coreRow={getCoreRow && getCoreRow(row)}
                    key={index}
                    rowIndex={index}
                    labelData={labelData}
                    tableHeader={tableHeader}
                    renderActions={() => renderActions(row)}
                    isCollapsabile={isCollapsabile}
                    showEmptyCell={showEmptyCell}
                    renderCellDetails={renderItemDetails}
                    detailColSpan={detailColSpan}
                    expanded={expanded}
                    dateFields={dateFields}
                    detailsExcludedFields={detailsExcludedFields}
                  />
                );
              })}
          </TableBody>
        </MaterialComponent>
      </TableContainer>
      {filteredData.length > rowsPerPage ? (
        <TablePagination
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[rowsPerPage]}
          page={page}
          onChangePage={handleChangePage}
        />
      ) : (
        ""
      )}

      <ConfirmationDialog
        isOpen={openDeleteConfirmation}
        title={t("common.delete")}
        info={t("common.deleteconfirmation", {
          code: currentRow.code,
        })}
        icon={warningIcon}
        primaryButtonLabel={t("common.ok")}
        secondaryButtonLabel={t("common.discard")}
        handlePrimaryButtonClick={handleDelete}
        handleSecondaryButtonClick={() => setOpenDeleteConfirmation(false)}
      />

      <ConfirmationDialog
        isOpen={openCancelConfirmation}
        title={t("common.cancel")}
        info={t("common.cancelconfirmation", {
          code: currentRow.code,
        })}
        icon={warningIcon}
        primaryButtonLabel={t("common.ok")}
        secondaryButtonLabel={t("common.discard")}
        handlePrimaryButtonClick={handleCancel}
        handleSecondaryButtonClick={() => setOpenCancelConfirmation(false)}
      />
    </>
  );
};

export default Table;
