import React from "react";
import { useTranslation } from "react-i18next";
import Table from "../table/Table";

const createFakePayment = (type: string, amount: number) => {
  return { type, amount };
};

const PaymentTable: React.FC = () => {
  const { t } = useTranslation();

  const header = ["type", "amount"];

  const paymentRows = [
    createFakePayment(t("bill.payment"), 3500),
    createFakePayment(t("bill.payment"), 10000),
    createFakePayment(t("bill.refund"), 6500),
    createFakePayment(t("bill.payment"), 15000),
  ];

  const label = {
    type: t("bill.paymentType"),
    amount: t("bill.amount"),
  };
  const order = ["amount", "type"];

  return (
    <Table
      rowData={paymentRows}
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

export { PaymentTable };
