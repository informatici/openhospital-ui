import React from "react";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import SmallButton from "../smallButton/SmallButton";
import TextButton from "../textButton/TextButton";
import "./styles.scss";

const NewBillSide: FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="two-row">
        <span>Total:</span>
        <span>120$</span>
      </div>
      <div className="two-row">
        <span>Paid:</span>
        <span>0$</span>
      </div>
      <div className="xs-divider"></div>
      <div className="two-row">
        <span>To be paid:</span>
        <span>120$</span>
      </div>
      <div>
        <SmallButton>{t("bill.pay")}</SmallButton>
      </div>
      <div className="lg-divider"></div>
      <div>
        <TextButton onClick={() => {}}>{t("button.suspend")}</TextButton>
      </div>
      <div>
        <TextButton onClick={() => {}}>{t("button.delete")}</TextButton>
      </div>
    </>
  );
};

export { NewBillSide };
