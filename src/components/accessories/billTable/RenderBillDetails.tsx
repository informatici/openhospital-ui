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
  },
  tableCell: {
    paddingRight: 4,
    paddingLeft: 5,
  },
}));

const RenderBillDetails: FC<IBillProps> = ({ fullBill }) => {
  const classes = useStyles();
  return (
    <div className="bill_details">
      <Card className={classes.root}>
        <CardContent>
          <TableContainer style={{ maxHeight: 300 }}>
            <Table
              style={{ whiteSpace: "nowrap" }}
              stickyHeader
              className={classes.table}
              size="small"
              aria-label="results table"
            >
              <TableHead>
                <TableCell
                  className={classes.tableCell}
                  style={{ fontWeight: "bold" }}
                  colSpan={4}
                >
                  Bill No: {fullBill.billDTO?.id}
                </TableCell>
                <TableRow>
                  <TableCell className={classes.tableCell}>Patient</TableCell>
                  <TableCell className={classes.tableCell}>Amount</TableCell>
                  <TableCell className={classes.tableCell}>Balance </TableCell>
                  <TableCell className={classes.tableCell}>Status</TableCell>
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
                    {fullBill.billDTO?.amount?.toFixed(2)}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {fullBill.billDTO?.balance?.toFixed(2)}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {fullBill.billDTO?.status === "C" ? "Closed" : "Pending"}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <Table
              style={{ whiteSpace: "nowrap" }}
              stickyHeader
              className="table"
              size="small"
              aria-label="results table"
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    className={classes.tableCell}
                    style={{ fontWeight: "bold" }}
                    colSpan={4}
                  >
                    Items
                  </TableCell>
                </TableRow>
                <TableRow key={"header1"}>
                  <TableCell className={classes.tableCell}>#</TableCell>
                  <TableCell className={classes.tableCell}>
                    Designation
                  </TableCell>
                  <TableCell className={classes.tableCell}>Quantity</TableCell>
                  <TableCell>Amount</TableCell>
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
                        component="td"
                        scope="row"
                      >
                        {item.itemAmount?.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>

            <Table
              style={{ whiteSpace: "nowrap" }}
              stickyHeader
              className="table"
              size="small"
              aria-label="results table"
            >
              <TableHead>
                <TableCell
                  className={classes.tableCell}
                  style={{ fontWeight: "bold" }}
                  colSpan={4}
                >
                  Payments
                </TableCell>
                <TableRow className={classes.tableCell} key={"header2"}>
                  <TableCell className={classes.tableCell}>#</TableCell>
                  <TableCell className={classes.tableCell}>Date</TableCell>
                  <TableCell className={classes.tableCell}>Amount</TableCell>
                  <TableCell className={classes.tableCell}>Cashier</TableCell>
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
                        {pay.amount?.toFixed(2)}
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
