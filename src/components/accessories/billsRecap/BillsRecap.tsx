import { Card, CardContent, CardHeader, Typography } from "@material-ui/core";
import { CalendarToday, DateRange, Person } from "@material-ui/icons";
import moment from "moment";
import React, { FC, useEffect, useState } from "react";
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

  return (
    <div className="bills__recap">
      <div className="bills__recap__title">{t("bill.recaps")}</div>
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
              {summary.dailyDebt ? currencyFormat(summary.dailyDebt) : "-"}
            </Typography>
          </CardContent>
        </Card>

        <Card className="item__card">
          <CardHeader title={`${t("bill.week")}`} avatar={<DateRange />} />
          <CardContent>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className="item__value"
            >
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
              {summary.currentUserDebt
                ? currencyFormat(summary.currentUserDebt)
                : "-"}
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
