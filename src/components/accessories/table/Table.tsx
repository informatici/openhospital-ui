import React, { FunctionComponent, useState } from "react";
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
  InfoRounded,
  InfoOutlined,
} from "@material-ui/icons";
import "./styles.scss";
import TableBodyRow from "./TableBodyRow";
import { IProps, TActions } from "./types";
import { defaultComparator } from "../../../libraries/sortUtils/sortUtils";
import ConfirmationDialog from "../confirmationDialog/ConfirmationDialog";
import { useTranslation } from "react-i18next";
import warningIcon from "../../../assets/warning-icon.png";

const Table: FunctionComponent<IProps> = ({
  rowData,
  tableHeader,
  labelData,
  isCollapsabile,
  rowsPerPage,
  columnsOrder,
  compareRows = defaultComparator,
  onEdit,
  onDelete,
  onPrint,
  onView,
  showEmptyCell = true,
}) => {
  const { t } = useTranslation();
  const [order, setOrder] = React.useState<TOrder>("desc");
  const [orderBy, setOrderBy] = React.useState("date"); //keyof -> DTO
  const [page, setPage] = React.useState(0);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [currentRow, setCurrentRow] = useState({} as any);
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
            size="small"
            onClick={() => {
              if (onEdit) onEdit(row);
            }}
          >
            <Edit />
          </IconButton>
        );
      case "delete":
        return (
          <IconButton
            size="small"
            onClick={() => {
              setCurrentRow(row);
              setOpenDeleteConfirmation(true);
            }}
          >
            <Delete color="secondary" />
          </IconButton>
        );
      case "print":
        return (
          <IconButton size="small" onClick={onPrint}>
            <Print color="primary" />
          </IconButton>
        );

      case "view":
        return (
          <IconButton
            size="small"
            onClick={() => {
              if (onView) onView(row);
            }}
          >
            <InfoOutlined color="primary" titleAccess={"View Details"} />
          </IconButton>
        );
    }
  };

  const renderActions = (row: any) => {
    if (onEdit || onDelete || onPrint || onView) {
      return (
        <TableCell
          scope="row"
          align="right"
          size="small"
          style={{ minWidth: 125 }}
        >
          {onView ? renderIcon("view", row) : ""}
          {onEdit ? renderIcon("edit", row) : ""}
          {onPrint ? renderIcon("print") : ""}
          {onDelete ? renderIcon("delete", row) : ""}
        </TableCell>
      );
    }
  };
  const handleDelete = () => {
    if (onDelete) onDelete(currentRow);
    setOpenDeleteConfirmation(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <MaterialComponent className="table" aria-label="simple table">
          <TableHead className="table_header">
            <TableRow>
              {isCollapsabile ? <TableCell /> : ""}
              {tableHeader.map((h: string, i) => (
                <TableCell key={i}>
                  {columnsOrder.includes(h) ? (
                    <TableSortLabel
                      active={orderBy === h}
                      direction={orderBy === h ? order : "asc"}
                      onClick={createSortHandler(h)}
                    >
                      {labelData[h]}
                    </TableSortLabel>
                  ) : (
                    labelData[h]
                  )}
                </TableCell>
              ))}
              <TableCell>&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="table_body">
            {[...rowData]
              .sort(compareRows(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableBodyRow
                  row={row}
                  key={index}
                  rowIndex={index}
                  labelData={labelData}
                  tableHeader={tableHeader}
                  renderActions={() => renderActions(row)}
                  isCollapsabile={isCollapsabile}
                  showEmptyCell={showEmptyCell}
                />
              ))}
          </TableBody>
        </MaterialComponent>
      </TableContainer>
      {rowData.length > rowsPerPage ? (
        <TablePagination
          component="div"
          count={rowData.length}
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
        primaryButtonLabel="OK"
        secondaryButtonLabel="Dismiss"
        handlePrimaryButtonClick={handleDelete}
        handleSecondaryButtonClick={() => setOpenDeleteConfirmation(false)}
      />
    </>
  );
};

export default Table;
