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
import { useWindowWidth } from "../../../libraries/hooks/useWindowsWidth";
import { isMobile } from "../../../libraries/uiUtils/screenUtils";

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
                  name: userCredentials?.displayName ?? "",
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
          {dataByYear.length > 0 ? (
            [
              <div className="bills__recap__item inline">
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
              </div>,
              <div className="bills__recap__item inline">
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
              </div>,
              <div className="bills__recap__item inline">
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
              </div>,
              <div className="bills__recap__item inline">
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
              </div>,
            ]
          ) : (
            <div ref={infoBoxRef} className="info-box-container">
              <InfoBox type="warning" message={t("common.emptydata")} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
