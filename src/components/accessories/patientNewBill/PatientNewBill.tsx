import React, { FC, useEffect, useRef, useState } from "react";
import "./styles.scss";
import { getMedicals } from "../../../state/medicals/actions";
import { useTranslation } from "react-i18next";
import { scrollToElement } from "../../../libraries/uiUtils/scrollToElement";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../../types";
import ConfirmationDialog from "../confirmationDialog/ConfirmationDialog";
import InfoBox from "../infoBox/InfoBox";
import checkIcon from "../../../assets/check-icon.png";
import { updateFields } from "../../../libraries/formDataHandling/functions";
import SmallButton from "../smallButton/SmallButton";
import BillItemsTable from "./itemsTable/BillItemsTable";
import { NewBillSide } from "./NewBillSide";

export type BillItemTransitionState = "IDLE" | "TO_RESET";

const PatientNewBill: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const infoBoxRef = useRef<HTMLDivElement>(null);

  const [creationMode, setCreationMode] = useState(true);
  const [deletedObjCode, setDeletedObjCode] = useState("");

  return (
    <div className="patientNewBill">
      <div className="">
        <div className="patientNewBill_right">
          <div>
            <span className="addpayment">{t("bill.clicktoaddpayment")}</span>
          </div>
          <BillItemsTable />
          <div>
            <SmallButton>{t(" button.add")}</SmallButton>
          </div>
        </div>
        <div className="patientNewBill_left">
          <NewBillSide />
        </div>
      </div>
      <div className="">
        <span>{t("bill.nopendingbill")}</span>
      </div>
    </div>
  );
};
export default PatientNewBill;
