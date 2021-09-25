import React, { FC } from "react";
import { BillItemsDTO } from "../../../generated";

interface IBillItemsProps {
  billItems: BillItemsDTO[];
}

export const RenderBillItems: FC<IBillItemsProps> = ({ billItems }) => {
  return (
    <ul>
      {billItems.map((item) => (
        <li>
          <span> Designation: </span>
          <span>{item.itemDescription} </span>
          <span> Quantity: </span>
          <span>{item.itemQuantity} </span>
          <span> Amount: </span>
          <span>{item.itemAmount} </span>
        </li>
      ))}
    </ul>
  );
};
