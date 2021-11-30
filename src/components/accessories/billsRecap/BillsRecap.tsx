import { Card, CardContent, CardHeader, Typography } from "@material-ui/core";
import { CalendarToday, DateRange, Person } from "@material-ui/icons";
import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { currencyFormat } from "../../../libraries/formatUtils/currencyFormatting";
import { IBillSummary } from "../../activities/billingActivity/types";
import "./styles.scss";

export const BillsRecap: FC = () => {
  const { t } = useTranslation();
  const [summary, billSummaryChange] = useState({} as IBillSummary);
  return (
    <div className="bills__recap">
      <div className="bills__recap__title">{t("bill.recaps")}</div>
      <div className="bills__recap__content">
        <Card className="item__card">
          <CardHeader title={t("bill.today")} avatar={<CalendarToday />} />
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
          <CardHeader title={t("bill.notpaid")} avatar={<CalendarToday />} />
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
          <CardHeader title={t("bill.period")} avatar={<DateRange />} />
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
          <CardHeader title={t("bill.notpaid")} avatar={<DateRange />} />
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
