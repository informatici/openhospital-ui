import { Card, CardContent, CardHeader, Typography } from "@material-ui/core";
import { TDashboardCardProps } from "./types";
import React from "react";
import "./styles.scss";
import { DashboardCardActions } from "./DashboardCardOptions";

export const DashboardCard: React.FC<TDashboardCardProps> = ({
  actions,
  avatar,
  title,
  subtitle,
  children,
}) => {
  const getTitle = () => {
    return title ? (
      <Typography className="card-title" noWrap>
        {title}
      </Typography>
    ) : null;
  };

  return (
    <Card className="DashboardCard-item" variant="outlined">
      <CardHeader
        className="DashboardCard-item-header"
        avatar={avatar ?? false}
        action={<DashboardCardActions actions={actions} />}
        title={getTitle()}
        subheader={subtitle ?? false}
      ></CardHeader>
      <CardContent className="DashboardCard-item-content">
        {children}
      </CardContent>
    </Card>
  );
};
