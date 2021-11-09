import React, { FC, useCallback, useEffect, useRef, useState } from "react";
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
import { CustomModal } from "../customModal/CustomModal";
import BillItemPickerForm from "./itemPicker/BillItemPicker";

export type BillItemTransitionState = "IDLE" | "TO_RESET";

const PatientNewBill: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const infoBoxRef = useRef<HTMLDivElement>(null);

  const [showItemPicker, setShowItemPicker] = useState(false);
  const [creationMode, setCreationMode] = useState(true);
  const [deletedObjCode, setDeletedObjCode] = useState("");

  const handleItemPickerShow = useCallback(() => {
    setShowItemPicker(showItemPicker ? false : true);
  }, []);

  return (
    <div className="patientNewBill">
      <div className="">
        <div className="patientNewBill_left">
          <div>
            <span className="addpayment hidden">
              {t("bill.clicktoaddpayment")}
            </span>
          </div>
          <BillItemsTable
            shouldUpdateTable={true}
            handleDelete={(row) => {}}
            handleEdit={(row) => {}}
          />
          <div>
            <SmallButton onClick={handleItemPickerShow}>
              {t("button.add")}
            </SmallButton>
          </div>
        </div>
        <div className="patientNewBill_right">
          <NewBillSide />
        </div>
      </div>
      <div className="hidden">
        <span>{t("bill.nopendingbill")}</span>
      </div>
      <CustomModal
        title={"Pick an item"}
        description="pick-item"
        onClose={handleItemPickerShow}
        open={showItemPicker}
        content={<BillItemPickerForm />}
      />
    </div>
  );
};
export default PatientNewBill;
