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
    fromDate: moment().startOf("month").toISOString(),
    toDate: moment().toISOString(),
    patientCode: 0,
  };
  useEffect(() => {
    const summary = computeBillSummary(
      data,
      filter.fromDate,
      filter.toDate,
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
              {summary.today ? currencyFormat(summary.today) : "-"}
            </Typography>
          </CardContent>
        </Card>
        <Card className="item__card">
          <CardHeader
            title={`${t("bill.notpaid")} (${moment().format("DD/MM/YYYY")})`}
            avatar={<CalendarToday />}
          />
          <CardContent>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className="item__value"
            >
              {summary.todayNotPaid
                ? currencyFormat(summary.todayNotPaid)
                : "-"}
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
              {summary.period ? currencyFormat(summary.period) : "-"}
            </Typography>
          </CardContent>
        </Card>

        <Card className="item__card">
          <CardHeader
            title={`${t("bill.notpaid")} (${moment().format("MMMM")})`}
            avatar={<DateRange />}
          />
          <CardContent className="item__card__content">
            <Typography variant="body2" color="textSecondary" component="h3">
              {summary.periodNotPaid
                ? currencyFormat(summary.periodNotPaid)
                : "-"}
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
              {summary.user ? currencyFormat(summary.user) : "-"}
            </Typography>
          </CardContent>
        </Card>

        <Card className="item__card">
          <CardHeader title={t("bill.notpaid")} avatar={<Person />} />
          <CardContent className="item__card__content">
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className="item__value"
            >
              {summary.userNotPaid ? currencyFormat(summary.userNotPaid) : "-"}
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
