import {
  Card,
  CardContent,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { FullBillDTO } from "../../../generated";
import { renderDate } from "../../../libraries/formatUtils/dataFormatting";
import "./styles.scss";

interface IBillProps {
  fullBill: FullBillDTO;
}
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    overflow: "hide",
    border: "none",
    boxShadow: "none",
  },
  table: {
    minWidth: 340,
    padding: 10,
    whiteSpace: "nowrap",
  },
  tableCell: {
    paddingRight: 4,
    paddingLeft: 5,
  },
}));

const currencyFormat = (num: number | undefined) => {
  return num
    ? "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    : "";
};

const RenderBillDetails: FC<IBillProps> = ({ fullBill }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className="bill_details">
      <Card className={classes.root}>
        <CardContent>
          <TableContainer style={{ maxHeight: 300 }}>
            <Table
              stickyHeader
              className={classes.table}
              size="small"
              aria-label="Summary table"
            >
              <TableHead>
                <TableCell
                  className={classes.tableCell}
                  style={{ fontWeight: "bold" }}
                  colSpan={4}
                >
                  {t("bill.billid")} : {fullBill.billDTO?.id}
                </TableCell>
                <TableRow>
                  <TableCell className={classes.tableCell}>
                    {t("bill.patient")}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {t("bill.amount")}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {t("bill.balance")}{" "}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {t("bill.status")}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell className={classes.tableCell}>
                    <Link
                      to={`/details/${fullBill.billDTO?.patientDTO?.code}/edit`}
                      style={{ textDecoration: "none" }}
                    >
                      <strong>{fullBill.billDTO?.patName}</strong>
                    </Link>
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {currencyFormat(fullBill.billDTO?.amount)}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {currencyFormat(fullBill.billDTO?.balance)}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {fullBill.billDTO?.status === "C"
                      ? t("bill.closed")
                      : t("bill.pending")}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <Table
              className={classes.table}
              stickyHeader
              size="small"
              aria-label="Items table"
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    className={classes.tableCell}
                    style={{ fontWeight: "bold" }}
                    colSpan={4}
                  >
                    {t("bill.items")}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.tableCell}>#</TableCell>
                  <TableCell className={classes.tableCell}>
                    {t("bill.designation")}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {t("bill.qty")}
                  </TableCell>
                  <TableCell>{t("bill.amount")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fullBill?.billItemsDTO &&
                  fullBill?.billItemsDTO.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className={classes.tableCell}>
                        {++index}
                      </TableCell>
                      <TableCell
                        className={classes.tableCell}
                        component="td"
                        scope="row"
                      >
                        {item.itemDescription}
                      </TableCell>
                      <TableCell
                        className={classes.tableCell}
                        component="td"
                        scope="row"
                      >
                        {item.itemQuantity}
                      </TableCell>
                      <TableCell
                        className={classes.tableCell}
                        style={{ textAlign: "right" }}
                        component="td"
                        scope="row"
                      >
                        {currencyFormat(item.itemAmount)}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>

            <Table
              stickyHeader
              className={classes.table}
              size="small"
              aria-label="Payments table"
            >
              <TableHead>
                <TableCell
                  className={classes.tableCell}
                  style={{ fontWeight: "bold" }}
                  colSpan={4}
                >
                  {t("bill.payments")}
                </TableCell>
                <TableRow className={classes.tableCell} key={"header2"}>
                  <TableCell className={classes.tableCell}>#</TableCell>
                  <TableCell className={classes.tableCell}>
                    {t("bill.date")}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {t("bill.amount")}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {t("bill.cashier")}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fullBill?.billPaymentsDTO &&
                  fullBill?.billPaymentsDTO.map((pay, index) => (
                    <TableRow key={++index}>
                      <TableCell className={classes.tableCell}>
                        {index}
                      </TableCell>
                      <TableCell
                        className={classes.tableCell}
                        component="td"
                        scope="row"
                      >
                        {pay.date ? renderDate(pay.date) : ""}
                      </TableCell>
                      <TableCell
                        className={classes.tableCell}
                        component="td"
                        scope="row"
                      >
                        {currencyFormat(pay.amount)}
                      </TableCell>
                      <TableCell
                        className={classes.tableCell}
                        component="td"
                        scope="row"
                      >
                        {pay.user}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </div>
  );
};
export default RenderBillDetails;
