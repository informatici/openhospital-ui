import { useTranslation } from "react-i18next";
import { FullBillDTO } from "../../../generated";
import { renderDate } from "../../../libraries/formatUtils/dataFormatting";
import { Link } from "react-router-dom";
import React from "react";
import { IStatus } from "./types";
import { currencyFormat } from "../../../libraries/formatUtils/currencyFormatting";

const useFormatData = (data: FullBillDTO[] | undefined, status: IStatus) => {
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
        console.log("patient ohhhh....", item.billDTO);
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
        };
      });
  return results;
};
export default useFormatData;
