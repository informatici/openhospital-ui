import React, { FunctionComponent, useEffect } from "react";
import _ from "lodash";
import { Collapse, IconButton, useMediaQuery } from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";
import "./styles.scss";
import { IRowProps } from "./types";
import { useHotkeys } from "react-hotkeys-hook";
import { sleep } from "../../../libraries/asyncUtils/asyncUtils";

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
}) => {
  const [open, setOpen] = React.useState(false);
  const isPrintMode = useMediaQuery("print");
  useHotkeys("ctrl+space", async (event, handler) => {
    event.preventDefault();
    setOpen((previousState) => !previousState);
  });

  useEffect(() => {
    if (!isPrintMode) {
      setOpen(false);
    }
  }, [isPrintMode]);

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
          <TableCell
            style={{ padding: 0, borderBottom: 0, margin: 0 }}
            colSpan={detailColSpan ?? 6}
          >
            <Collapse
              in={isPrintMode ? isPrintMode : open}
              timeout="auto"
              unmountOnExit
              className="collapseWrapper"
            >
              {renderCellDetails ? (
                renderCellDetails({ ...coreRow })
              ) : (
                <ul>
                  {Object.keys(_.omit(row, tableHeader))
                    .filter((key) => labelData[key] !== undefined)
                    .map(
                      (key, index) =>
                        (showEmptyCell || (row[key] && labelData[key])) && (
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
