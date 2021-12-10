import moment from "moment";
import React, { FC, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { FullBillDTO } from "../../../generated";
import { searchBills } from "../../../state/bills/actions";
import { TUserCredentials } from "../../../state/main/types";
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
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";

import { computeBillSummary } from "./config";

import "./styles.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
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
    const summary = computeBillSummary(
      data,
      userCredentials?.displayName ?? ""
    );
    billSummaryChange(summary);
  }, [data]);

  useEffect(() => {
    dispatch(searchBills(filter as TFilterValues));
  }, [dispatch]);

  const getOptions = (title: string) => {
    return {
      responsive: true,
      plugins: {
        legend: {
          position: "top" as const,
        },
        title: {
          display: true,
          text: title,
        },
      },
    };
  };

  const getDataFromObject = useCallback(
    (
      obj: string,
      label: string,
      bgColor: string = "rgba(255, 99, 132, 0.5)"
    ) => {
      return {
        labels: (summary as any)[obj] ? Object.keys((summary as any)[obj]) : [],
        datasets: [
          {
            data: (summary as any)[obj]
              ? Object.values((summary as any)[obj])
              : [],
            backgroundColor: bgColor,
            label: label,
          },
        ],
      };
    },
    [summary]
  );

  const getDataFromTwoObjects = useCallback(
    (obj1: string, obj2: string) => {
      return {
        labels: ["Total Payment", "Total Pending"],
        datasets: [
          {
            data:
              (summary as any)[obj1] && (summary as any)[obj2]
                ? [(summary as any)[obj1], (summary as any)[obj2]]
                : [],
            label: "# Of bills",
            backgroundColor: ["#B21F00", "#C9DE00"],
            hoverBackgroundColor: ["#501800", "#4B5000"],
          },
        ],
      };
    },
    [summary]
  );

  return (
    <div className="bills__recap">
      <div className="bills__recap__content">
        <div className="info__area">
          <Doughnut
            data={getDataFromTwoObjects("dailyRevenue", "dailyDebt")}
            options={getOptions(
              `${t("bill.today")} (${moment().format("DD/MM/YYYY")})`
            )}
          />
          <Doughnut
            data={getDataFromTwoObjects("weeklyRevenue", "weeklyDebt")}
            options={getOptions(`${t("bill.week")}`)}
          />
          <Doughnut
            data={getDataFromTwoObjects("monthlyRevenue", "monthlyDebt")}
            options={getOptions(
              `${t("bill.month")} (${moment().format("MMMM")})`
            )}
          />
          <Doughnut
            data={getDataFromTwoObjects("annualRevenue", "annualDebt")}
            options={getOptions(
              `${t("bill.year")} (${moment().format("YYYY")})`
            )}
          />
        </div>
        <div className="chart__area">
          <Bar
            options={getOptions("Best products By quantity")}
            data={getDataFromObject("bestSellingByQuantity", "Total Quantity")}
          />

          <Bar
            options={getOptions("Best products By occurence")}
            data={getDataFromObject(
              "bestSellingByOccurence",
              "Total Occuence",
              "rgba(53, 162, 235, 0.5)"
            )}
          />

          <Bar
            options={getOptions("Best patients")}
            data={getDataFromObject("bestPatientsByPayments", "Total payments")}
          />
          <Bar
            options={getOptions("Most Indebt patients")}
            data={getDataFromObject("mostIndebtedPatients", "Total balance")}
          />
        </div>
      </div>
    </div>
  );
};
