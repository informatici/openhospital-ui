import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  withStyles,
} from "@material-ui/core";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { FullBillDTO } from "../../../generated";
import { currencyFormat } from "../../../libraries/formatUtils/currencyFormatting";
import { renderDate } from "../../../libraries/formatUtils/dataFormatting";
import "./styles.scss";

interface IBillProps {
  fullBill: FullBillDTO;
  skipPatientHeader?: boolean;
}
const useStyles = makeStyles(() => ({
  root: {
    overflow: "auto",
    border: "none",
    boxShadow: "none",
    maxHeight: 300,
    margin: 0,
  },
  table: {
    padding: 10,
    whiteSpace: "nowrap",
  },
  tableHead: {
    backgroundColor: "transparent",
    fontWeight: "bold",
  },
}));

const Cell = withStyles({
  root: {
    borderBottom: "none",
  },
})(TableCell);

const RenderBillDetails: FC<IBillProps> = ({
  fullBill,
  skipPatientHeader = true,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <TableContainer className={classes.root}>
      <Table>
        <TableRow>
          {!skipPatientHeader && (
            <Table
              stickyHeader
              className={classes.table}
              size="small"
              aria-label="Summary table"
            >
              <TableHead>
                <Cell style={{ fontWeight: "bold" }} colSpan={4}>
                  {t("bill.billid")} : {fullBill.billDTO?.id}
                </Cell>
                <TableRow>
                  <Cell>{t("bill.patient")}</Cell>
                  <Cell>{t("bill.amount")}</Cell>
                  <Cell>{t("bill.balance")} </Cell>
                  <Cell>{t("bill.status")}</Cell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <Cell>
                    <strong>{fullBill.billDTO?.patName}</strong>
                  </Cell>
                  <Cell>{currencyFormat(fullBill.billDTO?.amount)}</Cell>
                  <Cell>{currencyFormat(fullBill.billDTO?.balance)}</Cell>
                  <Cell>
                    {fullBill.billDTO?.status === "C"
                      ? t("bill.closed")
                      : t("bill.pending")}
                  </Cell>
                </TableRow>
              </TableBody>
            </Table>
          )}
        </TableRow>
        <TableRow>
          <Table
            className={classes.table}
            size="small"
            aria-label="Items table"
          >
            <TableHead>
              <TableRow>
                <Cell className={classes.tableHead} colSpan={4}>
                  {t("bill.items")}
                </Cell>
              </TableRow>
              <TableRow>
                <Cell className={classes.tableHead}>#</Cell>
                <Cell className={classes.tableHead}>
                  {t("bill.designation")}
                </Cell>
                <Cell className={classes.tableHead}>{t("bill.qty")}</Cell>
                <Cell className={classes.tableHead}>{t("bill.amount")}</Cell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fullBill?.billItemsDTO &&
                fullBill?.billItemsDTO.map((item, index) => (
                  <TableRow key={index}>
                    <Cell>{++index}</Cell>
                    <Cell component="td" scope="row">
                      {item.itemDescription}
                    </Cell>
                    <Cell component="td" scope="row">
                      {item.itemQuantity}
                    </Cell>
                    <Cell component="td" scope="row">
                      {currencyFormat(item.itemAmount)}
                    </Cell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableRow>
        <TableRow>
          <Table
            className={classes.table}
            size="small"
            aria-label="Payments table"
          >
            <TableHead>
              <Cell
                className={classes.tableHead}
                style={{ fontWeight: "bold" }}
                colSpan={4}
              >
                {t("bill.payments")}
              </Cell>
              <TableRow key={"header2"}>
                <Cell className={classes.tableHead}>#</Cell>
                <Cell className={classes.tableHead}>{t("bill.date")}</Cell>
                <Cell className={classes.tableHead}>{t("bill.amount")}</Cell>
                <Cell className={classes.tableHead}>{t("bill.cashier")}</Cell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fullBill?.billPaymentsDTO &&
                fullBill?.billPaymentsDTO.map((pay, index) => (
                  <TableRow key={++index}>
                    <Cell>{index}</Cell>
                    <Cell component="td" scope="row">
                      {pay.date ? renderDate(pay.date) : ""}
                    </Cell>
                    <Cell component="td" scope="row">
                      {currencyFormat(pay.amount)}
                    </Cell>
                    <Cell component="td" scope="row">
                      {pay.user}
                    </Cell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableRow>
      </Table>
    </TableContainer>
  );
};
export default RenderBillDetails;
