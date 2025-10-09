import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  Warning,
  EventBusy,
} from "@mui/icons-material";
import { Collapse, IconButton, Typography } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import _ from "lodash";
import React, { FunctionComponent, useEffect } from "react";
import "./styles.scss";
import { IRowProps } from "./types";
import Button from "../button/Button";
import { useTranslation } from "react-i18next";

const TableBodyRow: FunctionComponent<IRowProps> = ({
  row,
  rowIndex,
  labelData,
  tableHeader,
  renderActions,
  isCollapsabile,
  showEmptyCell = true,
  renderCellDetails,
  rowClassNames,
  coreRow,
  detailColSpan,
  expanded,
  dateFields,
  detailsExcludedFields,
  adjustQuantity = false,
}) => {
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setOpen(expanded ?? false);
  }, [expanded]);

  const getRowStyle = () => {
    if (row.stock < row.criticalValue) {
      return {
        backgroundColor: "#ffebee",
        "& .MuiTableCell-root": {
          color: "#c62828",
          fontWeight: "bold",
        },
      };
    }

    if (row.stock === 0) {
      return {
        backgroundColor: "#9e9e9e",
        "& .MuiTableCell-root": {
          color: "#ffffff",
          fontWeight: "bold",
        },
      };
    }

    return {};
  };

  const hasExpiringLotThisMonth = () => {
    if (!row.expDate || row.expDate === null) return false;

    const expiry = new Date(row.expDate);
    const now = new Date();
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    return expiry <= endOfMonth && expiry > now;
  };

  return (
    <>
      <TableRow
        className={rowClassNames ? rowClassNames(row) : ""}
        sx={getRowStyle()}
        key={rowIndex}
      >
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
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                {row.stock === 0 && key === "pharmaceutical" && (
                  <Typography
                    component="span"
                    sx={{
                      fontWeight: "bold",
                      fontSize: 15,
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 17,
                      height: 17,
                      borderRadius: "50%",
                    }}
                  >
                    0
                  </Typography>
                )}
                {row.stock < row.criticalValue &&
                  hasExpiringLotThisMonth() &&
                  key === "pharmaceutical" && (
                    <>
                      <Warning
                        sx={{
                          fontSize: "18px",
                          color: "#f44336",
                          marginLeft: "4px",
                        }}
                      />
                      <EventBusy
                        sx={{
                          fontSize: "18px",
                          color: "#f44336",
                          marginLeft: "4px",
                        }}
                      />
                    </>
                  )}
                {hasExpiringLotThisMonth() && row.stock >= row.criticalValue && key === "pharmaceutical" && (
                  <EventBusy
                    sx={{
                      fontSize: "18px",
                      color: "#9e9e9e",
                      marginLeft: "4px",
                    }}
                  />
                )}
                {newRow[key]}
              </div>
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
            className="collapseCell"
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
                <div className="collapseItem">
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
                  {adjustQuantity && row.type === "Charge" && (
                    <Button type="button" variant="outlined" color="inherit">
                      {t("pharmacy.stock.adjustQuantity")}
                    </Button>
                  )}
                </div>
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
