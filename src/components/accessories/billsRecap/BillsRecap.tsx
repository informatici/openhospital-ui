import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import moment from "moment";
import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";
import { useTranslation } from "react-i18next";
import { getBillsByYear, searchBills } from "../../../state/bills";
import { IBillSummary } from "../../activities/billingActivity/types";
import { TFilterValues } from "../billTable/types";

import { computeBillSummary } from "./billsMining";

import { CircularProgress } from "@mui/material";
import { union } from "lodash";
import { currencyFormat } from "../../../libraries/formatUtils/currencyFormatting";
import { useWindowWidth } from "../../../libraries/hooks/useWindowsWidth";
import { isMobile } from "../../../libraries/uiUtils/screenUtils";
import SelectField from "../selectField/SelectField";
import { monthList, yearList } from "./consts";
import "./styles.scss";

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
  const [summaryCurrentYear, summaryCurrentYearChange] = useState(
    {} as IBillSummary
  );
  const width = useWindowWidth();
  const [summaryByYear, summaryByYearChange] = useState({} as IBillSummary);
  const dispatch = useAppDispatch();
  const [year, setYear] = useState(() => {
    return {
      value: new Date().getFullYear().toString(),
      label: new Date().getFullYear().toString(),
    };
  });

  const currentData = useAppSelector((state) => {
    return state.bills.searchBills.data ?? [];
  });

  const dataByYear = useAppSelector((state) => {
    return state.bills.getBillsByYear.data ?? [];
  });

  const dataByYearIsLoading = useAppSelector((state) => {
    return state.bills.getBillsByYear.status === "LOADING";
  });

  const userCredentials = useAppSelector(
    (state) => state.main.authentication.data
  );

  const filter = {
    fromDate: moment().startOf("year").toISOString(),
    toDate: moment().toISOString(),
    patientCode: 0,
  };
  useEffect(() => {
    const summary = computeBillSummary(currentData);
    summaryCurrentYearChange(summary);
  }, [currentData]);

  useEffect(() => {
    const summaryData = computeBillSummary(dataByYear);
    summaryByYearChange(summaryData);
  }, [dataByYear]);

  useEffect(() => {
    dispatch(searchBills(filter as TFilterValues));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    dispatch(getBillsByYear(+year.value));
  }, [dispatch, year]);

  const getOptions = (
    title: string,
    enableTooltip: boolean = true,
    aspectRatio: number,
    chosenYear: string = ""
  ) => {
    return {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: aspectRatio,
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
          text: title + " " + chosenYear,
          padding: {
            top: 0,
            bottom: 20,
          },
          font: {
            size: 16,
          },
        },
      },
    };
  };

  const getDataFromObject = useCallback(
    (obj: string, label: string) => {
      return {
        labels: (summaryByYear as any)[obj]
          ? Object.keys((summaryByYear as any)[obj])
          : [],
        datasets: [
          {
            data: (summaryByYear as any)[obj]
              ? Object.values((summaryByYear as any)[obj])
              : [],
            backgroundColor: ["#87CEEB"],
            hoverBackgroundColor: ["#501800", "#4B5000"],
            label: label,
            borderWidth: 10,
          },
        ],
      };
    },
    [summaryByYear]
  );

  const getDataFromTwoObjects = useCallback(
    (totalPayment: string, totalPending: string) => {
      const labels = [t("bill.totalpayment"), t("bill.totalpending")];
      const dataset =
        (summaryCurrentYear as any)[totalPayment] &&
        (summaryCurrentYear as any)[totalPending]
          ? [
              (summaryCurrentYear as any)[totalPayment],
              (summaryCurrentYear as any)[totalPending],
            ]
          : [];
      let customLabels = labels.map(
        (label, index) => `${label}: ${currencyFormat(dataset[index] ?? " ")}`
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
    [summaryCurrentYear, t]
  );

  const paymentsVariationsData = useMemo(() => {
    const labels =
      summaryCurrentYear.debtsByMonthsOfYear &&
      summaryCurrentYear.paymentsByMonthsOfYear
        ? union(
            Object.keys(summaryCurrentYear.debtsByMonthsOfYear),
            Object.keys(summaryCurrentYear.paymentsByMonthsOfYear)
          ).sort((a, b) => monthList.indexOf(a) - monthList.indexOf(b))
        : [];
    return {
      labels,
      datasets: [
        {
          label: t("bill.payments"),
          data:
            labels.length !== 0
              ? labels.map(
                  (item) => summaryCurrentYear.paymentsByMonthsOfYear[item] ?? 0
                )
              : [],
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
          label: t("bill.debts"),
          data:
            labels.length !== 0
              ? labels.map(
                  (item) => summaryCurrentYear.debtsByMonthsOfYear[item] ?? 0
                )
              : [],
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ],
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [summaryCurrentYear]);

  const getOptionsFromYears = (years: number[]) => {
    return years.map((item) => {
      return {
        label: item + "",
        value: item + "",
      };
    });
  };

  return (
    <div className="bills__recap">
      <div className="bills__recap__content">
        <div className="bills__recap__items">
          <div className="bills__recap__item">
            <Doughnut
              data={getDataFromTwoObjects("dailyRevenue", "dailyDebt")}
              options={getOptions(
                `${t("bill.today")} (${moment().format("DD/MM/YYYY")})`,
                false,
                1
              )}
            />
          </div>
          <div className="bills__recap__item">
            <Pie
              data={getDataFromTwoObjects("weeklyRevenue", "weeklyDebt")}
              options={getOptions(
                `${t("bill.week", {
                  start: moment().startOf("week").format("DD/MM/YYYY"),
                })}`,
                false,
                1
              )}
            />
          </div>
          <div className="bills__recap__item">
            <Pie
              data={getDataFromTwoObjects("monthlyRevenue", "monthlyDebt")}
              options={getOptions(
                `${moment().format("MMMM")} ${moment().format("YYYY")}`,
                false,
                1
              )}
            />
          </div>
          <div className="bills__recap__item">
            <Doughnut
              data={getDataFromTwoObjects("annualRevenue", "annualDebt")}
              options={getOptions(
                `${t("bill.year")} ${moment().format("YYYY")}`,
                false,
                1
              )}
            />
          </div>
          <div className="bills__recap__item">
            <Doughnut
              data={getDataFromTwoObjects(
                "currentUserCashIn",
                "currentUserDebt"
              )}
              options={getOptions(
                t("bill.currentuser", {
                  name: userCredentials?.username ?? "",
                }),
                false,
                1
              )}
            />
          </div>
        </div>
        <div className="bills__recap__items">
          <div className="bills__recap__item inline">
            <Line
              options={getOptions(t("bill.paymentsvariations"), false, 3)}
              data={paymentsVariationsData}
            />
          </div>
        </div>
        <div className="year__picker">
          <SelectField
            fieldName="status"
            fieldValue={year.value}
            label={t("bill.year")}
            isValid={false}
            errorText={""}
            onBlur={(e: any, value: any) => {
              setYear({ value: value, label: value });
            }}
            options={getOptionsFromYears(yearList)}
            variant="standard"
          />
        </div>
        <div className="bills__recap__items">
          <div className="bills__recap__item inline">
            {dataByYearIsLoading && <CircularProgress className="loader" />}
            <Bar
              options={getOptions(
                t("bill.bestsellingbyquantity"),
                true,
                isMobile(width) ? 1 : 3,
                year.value
              )}
              data={getDataFromObject(
                "bestSellingByQuantity",
                t("bill.totalquantity")
              )}
            />
          </div>
          <div className="bills__recap__item inline">
            {dataByYearIsLoading && <CircularProgress className="loader" />}
            <Bar
              options={getOptions(
                t("bill.bestsellingbyoccurence"),
                true,
                isMobile(width) ? 1 : 3,
                year.value
              )}
              data={getDataFromObject(
                "bestSellingByOccurence",
                t("bill.totaloccurence")
              )}
            />
          </div>
          <div className="bills__recap__item inline">
            {dataByYearIsLoading && <CircularProgress className="loader" />}
            <Bar
              options={getOptions(
                t("bill.bestpatients"),
                true,
                isMobile(width) ? 1 : 3,
                year.value
              )}
              data={getDataFromObject(
                "bestPatientsByPayments",
                t("bill.totalpayment")
              )}
            />
          </div>
          <div className="bills__recap__item inline">
            {dataByYearIsLoading && <CircularProgress className="loader" />}
            <Bar
              options={getOptions(
                t("bill.mostindebtpatients"),
                true,
                isMobile(width) ? 1 : 3,
                year.value
              )}
              data={getDataFromObject(
                "mostIndebtedPatients",
                t("bill.totaldebt")
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
