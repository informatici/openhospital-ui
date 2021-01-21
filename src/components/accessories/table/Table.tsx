import React, { FunctionComponent } from 'react';
import _ from "lodash";
import { getComparator, stableSort } from "../../../libraries/sortUtils/sortUtils";
import { TOrder } from "../../../libraries/sortUtils/types";
import { Collapse, IconButton, Table as MaterialComponent, TablePagination, TableSortLabel } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Edit, Delete, Print, KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import "./styles.scss";
import { IProps, TActions, IRowProps } from "./types";

const Table: FunctionComponent<IProps> = ({
  rowData,
  tableHeader,
  labelData,
  isCollapsabile,
  rowsPerPage,
  columnsSearch,
  onEdit,
  onDelete,
  onPrint,
  onView,
}) => {

  const [order, setOrder] = React.useState<TOrder>('desc');
  const [orderBy, setOrderBy] = React.useState('date'); //keyof -> DTO
  const [page, setPage] = React.useState(0);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const createSortHandler = (property: any) => (event: React.MouseEvent<unknown>) => {
    handleRequestSort(event, property);
  };

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: any) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const renderIcon = (type: TActions) => {
    switch(type){
      case 'edit':
        return (
          <IconButton size="small" onClick={onEdit}>
            <Edit />
          </IconButton>
        )
      case 'delete':
        return (
          <IconButton size="small" onClick={onDelete}>
            <Delete color="secondary" />
          </IconButton>
        )
      case 'print':
        return (
          <IconButton size="small" onClick={onPrint}>
            <Print color="primary" />
          </IconButton>
        )
    }
  }

  const renderActions = () => {
    if (onEdit || onDelete || onPrint || onView) {
      return (
        <TableCell scope="row" align="right" size="small">
          {(onEdit) ? renderIcon('edit') : ''}
          {(onPrint) ? renderIcon('print') : ''}
          {(onDelete) ? renderIcon('delete') : ''}
        </TableCell>
      );
    }
  }

  return (
    <>
      <TableContainer component={Paper}>
        <MaterialComponent className="table" aria-label="simple table">
          <TableHead className="table_header">
            <TableRow>
              {(isCollapsabile) ? <TableCell /> : ''}
              {tableHeader.map((h: string, i) => (
                <TableCell key={i}>
                  {(columnsSearch.includes(h)) ?
                    <TableSortLabel
                      active={orderBy === h}
                      direction={orderBy === h ? order : 'asc'}
                      onClick={createSortHandler(h)}
                    >
                      {labelData[h]}
                    </TableSortLabel> : labelData[h]}
                </TableCell>
              ))}
              <TableCell>&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="table_body">
            {stableSort(rowData, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableBodyRow
                  row={row}
                  rowIndex={index}
                  labelData={labelData}
                  tableHeader={tableHeader}
                  renderActions={renderActions}
                  isCollapsabile={isCollapsabile}
                />
              ))}
          </TableBody>
        </MaterialComponent>
      </TableContainer>
      {(rowData.length > rowsPerPage) ?
        <TablePagination
          component="div"
          count={rowData.length}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[rowsPerPage]}
          page={page}
          onChangePage={handleChangePage}
        /> : ''}
    </>
  );
}

export default Table;

const TableBodyRow: FunctionComponent<IRowProps> = ({
  row,
  rowIndex,
  labelData,
  tableHeader,
  renderActions,
  isCollapsabile,
}) => {
  
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TableRow key={rowIndex}>
        {(isCollapsabile) ? 
          <TableCell width="40">
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          </TableCell>
        : ''}
        {Object.keys(row).map((key, index) => (
          (tableHeader.includes(key)) ? <TableCell align="left" key={index}>{row[key]}</TableCell> : ''
        ))}
        
        {renderActions()}
      </TableRow>
      {(isCollapsabile) ?
        <TableRow>
          <TableCell style={{ padding: 0, borderBottom: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit className="collapseWrapper">
              <ul>
                {Object.keys(_.omit(row, tableHeader)).map((key, index) => (
                  <li className="collapseItem_row" key={index}>
                    <strong>{labelData[key]}:&nbsp;</strong>
                    <span>{row[key]}</span>
                  </li>
                ))}
              </ul>
            </Collapse>
          </TableCell>
        </TableRow> : ''}
      </>
  );
}