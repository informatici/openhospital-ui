import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React, { FC } from "react";
import { FullBillDTO } from "../../../generated";
import { renderDate } from "../../../libraries/formatUtils/dataFormatting";
import "./styles.scss";

interface IBillProps {
  fullBill: FullBillDTO;
}

const RenderBillDetails: FC<IBillProps> = ({ fullBill }) => {
  return (
    <div className="bill_details">
      <Card style={{ border: "none", boxShadow: "none" }}>
        <CardContent>
          <TableContainer>
            <Table
              style={{ whiteSpace: "nowrap" }}
              stickyHeader
              className="table"
              size="small"
              aria-label="results table"
            >
              <TableHead>
                <TableCell style={{ fontWeight: "bold" }} colSpan={4}>
                  Bill No: {fullBill.billDTO?.id}
                </TableCell>
                <TableRow>
                  <TableCell>Patient</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Balance </TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{fullBill.billDTO?.patName}</TableCell>
                  <TableCell>{fullBill.billDTO?.amount} </TableCell>
                  <TableCell>{fullBill.billDTO?.balance} </TableCell>
                  <TableCell>
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
                  <TableCell style={{ fontWeight: "bold" }} colSpan={4}>
                    Items
                  </TableCell>
                </TableRow>
                <TableRow key={"header1"}>
                  <TableCell>#</TableCell>
                  <TableCell>Designation</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fullBill?.billItemsDTO &&
                  fullBill?.billItemsDTO.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{++index}</TableCell>
                      <TableCell component="td" scope="row">
                        {item.itemDescription}
                      </TableCell>
                      <TableCell component="td" scope="row">
                        {item.itemQuantity}
                      </TableCell>
                      <TableCell component="td" scope="row">
                        {item.itemAmount}
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
                <TableCell style={{ fontWeight: "bold" }} colSpan={4}>
                  Payments
                </TableCell>
                <TableRow key={"header2"}>
                  <TableCell>#</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Cashier</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fullBill?.billPaymentsDTO &&
                  fullBill?.billPaymentsDTO.map((pay, index) => (
                    <TableRow key={++index}>
                      <TableCell>{index}</TableCell>
                      <TableCell component="td" scope="row">
                        {pay.date ? renderDate(pay.date) : ""}
                      </TableCell>
                      <TableCell component="td" scope="row">
                        {pay.amount}
                      </TableCell>
                      <TableCell component="td" scope="row">
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
