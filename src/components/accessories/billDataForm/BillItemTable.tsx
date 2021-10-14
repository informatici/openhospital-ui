import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { BillDTO, BillItemsDTO, FullBillDTO } from "../../../generated";
import Table from "../table/Table";

interface IOwnProps {
  shouldUpdateTable: boolean;
  handleEdit: (row: any) => void;
  handleDelete: (row: BillItemsDTO) => void;
  billItems: BillItemsDTO[];
}

const BillItemTable: React.FC<IOwnProps> = ({
  handleDelete,
  handleEdit,
  shouldUpdateTable,
  billItems,
}) => {
  const { t } = useTranslation();
  const infoBoxRef = useRef<HTMLDivElement>(null);

  const header = [
    "itemDescription",
    "itemQuantity",
    "itemAmount",
    "totalAmount",
  ];

  const label = {
    itemDescription: t("bill.description"),
    itemQuantity: t("bill.quantity"),
    itemAmount: t("bill.amount"),
    totalAmount: t("bill.total"),
  };
  const order = ["itemAmount", "itemDescription", "itemAmount", "totalAmount"];
  const rows = billItems.map((e) => {
    return {
      ...e,
      totalAmount: (e.itemAmount ?? 0) * (e.itemQuantity ?? 0),
    };
  });

  useEffect(() => {});

  return (
    <Table
      rowData={rows}
      tableHeader={header}
      labelData={label}
      columnsOrder={order}
      rowsPerPage={20}
      onDelete={handleDelete}
      isCollapsabile={false}
      onEdit={() => {}}
    />
  );
};

export { BillItemTable };
