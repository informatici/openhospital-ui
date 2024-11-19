import {
  Add,
  Archive,
  Close,
  Delete,
  Edit,
  HighlightOff,
  InfoOutlined,
  MonetizationOn,
  Print,
  Restore,
} from "@mui/icons-material";
import {
  IconButton,
  Table as MaterialComponent,
  TablePagination,
  TableSortLabel,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { filterData } from "libraries/tableUtils";
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import warningIcon from "../../../assets/warning-icon.png";
import {
  dateComparator,
  defaultComparator,
} from "../../../libraries/sortUtils/sortUtils";
import { TOrder } from "../../../libraries/sortUtils/types";
import Button from "../button/Button";
import ConfirmationDialog from "../confirmationDialog/ConfirmationDialog";
import TableBodyRow from "./TableBodyRow";
import { FilterButton } from "./filter/FilterButton";
import { TFilterValues } from "./filter/types";
import "./styles.scss";
import { IProps, TActions } from "./types";

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
  onRestore,
  onSoftDelete,
  addTitle,
  showEmptyCell = true,
  renderItemDetails,
  rowClassNames,
  getCoreRow,
  onClose,
  onCancel,
  detailColSpan,
  displayRowAction,
  disableRowAction,
  detailsExcludedFields,
  filterColumns = [],
  onFilterChange,
  manualFilter = true,
  rawData,
  rowKey = "code",
  headerActions,
  labels,
}) => {
  const { t } = useTranslation();
  const [order, setOrder] = React.useState<TOrder>("desc");
  const [orderBy, setOrderBy] = React.useState(initialOrderBy ?? "date"); //keyof -> DTO
  const [page, setPage] = React.useState(0);
  const [openConfirmation, setOpenConfirmation] = useState<{
    action?: TActions;
    open: boolean;
  }>({ open: false });
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

  const disableAction = useCallback(
    (row: any, action: TActions) => {
      return disableRowAction ? disableRowAction(row, action) : false;
    },
    [disableRowAction]
  );

  const renderIcon = (type: TActions, row?: any) => {
    switch (type) {
      case "edit":
        return (
          <IconButton
            data-cy="table-edit-action"
            title={labels?.edit?.tooltip ?? "Edit"}
            size="small"
            disabled={disableAction(row, "edit")}
            onClick={
              disableAction(row, "edit")
                ? () => {}
                : () => onEdit && onEdit(row)
            }
          >
            <Edit />
          </IconButton>
        );
      case "delete":
        return (
          <IconButton
            data-cy="table-delete-action"
            size="small"
            title={labels?.delete?.tooltip ?? "Delete"}
            disabled={disableAction(row, "delete")}
            onClick={
              disableAction(row, "delete")
                ? () => {}
                : handleOpenConfirmation(row, "delete")
            }
          >
            <Delete
              color={disableAction(row, "delete") ? "inherit" : "primary"}
            />
          </IconButton>
        );
      case "print":
        return (
          <IconButton
            data-cy="table-print-action"
            size="small"
            title={labels?.print?.tooltip ?? "Print"}
            disabled={disableAction(row, "print")}
            onClick={
              disableAction(row, "print")
                ? () => {}
                : () => onPrint && onPrint(row)
            }
          >
            <Print color="secondary" />
          </IconButton>
        );

      case "view":
        return (
          <IconButton
            data-cy="table-view-action"
            size="small"
            title={labels?.view?.tooltip ?? "View details"}
            disabled={disableAction(row, "view")}
            onClick={
              disableAction(row, "view")
                ? () => {}
                : () => onView && onView(row)
            }
          >
            <InfoOutlined color="primary" titleAccess={"View Details"} />
          </IconButton>
        );
      case "pay":
        return (
          <IconButton
            data-cy="table-pay-action"
            size="small"
            title={labels?.pay?.tooltip ?? "Add a payment"}
            disabled={disableAction(row, "pay")}
            onClick={
              disableAction(row, "pay") ? () => {} : () => onPay && onPay(row)
            }
          >
            <MonetizationOn htmlColor="#00912c" />
          </IconButton>
        );

      case "close":
        return (
          <IconButton
            data-cy="table-close-action"
            size="small"
            title={labels?.close?.tooltip ?? "Close the bill"}
            disabled={disableAction(row, "close")}
            onClick={
              disableAction(row, "close")
                ? () => {}
                : () => onClose && onClose(row)
            }
          >
            <Archive htmlColor="#0373fc" />
          </IconButton>
        );

      case "cancel":
        return (
          <IconButton
            data-cy="table-cancel-action"
            size="small"
            title={labels?.cancel?.tooltip ?? "Cancel"}
            disabled={disableAction(row, "cancel")}
            onClick={
              disableAction(row, "cancel")
                ? () => {}
                : handleOpenConfirmation(row, "cancel")
            }
          >
            <Close color="primary" />
          </IconButton>
        );
      case "add":
        return (
          <IconButton
            data-cy="table-add-action"
            size="small"
            title={addTitle ?? labels?.add?.tooltip ?? "Add"}
            disabled={disableAction(row, "add")}
            onClick={
              disableAction(row, "add") ? () => {} : () => onAdd && onAdd(row)
            }
          >
            <Add />
          </IconButton>
        );
      case "restore":
        return (
          <IconButton
            data-cy="table-restore-action"
            size="small"
            disabled={disableAction(row, "restore")}
            title={labels?.restore?.tooltip ?? t("common.restore")}
            onClick={
              disableAction(row, "restore")
                ? () => {}
                : handleOpenConfirmation(row, "restore")
            }
          >
            <Restore />
          </IconButton>
        );
      case "softDelete":
        return (
          <IconButton
            data-cy="table-softDelete-action"
            size="small"
            disabled={disableAction(row, "softDelete")}
            title={labels?.softDelete?.tooltip ?? t("common.softDelete")}
            onClick={
              disableAction(row, "softDelete")
                ? () => {}
                : handleOpenConfirmation(row, "softDelete")
            }
          >
            <HighlightOff
              color={disableAction(row, "softDelete") ? "inherit" : "primary"}
            />
          </IconButton>
        );
    }
  };

  const handleOpenConfirmation = useCallback(
    (row: any, action?: TActions) => () => {
      setCurrentRow(row);
      setOpenConfirmation({ open: true, action });
    },
    [setOpenConfirmation, setCurrentRow]
  );

  const closeConfirmationDialog = useCallback(() => {
    setOpenConfirmation({ open: false });
  }, []);

  const renderActions = (row: any) => {
    if (
      onEdit ||
      onDelete ||
      onPrint ||
      onView ||
      onCancel ||
      onRestore ||
      onSoftDelete
    ) {
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
          {onRestore &&
          (displayRowAction ? displayRowAction(row, "restore") : true)
            ? renderIcon("restore", row)
            : ""}
          {onSoftDelete &&
          (displayRowAction ? displayRowAction(row, "softDelete") : true)
            ? renderIcon("softDelete", row)
            : ""}
        </TableCell>
      );
    }
  };
  const handleDelete = () => {
    if (onDelete) onDelete(currentRow);
    closeConfirmationDialog();
  };

  const handleCancel = () => {
    if (onCancel) onCancel(currentRow);
    closeConfirmationDialog();
  };

  const handleRestore = () => {
    if (onRestore) onRestore(currentRow);
    closeConfirmationDialog();
  };

  const handleSoftDelete = () => {
    if (onSoftDelete) onSoftDelete(currentRow);
    closeConfirmationDialog();
  };

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const filteredData = useMemo(
    () =>
      filterData(
        rawData,
        rowData,
        rowKey,
        filterColumns,
        filters,
        manualFilter
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filterColumns, filters, manualFilter, rowData]
  );

  useEffect(() => {
    if (onFilterChange && !manualFilter) {
      onFilterChange(filters);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  return (
    <>
      {(!!isCollapsabile || !!headerActions) && (
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
                              ...previous,
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
                    rowClassNames={rowClassNames}
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
          onPageChange={handleChangePage}
        />
      ) : (
        ""
      )}

      <ConfirmationDialog
        isOpen={openConfirmation.open && openConfirmation.action === "delete"}
        title={labels?.delete?.title ?? t("common.delete")}
        info={
          labels?.delete?.message ??
          t("common.deleteconfirmation", {
            code: currentRow.code,
          })
        }
        icon={warningIcon}
        primaryButtonLabel={t("common.ok")}
        secondaryButtonLabel={t("common.discard")}
        handlePrimaryButtonClick={handleDelete}
        handleSecondaryButtonClick={closeConfirmationDialog}
      />

      <ConfirmationDialog
        isOpen={
          openConfirmation.open && openConfirmation.action === "softDelete"
        }
        title={labels?.softDelete?.title ?? t("common.softDelete")}
        info={
          labels?.softDelete?.message ??
          t("common.softDeleteConfirmation", {
            code: currentRow.code,
          })
        }
        icon={warningIcon}
        primaryButtonLabel={t("common.ok")}
        secondaryButtonLabel={t("common.discard")}
        handlePrimaryButtonClick={handleSoftDelete}
        handleSecondaryButtonClick={closeConfirmationDialog}
      />

      <ConfirmationDialog
        isOpen={openConfirmation.open && openConfirmation.action === "restore"}
        title={labels?.restore?.title ?? t("common.restore")}
        info={
          labels?.restore?.message ??
          t("common.restoreConfirmation", {
            code: currentRow.code,
          })
        }
        icon={warningIcon}
        primaryButtonLabel={t("common.ok")}
        secondaryButtonLabel={t("common.discard")}
        handlePrimaryButtonClick={handleRestore}
        handleSecondaryButtonClick={closeConfirmationDialog}
      />

      <ConfirmationDialog
        isOpen={openConfirmation.open && openConfirmation.action === "cancel"}
        title={t("common.cancel")}
        info={t("common.cancelconfirmation", {
          code: currentRow.code,
        })}
        icon={warningIcon}
        primaryButtonLabel={t("common.ok")}
        secondaryButtonLabel={t("common.discard")}
        handlePrimaryButtonClick={handleCancel}
        handleSecondaryButtonClick={closeConfirmationDialog}
      />
    </>
  );
};

export default Table;
