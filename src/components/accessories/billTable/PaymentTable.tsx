import React from "react";
import { useTranslation } from "react-i18next";
import { BillPaymentsDTO } from "../../../generated";
import Table from "../table/Table";
import moment from "moment";

const createFakePayment = (type: string, amount: number) => {
  return { type, amount };
};

interface IOwnProps {
  shouldUpdateTable: boolean;
  handleEdit: (row: any) => void;
  handleDelete: (row: BillPaymentsDTO) => void;
  payments: BillPaymentsDTO[];
}

const PaymentTable: React.FC<IOwnProps> = ({
  handleDelete,
  handleEdit,
  shouldUpdateTable,
  payments,
}) => {
  const { t } = useTranslation();

  const header = ["date", "amount"];

  const label = {
    date: t("bill.date"),
    amount: t("bill.amount"),
  };
  const order = ["date", "amount"];

  const paymentRows = payments.map((p) => {
    return {
      id: p.id,
      date: moment(p.date).format("DD/MM/YYYY"),
      amount: p.amount,
    };
  });

  const onEdit = (row: any) => {
    let p = payments.find((e) => e.id == row.id);
    handleEdit({
      ...row,
      date: p?.date,
    });
  };

  return (
    <Table
      rowData={paymentRows}
      tableHeader={header}
      labelData={label}
      columnsOrder={order}
      rowsPerPage={20}
      onDelete={handleDelete}
      isCollapsabile={false}
      onEdit={onEdit}
    />
  );
};

export { PaymentTable };
