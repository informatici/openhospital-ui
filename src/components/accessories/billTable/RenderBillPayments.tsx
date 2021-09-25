import React, { FC } from "react";
import { BillPaymentsDTO } from "../../../generated";
import { renderDate } from "../../../libraries/formatUtils/dataFormatting";

interface IPaymentsProps {
  payments: BillPaymentsDTO[];
}

export const RenderBillPayments: FC<IPaymentsProps> = ({ payments }) => {
  return (
    <ul>
      {payments.map((pay) => (
        <li>
          <span> Date: </span>
          <span>{pay.date ? renderDate(pay.date) : ""} </span>
          <span> Amount: </span>
          <span>{pay.amount} </span>
          <span> Cashier: </span>
          <span>{pay.user} </span>
        </li>
      ))}
    </ul>
  );
};
