import { CheckCircleRounded } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { currencyFormat } from "../../../../libraries/formatUtils/currencyFormatting";
import SmallButton from "../../smallButton/SmallButton";
import "../styles.scss";

interface IOwnProps {
  handlePaymentDialog: () => void;
  saveBill: () => void;
  billTotal: number;
  paymentTotal: number;
}

const ItemPayment: FC<IOwnProps> = ({
  handlePaymentDialog,
  saveBill,
  billTotal,
  paymentTotal,
}) => {
  const { t } = useTranslation();
  return (
    <div className="payment">
      <div className="two-row">
        <span>Total:</span>
        <span>{currencyFormat(billTotal)}</span>
      </div>
      <div className="two-row">
        <span>Paid:</span>
        <span>{currencyFormat(paymentTotal)}</span>
      </div>
      <div className="xs-divider"></div>
      <div className="two-row">
        <span>To be paid:</span>
        <span>{currencyFormat(billTotal - paymentTotal)}</span>
      </div>
      <div className="payment__buttons">
        {(billTotal > 0 && billTotal - paymentTotal === 0 && (
          <div>
            <Button
              className={"paid"}
              variant="outlined"
              startIcon={<CheckCircleRounded />}
            >
              {t("bill.paid")}
            </Button>
          </div>
        )) || (
          <SmallButton
            onClick={() => {
              handlePaymentDialog();
            }}
          >
            {t("bill.pay")}
          </SmallButton>
        )}
        <div className="lg-divider"></div>
        <SmallButton onClick={saveBill}>{t("bill.savebill")}</SmallButton>
      </div>
    </div>
  );
};

export { ItemPayment };
