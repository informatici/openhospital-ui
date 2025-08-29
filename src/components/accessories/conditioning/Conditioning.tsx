import { Permission } from "libraries/permissionUtils/Permission";
import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import ConditioningForm from "./conditioningForm/conditioningForm";
import { initialFields } from "./consts";
import "./styles.scss";

const Conditioning: FC = () => {
  const { t } = useTranslation();
  const [creationMode, setCreationMode] = useState(true);
  return (
    <div className="Conditioning">
      <Permission
        require={creationMode ? "therapies.create" : "therapies.update"}
      >
        <ConditioningForm
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

export default Conditioning;
