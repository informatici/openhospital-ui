import { Card, CardContent, CardHeader, Typography } from "@material-ui/core";
import { TDashboardCardProps } from "./types";
import React, { useRef, useEffect } from "react";
import "./styles.scss";
import { DashboardCardActions } from "./DashboardCardOptions";

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

  const resizeObserver = new ResizeObserver((entries) => {
    if (sizeChangeHandler) {
      let entry = entries[0];
      if (entry.contentBoxSize) {
        const contentBoxSize = entry.contentBoxSize[0];

        sizeChangeHandler(
          Math.ceil(contentBoxSize.inlineSize),
          Math.ceil(contentBoxSize.blockSize)
        );
      } else {
        sizeChangeHandler(
          Math.ceil(entry.contentRect.width),
          Math.ceil(entry.contentRect.height)
        );
      }
    }
  });

  useEffect(() => {
    if (sizeChangeHandler && cardBodyRef.current) {
      resizeObserver.observe(cardBodyRef.current);
    }
  }, [cardBodyRef]);

  // Remove the observer on component unmount
  useEffect(() => {
    return () => {
      if (sizeChangeHandler && cardBodyRef.current) {
        resizeObserver.unobserve(cardBodyRef.current);
        resizeObserver.disconnect();
      }
    };
  }, []);

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
