import { useTranslation } from "react-i18next";
import { BillPaymentsDTO, FullBillDTO } from "../../../generated";
import { renderDate } from "../../../libraries/formatUtils/dataFormatting";
import { Link } from "react-router-dom";
import React from "react";
import { IStatus, TBillDisplayData } from "./types";
import { currencyFormat } from "../../../libraries/formatUtils/currencyFormatting";

const useFormatData = (
  data: FullBillDTO[] | undefined,
  status: IStatus | undefined
) => {
  const { t } = useTranslation();
  const switchStatus = (status: string | undefined) => {
    switch (status) {
      case "C":
        return t("bill.closed");
      case "O":
        return t("bill.pending");
      case "D":
        return t("bill.deleted");
      default:
        return t("bill.unknown");
    }
  };

  const getLastPayment = (payments: BillPaymentsDTO[]) => {
    return payments.reduce((p, v) => {
      return new Date(p.date ?? "").getTime() <=
        new Date(v.date ?? "").getTime()
        ? p
        : v;
    });
  };

  let results: Array<TBillDisplayData> = [];
  if (data)
    results = data
      .filter(
        (fbil) =>
          (status === "CLOSE" && fbil.bill?.status === "C") ||
          (status === "DELETE" && fbil.bill?.status === "D") ||
          (status === "PENDING" && fbil.bill?.status === "O") ||
          status === "ALL"
      )
      .map((item) => {
        return {
          id: item.bill?.id ?? "",
          date: item.bill?.date ? renderDate(item.bill.date) : "",
          patient: (
            <Link
              to={`/details/${item.bill?.patient?.code}`}
              style={{ textDecoration: "none" }}
            >
              <strong>{item.bill?.patName}</strong>
            </Link>
          ),
          amount: currencyFormat(item.bill?.amount),
          balance: currencyFormat(item.bill?.balance),
          status: switchStatus(item.bill?.status),
          patId: item.bill?.patient?.code,
          lastPayment: renderDate(
            getLastPayment(item.billPayments ?? []).date ?? ""
          ),
        };
      });
  return results;
};
export default useFormatData;
