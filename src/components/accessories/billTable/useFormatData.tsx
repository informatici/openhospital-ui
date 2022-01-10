import { useTranslation } from "react-i18next";
import { BillPaymentsDTO, FullBillDTO } from "../../../generated";
import { renderDate } from "../../../libraries/formatUtils/dataFormatting";
import { Link } from "react-router-dom";
import React from "react";
import { IStatus } from "./types";
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

  let results = new Array();
  if (data)
    results = data
      .filter(
        (fbil) =>
          (status === "CLOSE" && fbil.billDTO?.status === "C") ||
          (status === "DELETE" && fbil.billDTO?.status === "D") ||
          (status === "PENDING" && fbil.billDTO?.status === "O") ||
          status === "ALL"
      )
      .map((item) => {
        return {
          id: item.billDTO?.id ?? "",
          date: item.billDTO?.date ? renderDate(item.billDTO.date) : "",
          patient: (
            <Link
              to={`/details/${item.billDTO?.patientDTO?.code}`}
              style={{ textDecoration: "none" }}
            >
              <strong>{item.billDTO?.patName}</strong>
            </Link>
          ),
          amount: currencyFormat(item.billDTO?.amount),
          balance: currencyFormat(item.billDTO?.balance),
          status: switchStatus(item.billDTO?.status),
          patId: item.billDTO?.patientDTO?.code,
          lastPayment: renderDate(
            getLastPayment(item.billPaymentsDTO ?? []).date ?? ""
          ),
        };
      });
  return results;
};
export default useFormatData;
