import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { BillDTO, BillItemsDTO, FullBillDTO } from "../../../generated";
import Table from "../table/Table";

interface IOwnProps {
  shouldUpdateTable: boolean;
  handleEdit: (row: any) => void;
  handleDelete: (code: number | undefined) => void;
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

  const header = ["itemDescription", "itemQuantity", "itemAmount"];

  const label = {
    itemDescription: t("bill.item"),
    itemQuantity: t("bill.quantity"),
    itemAmount: t("bill.amount"),
  };
  const order = ["itemAmount", "itemDescription", "itemAmount"];

  useEffect(() => {});

  return (
    <Table
      rowData={billItems}
      tableHeader={header}
      labelData={label}
      columnsOrder={order}
      rowsPerPage={20}
      onDelete={() => {}}
      isCollapsabile={false}
      onEdit={() => {}}
    />
  );
};

export { BillItemTable };
