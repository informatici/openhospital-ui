import { Card, CardContent, CardHeader, Typography } from "@material-ui/core";
import { TDashboardCardProps } from "./types";
import React, { useRef, useEffect } from "react";
import "./styles.scss";
import { DashboardCardActions } from "./DashboardCardOptions";
import { useDimensions } from "../layouts/useDimensions";

export const DashboardCard: React.FC<TDashboardCardProps> = ({
  actions,
  avatar,
  title,
  subtitle,
  children,
  cardRef,
  sizeChangeHandler,
}) => {
  const cardBodyRef = useRef<HTMLDivElement>(null);
  const dimensions = useDimensions(cardBodyRef);

  useEffect(() => {
    if (sizeChangeHandler) {
      if (dimensions) {
        sizeChangeHandler(dimensions.width, dimensions.height);
      }
    }
  }, [dimensions]);

  const getTitle = () => {
    return title ? (
      <Typography className="card-title" noWrap>
        {title}
      </Typography>
    ) : null;
  };

  return (
    <Card className="DashboardCard-item" ref={cardRef} variant="outlined">
      <CardHeader
        className="DashboardCard-item-header"
        avatar={avatar ?? false}
        action={<DashboardCardActions actions={actions} />}
        title={getTitle()}
        subheader={subtitle ?? false}
      ></CardHeader>
      <CardContent
        innerRef={cardBodyRef}
        className="DashboardCard-item-content"
      >
        {children}
      </CardContent>
    </Card>
  );
};
