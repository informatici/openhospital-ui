import React from "react";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Button, IconButton, Tooltip } from "@material-ui/core";
import SmallButton from "../../smallButton/SmallButton";
import TextButton from "../../textButton/TextButton";
import "../styles.scss";
import { currencyFormat } from "../../../../libraries/formatUtils/currencyFormatting";
import { CheckCircleRounded } from "@material-ui/icons";

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
    <>
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
      <div>
        {(billTotal > 0 && billTotal - paymentTotal == 0 && (
          <Button
            className={"paid"}
            variant="outlined"
            startIcon={<CheckCircleRounded />}
          >
            {t("bill.paid")}
          </Button>
        )) || (
          <SmallButton
            onClick={() => {
              handlePaymentDialog();
            }}
          >
            {t("bill.pay")}
          </SmallButton>
        )}
      </div>
      <div className="lg-divider"></div>
      <div>
        <SmallButton onClick={saveBill}>{t("bill.savebill")}</SmallButton>
      </div>
    </>
  );
};

export { ItemPayment };
