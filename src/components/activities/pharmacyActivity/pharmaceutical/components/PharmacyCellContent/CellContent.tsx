import React, { FC } from "react";
import { Typography } from "@mui/material";
import { Warning, EventBusy } from "@mui/icons-material";

interface ICellContentProps {
  value: any;
  keyName: string;
  row: any;
  hasExpiringLotThisMonth: () => boolean;
}

const CellContent: FC<ICellContentProps> = ({
  value,
  keyName,
  row,
  hasExpiringLotThisMonth,
}) => {
  return (
    <div className="cell-content">
      {row.stock === 0 && keyName === "pharmaceutical" && (
        <Typography component="span" className="stock-zero-badge">
          0
        </Typography>
      )}

      {row.stock < row.criticalValue &&
        hasExpiringLotThisMonth() &&
        keyName === "pharmaceutical" && (
          <>
            <Warning className="icon-warning" />
            <EventBusy className="icon-expiry" />
          </>
        )}

      {hasExpiringLotThisMonth() &&
        row.stock >= row.criticalValue &&
        keyName === "pharmaceutical" && (
          <EventBusy className="icon-expiry-grey" />
        )}

      {value}
    </div>
  );
};

export default CellContent;
