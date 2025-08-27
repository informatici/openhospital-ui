import { Permission } from "libraries/permissionUtils/Permission";
import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { initialFields } from "./consts";
import MedicalHistoryForm from "./medicalHistoryForm/MedicalHistoryForm";
import "./styles.scss";

const MedicalHistory: FC = () => {
  const { t } = useTranslation();
  const [creationMode, setCreationMode] = useState(true);
  return (
    <div className="medicalHistory">
      <Permission
        require={creationMode ? "therapies.create" : "therapies.update"}
      >
        <MedicalHistoryForm
          fields={initialFields}
          submitButtonLabel={
            creationMode ? t("therapy.savetherapy") : t("therapy.updatetherapy")
          }
          resetButtonLabel={t("common.reset")}
        />
      </Permission>
    </div>
  );
};
export default MedicalHistory;
