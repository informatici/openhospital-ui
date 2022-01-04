import moment from "moment";
import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { FullBillDTO } from "../../../generated";
import { searchBills } from "../../../state/bills/actions";
import { IState } from "../../../types";
import { IBillSummary } from "../../activities/billingActivity/types";
import { TFilterValues } from "../billTable/types";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";

import { computeBillSummary } from "./billsMining";

import "./styles.scss";
import { TUserCredentials } from "../../../state/main/types";
import { union } from "lodash";
import { monthList } from "./consts";
import { currencyFormat } from "../../../libraries/formatUtils/currencyFormatting";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);
export const BillsRecap: FC = () => {
  const { t } = useTranslation();
  const [summary, billSummaryChange] = useState({} as IBillSummary);
  const dispatch = useDispatch();

  const data = useSelector<IState, FullBillDTO[]>((state) => {
    return state.bills.searchBills.data ?? [];
  });

  const userCredentials = useSelector<IState, TUserCredentials>(
    (state) => state.main.authentication.data
  );

  const filter = {
    fromDate: moment().startOf("year").toISOString(),
    toDate: moment().toISOString(),
    patientCode: 0,
  };
  useEffect(() => {
    const summary = computeBillSummary(data);
    billSummaryChange(summary);
  }, [data]);

  useEffect(() => {
    dispatch(searchBills(filter as TFilterValues));
  }, [dispatch]);

  const getOptions = (title: string, enableTooltip: boolean = true) => {
    return {
      responsive: false,

      plugins: {
        tooltip: {
          enabled: enableTooltip,
        },

        legend: {
          display: true,
          position: "top" as const,
          labels: {
            boxWidth: 10,
          },
        },

        title: {
          display: true,
          text: title,
        },
      },
    };
  };

  const getDataFromObject = useCallback(
    (obj: string, label: string) => {
      return {
        labels: (summary as any)[obj] ? Object.keys((summary as any)[obj]) : [],
        datasets: [
          {
            data: (summary as any)[obj]
              ? Object.values((summary as any)[obj])
              : [],
            backgroundColor: ["#87CEEB"],
            hoverBackgroundColor: ["#501800", "#4B5000"],
            label: label,
            borderWidth: 10,
          },
        ],
      };
    },
    [summary]
  );

  const getDataFromTwoObjects = useCallback(
    (totalPayment: string, totalPending: string) => {
      const labels = [t("bill.totalpayment"), t("bill.totalpending")];
      const dataset =
        (summary as any)[totalPayment] && (summary as any)[totalPending]
          ? [(summary as any)[totalPayment], (summary as any)[totalPending]]
          : [];
      let customLabels = labels.map(
        (label, index) => `${label}: ${currencyFormat(dataset[index])}`
      );

      return {
        labels: customLabels,
        datasets: [
          {
            data: dataset,
            backgroundColor: ["#FF1493", "#87CEEB"],
            hoverBackgroundColor: ["#501800", "#4B5000"],
          },
        ],
      };
    },
    [summary]
  );

  const paymentsVariationsData = useMemo(() => {
    const labels =
      summary.debtsByMonthsOfYear && summary.paymentsByMonthsOfYear
        ? union(
            Object.keys(summary.debtsByMonthsOfYear),
            Object.keys(summary.paymentsByMonthsOfYear)
          ).sort((a, b) => monthList.indexOf(a) - monthList.indexOf(b))
        : [];
    return {
      labels,
      datasets: [
        {
          label: t("bill.payments"),
          data:
            labels.length != 0
              ? labels.map((item) => summary.paymentsByMonthsOfYear[item] ?? 0)
              : [],
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
          label: t("bill.debts"),
          data:
            labels.length != 0
              ? labels.map((item) => summary.debtsByMonthsOfYear[item] ?? 0)
              : [],
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ],
    };
  }, [summary]);

  return (
    <div className="bills__recap">
      <div className="bills__recap__content">
        <Doughnut
          data={getDataFromTwoObjects("dailyRevenue", "dailyDebt")}
          options={getOptions(
            `${t("bill.today")} (${moment().format("DD/MM/YYYY")})`,
            false
          )}
        />
        <Pie
          data={getDataFromTwoObjects("weeklyRevenue", "weeklyDebt")}
          options={getOptions(
            `${t("bill.week", {
              start: moment().startOf("week").format("DD/MM/YYYY"),
            })}`,
            false
          )}
        />
        <Pie
          data={getDataFromTwoObjects("monthlyRevenue", "monthlyDebt")}
          options={getOptions(
            `${moment().format("MMMM")} ${moment().format("YYYY")}`,
            false
          )}
        />
        <Doughnut
          data={getDataFromTwoObjects("annualRevenue", "annualDebt")}
          options={getOptions(
            `${t("bill.year")} ${moment().format("YYYY")}`,
            false
          )}
        />
        <Doughnut
          data={getDataFromTwoObjects("currentUserCashIn", "currentUserDebt")}
          options={getOptions(
            t("bill.currentuser", { name: userCredentials?.displayName ?? "" }),
            false
          )}
        />
        <Bar
          options={getOptions(t("bill.bestsellingbyquantity"))}
          data={getDataFromObject(
            "bestSellingByQuantity",
            t("bill.totalquantity")
          )}
        />
        <Bar
          options={getOptions(t("bill.bestsellingbyoccurence"))}
          data={getDataFromObject(
            "bestSellingByOccurence",
            t("bill.totaloccurence")
          )}
        />
        <Bar
          options={getOptions(t("bill.bestpatients"))}
          data={getDataFromObject(
            "bestPatientsByPayments",
            t("bill.totalpayment")
          )}
        />
        <Bar
          options={getOptions(t("bill.mostindebtpatients"))}
          data={getDataFromObject("mostIndebtedPatients", t("bill.totaldebt"))}
        />
        <Line
          options={getOptions(t("bill.paymentsvariations"))}
          data={paymentsVariationsData}
        />
      </div>
    </div>
  );
};
