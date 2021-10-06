import React from "react";
import { useTranslation } from "react-i18next";
import Table from "../table/Table";

const createFakeBill = (item: string, quantity: number, amount: number) => {
  return { item, quantity, amount };
};

const billItemRows = [
  createFakeBill("Amoxiciline", 4, 3500),
  createFakeBill("Amoxiciline", 5, 10000),
  createFakeBill("Amoxiciline", 10, 6500),
  createFakeBill("Amoxiciline", 8, 15000),
];

const BillItemTable: React.FC = () => {
  const { t } = useTranslation();

  const header = ["item", "quantity", "amount"];

  const label = {
    item: t("billItem.item"),
    quantity: t("billItem.quantity"),
    amount: t("billItem.amount"),
  };
  const order = ["amount", "item"];

  return (
    <Table
      rowData={billItemRows}
      tableHeader={header}
      labelData={label}
      columnsOrder={order}
      rowsPerPage={3}
      onDelete={() => {}}
      isCollapsabile={false}
      onEdit={() => {}}
      onView={() => {}}
    />
  );
};

export { BillItemTable, billItemRows };
