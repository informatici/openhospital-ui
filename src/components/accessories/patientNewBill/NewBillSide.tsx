import React from "react";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Tooltip } from "@material-ui/core";
import SmallButton from "../smallButton/SmallButton";
import TextButton from "../textButton/TextButton";
import "./styles.scss";
import { currencyFormat } from "../../../libraries/formatUtils/currencyFormatting";

interface IOwnProps {
  handlePaymentDialog: (value: boolean) => void;
  billTotal: number;
  paymentTotal: number;
}

const NewBillSide: FC<IOwnProps> = ({
  handlePaymentDialog,
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
        <SmallButton
          onClick={() => {
            handlePaymentDialog(true);
          }}
        >
          {t("bill.pay")}
        </SmallButton>
      </div>
      <div className="lg-divider"></div>
      <div>
        <SmallButton>{t("bill.savebill")}</SmallButton>
      </div>
    </>
  );
};

export { NewBillSide };
