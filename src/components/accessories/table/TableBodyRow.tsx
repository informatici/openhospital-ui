import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Collapse, IconButton } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import _ from "lodash";
import React, {
  FunctionComponent,
  useEffect,
  useMemo,
} from "react";
import "./styles.scss";
import { IRowProps } from "./types";
import Button from "../button/Button";
import { useTranslation } from "react-i18next";
import CellContent from "components/activities/pharmacyActivity/pharmaceutical/components/PharmacyCellContent/CellContent";

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

  const getRowClass = () => {
    if (row.stock === 0) return "row-zero-stock";
    if (row.stock < row.criticalValue) return "row-critical-stock";
    return "";
  };

  const hasExpiringLotThisMonth = useMemo(() => {
    if (!row.expDate) return false;

    const expiry = new Date(row.expDate);
    const now = new Date();
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    return expiry <= endOfMonth && expiry > now;
  }, [row.expDate]);

  return (
    <>
      <TableRow
        className={`table-body-row ${getRowClass()} ${
          rowClassNames ? rowClassNames(row) : ""
        }`}
        key={rowIndex}
      >
        {isCollapsabile && (
          <TableCell width="40">
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          </TableCell>
        )}

        {tableHeader.map((key, index) => {
          const newRow = { ...row };
          dateFields.forEach((dateField) => {
            if (row[dateField]) {
              const parts = row[dateField].split(" ");
              if (parts.length === 2) newRow[dateField] = parts[0];
            }
          });

          return Object.keys(newRow).includes(key) ? (
            <TableCell align="left" key={index}>
              <CellContent
                value={newRow[key]}
                keyName={key}
                row={newRow}
                hasExpiringLotThisMonth={hasExpiringLotThisMonth}
              />
            </TableCell>
          ) : (
            ""
          );
        })}
        {renderActions()}
      </TableRow>

      {isCollapsabile && (
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
      )}
    </>
  );
};

export default TableBodyRow;
