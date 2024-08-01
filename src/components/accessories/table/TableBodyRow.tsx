import React, { FunctionComponent, useEffect } from "react";
import _ from "lodash";
import { Collapse, IconButton } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import "./styles.scss";
import { IRowProps } from "./types";

const TableBodyRow: FunctionComponent<IRowProps> = ({
  row,
  rowIndex,
  labelData,
  tableHeader,
  renderActions,
  isCollapsabile,
  showEmptyCell = true,
  renderCellDetails,
  coreRow,
  detailColSpan,
  expanded,
  dateFields,
  detailsExcludedFields,
}) => {
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setOpen(expanded ?? false);
  }, [expanded]);

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
          const newRow = { ...row };
          dateFields.forEach((dateField) => {
            if (row[dateField]) {
              const parts = row[dateField].split(" ");
              if (parts.length === 2) {
                newRow[dateField] = parts[0];
              }
            }
          });
          return Object.keys(newRow).includes(key) ? (
            <TableCell align="left" key={index}>
              {newRow[key]}
            </TableCell>
          ) : (
            ""
          );
        })}
        {renderActions()}
      </TableRow>
      {isCollapsabile ? (
        <TableRow>
          <TableCell
            style={{ padding: 0, borderBottom: 0, margin: 0 }}
            colSpan={detailColSpan ?? 6}
          >
            <Collapse
              in={open}
              timeout="auto"
              unmountOnExit
              className="collapseWrapper"
            >
              {renderCellDetails ? (
                renderCellDetails({ ...coreRow })
              ) : (
                <ul>
                  {Object.keys(
                    _.omit(
                      labelData,
                      tableHeader
                        .filter((item) => !dateFields.includes(item))
                        .concat(detailsExcludedFields ?? [])
                    )
                  )
                    .filter((key) => Object.keys(row).includes(key))
                    .map(
                      (key, index) =>
                        (showEmptyCell || !!row[key]) && (
                          <li className="collapseItem_row" key={index}>
                            <strong>{labelData[key]}:&nbsp;</strong>
                            <span>{row[key]}</span>
                          </li>
                        )
                    )}
                </ul>
              )}
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
