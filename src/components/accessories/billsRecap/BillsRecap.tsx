import { Card, CardContent, CardHeader, Typography } from "@material-ui/core";
import {
  AutorenewRounded,
  BarChart,
  CalendarToday,
  ChatRounded,
  CheckCircleOutline,
  DateRange,
  Person,
  ViewWeek,
} from "@material-ui/icons";
import moment from "moment";
import { Chart } from "react-charts";
import React, { FC, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { FullBillDTO } from "../../../generated";
import { currencyFormat } from "../../../libraries/formatUtils/currencyFormatting";
import { searchBills } from "../../../state/bills/actions";
import { TUserCredentials } from "../../../state/main/types";
import { IState } from "../../../types";
import { IBillSummary } from "../../activities/billingActivity/types";
import { TFilterValues } from "../billTable/types";

import { computeBillSummary } from "./config";

import "./styles.scss";
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

  const axes = React.useMemo(
    () => [
      { primary: true, type: "ordinal", position: "bottom" },
      { position: "left", type: "linear", stacked: true },
    ],
    []
  );

  const series = useMemo(
    () => ({
      type: "bar",
    }),
    []
  );

  const data1 = useMemo(() => {
    return [
      {
        data: summary.bestSellingByQuantity
          ? Object.entries(summary.bestSellingByQuantity)
          : [],
        dataType: "ordinal",
      },
    ];
  }, [summary.bestSellingByQuantity]);

  const data2 = useMemo(() => {
    return [
      {
        data: summary.bestSellingByOccurence
          ? Object.entries(summary.bestSellingByOccurence)
          : [],
      },
    ];
  }, [summary.bestSellingByOccurence]);

  const data3 = useMemo(() => {
    return [
      {
        data: summary.bestPatientsByPayments
          ? Object.entries(summary.bestPatientsByPayments)
          : [],
      },
    ];
  }, [summary.bestPatientsByPayments]);

  const data4 = useMemo(() => {
    return [
      {
        data: summary.mostIndebtedPatients
          ? Object.entries(summary.mostIndebtedPatients)
          : [],
      },
    ];
  }, [summary.mostIndebtedPatients]);

  return (
    <div className="bills__recap">
      <div className="bills__recap__content">
        <Card className="item__card">
          <CardHeader
            title={`${t("bill.today")} (${moment().format("DD/MM/YYYY")})`}
            avatar={<CalendarToday />}
          />
          <CardContent>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className="item__value"
            >
              <CheckCircleOutline style={{ fill: "green" }} />
              {summary.dailyRevenue
                ? currencyFormat(summary.dailyRevenue)
                : "-"}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className="item__value"
            >
              <AutorenewRounded style={{ fill: "red" }} />
              {summary.dailyDebt ? currencyFormat(summary.dailyDebt) : "-"}
            </Typography>
          </CardContent>
        </Card>

        <Card className="item__card">
          <CardHeader title={`${t("bill.week")}`} avatar={<ViewWeek />} />
          <CardContent>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className="item__value"
            >
              <CheckCircleOutline style={{ fill: "green" }} />
              {summary.weeklyRevenue
                ? currencyFormat(summary.weeklyRevenue)
                : "-"}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className="item__value"
            >
              <AutorenewRounded style={{ fill: "red" }} />
              {summary.weeklyDebt ? currencyFormat(summary.weeklyDebt) : "-"}
            </Typography>
          </CardContent>
        </Card>
        <Card className="item__card">
          <CardHeader
            title={`${t("bill.month")} (${moment().format("MMMM")})`}
            avatar={<DateRange />}
          />
          <CardContent>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className="item__value"
            >
              <CheckCircleOutline style={{ fill: "green" }} />
              {summary.monthlyRevenue
                ? currencyFormat(summary.monthlyRevenue)
                : "-"}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className="item__value"
            >
              <AutorenewRounded style={{ fill: "red" }} />
              {summary.monthlyDebt ? currencyFormat(summary.monthlyDebt) : "-"}
            </Typography>
          </CardContent>
        </Card>

        <Card className="item__card">
          <CardHeader
            title={`${t("bill.year")} (${moment().format("YYYY")})`}
            avatar={<DateRange />}
          />
          <CardContent>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className="item__value"
            >
              <CheckCircleOutline style={{ fill: "green" }} />
              {summary.annualRevenue
                ? currencyFormat(summary.annualRevenue)
                : "-"}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className="item__value"
            >
              <AutorenewRounded style={{ fill: "red" }} />
              {summary.annualDebt ? currencyFormat(summary.annualDebt) : "-"}
            </Typography>
          </CardContent>
        </Card>

        <Card className="item__card">
          <CardHeader title={t("bill.user")} avatar={<Person />} />
          <CardContent className="item__card__content">
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className="item__value"
            >
              <CheckCircleOutline style={{ fill: "green" }} />
              {summary.currentUserCashIn
                ? currencyFormat(summary.currentUserCashIn)
                : "-"}
            </Typography>

            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className="item__value"
            >
              <AutorenewRounded style={{ fill: "red" }} />
              {summary.currentUserDebt
                ? currencyFormat(summary.currentUserDebt)
                : "-"}
            </Typography>
          </CardContent>
        </Card>
        <Card className="item__card">
          <CardHeader
            title={t("bill.bestsellingbyqty")}
            avatar={<BarChart />}
          />
          <CardContent className="item__card__content">
            <div
              style={{
                width: "100%",
                minHeight: "300px",
              }}
            >
              <Chart data={data1} axes={axes} series={series} />
            </div>
          </CardContent>
        </Card>
        <Card className="item__card">
          <CardHeader
            title={t("bill.bestsellingbyoccurence")}
            avatar={<BarChart />}
          />
          <CardContent className="item__card__content">
            <div
              style={{
                width: "100%",
                minHeight: "400px",
              }}
            >
              <Chart data={data2} axes={axes} series={series} />
            </div>
          </CardContent>
        </Card>
        <Card className="item__card">
          <CardHeader title={t("bill.bestPatients")} avatar={<BarChart />} />
          <CardContent className="item__card__content">
            <div
              style={{
                width: "100%",
                minHeight: "400px",
              }}
            >
              <Chart data={data3} axes={axes} series={series} />
            </div>
          </CardContent>
        </Card>
        <Card className="item__card">
          <CardHeader
            title={t("bill.mostIndebtPatients")}
            avatar={<BarChart />}
          />
          <CardContent className="item__card__content">
            <div
              style={{
                width: "100%",
                minHeight: "400px",
              }}
            >
              <Chart data={data4} axes={axes} series={series} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
