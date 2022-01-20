import moment from "moment";
import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { FullBillDTO } from "../../../generated";
import { getBillsByYear, searchBills } from "../../../state/bills/actions";
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
import { monthList, yearList } from "./consts";
import { currencyFormat } from "../../../libraries/formatUtils/currencyFormatting";
import SelectField from "../selectField/SelectField";
import InfoBox from "../infoBox/InfoBox";

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
  const [summaryByYear, summaryByYearChange] = useState({} as IBillSummary);
  const dispatch = useDispatch();
  const [year, setYear] = useState(() => {
    return {
      value: new Date().getFullYear().toString(),
      label: new Date().getFullYear().toString(),
    };
  });

  const currentData = useSelector<IState, FullBillDTO[]>((state) => {
    return state.bills.searchBills.data ?? [];
  });

  const dataByYear = useSelector<IState, FullBillDTO[]>((state) => {
    return state.bills.getBillsByYear.data ?? [];
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
    const summary = computeBillSummary(currentData);
    summaryCurrentYearChange(summary);
  }, [currentData]);

  useEffect(() => {
    const summaryData = computeBillSummary(dataByYear);
    summaryByYearChange(summaryData);
  }, [dataByYear]);

  useEffect(() => {
    dispatch(searchBills(filter as TFilterValues));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getBillsByYear(+year.value));
  }, [dispatch, year]);

  const getOptions = (
    title: string,
    enableTooltip: boolean = true,
    chosenYear: string = ""
  ) => {
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
          text: title + " " + chosenYear,
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
    [summaryCurrentYear]
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
            labels.length != 0
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
            labels.length != 0
              ? labels.map(
                  (item) => summaryCurrentYear.debtsByMonthsOfYear[item] ?? 0
                )
              : [],
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ],
    };
  }, [summaryCurrentYear]);

  const getOptionsFromYears = (years: number[]) => {
    return years.map((item) => {
      return {
        label: item + "",
        value: item + "",
      };
    });
  };
  const infoBoxRef = useRef<HTMLDivElement>(null);

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
        <Line
          options={getOptions(t("bill.paymentsvariations"))}
          data={paymentsVariationsData}
        />
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
        {dataByYear.length > 0 ? (
          [
            <Bar
              options={getOptions(
                t("bill.bestsellingbyquantity"),
                true,
                year.value
              )}
              data={getDataFromObject(
                "bestSellingByQuantity",
                t("bill.totalquantity")
              )}
            />,
            <Bar
              options={getOptions(
                t("bill.bestsellingbyoccurence"),
                true,
                year.value
              )}
              data={getDataFromObject(
                "bestSellingByOccurence",
                t("bill.totaloccurence")
              )}
            />,
            <Bar
              options={getOptions(t("bill.bestpatients"), true, year.value)}
              data={getDataFromObject(
                "bestPatientsByPayments",
                t("bill.totalpayment")
              )}
            />,
            <Bar
              options={getOptions(
                t("bill.mostindebtpatients"),
                true,
                year.value
              )}
              data={getDataFromObject(
                "mostIndebtedPatients",
                t("bill.totaldebt")
              )}
            />,
          ]
        ) : (
          <div ref={infoBoxRef} className="info-box-container">
            <InfoBox type="warning" message={t("common.emptydata")} />
          </div>
        )}
      </div>
    </div>
  );
};
