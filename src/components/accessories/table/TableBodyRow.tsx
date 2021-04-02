import React, { FunctionComponent } from "react";
import _ from "lodash";
import { Collapse, IconButton } from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";
import "./styles.scss";
import { IRowProps } from "./types";

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
        {isCollapsabile ? (
          <TableCell width="40">
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          </TableCell>
        ) : (
          ""
        )}
        {tableHeader.map((key, index) => {
          return Object.keys(row).includes(key) ? (
            <TableCell align="left" key={index}>
              {row[key]}
            </TableCell>
          ) : (
            ""
          );
        })}
        {renderActions()}
      </TableRow>
      {isCollapsabile ? (
        <TableRow>
          <TableCell style={{ padding: 0, borderBottom: 0 }} colSpan={6}>
            <Collapse
              in={open}
              timeout="auto"
              unmountOnExit
              className="collapseWrapper"
            >
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
        </TableRow>
      ) : (
        ""
      )}
    </>
  );
};

export default TableBodyRow;
