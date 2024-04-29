import { useTranslation } from "react-i18next";
import WardForm from "../wardForm/WardForm";
import React from "react";
import { initialFields } from "../wardForm/consts";

export const EditWard = () => {
  const { t } = useTranslation();
  return (
    <WardForm
      creationMode
      onSubmit={() => {}}
      isLoading={false}
      resetButtonLabel={t("common.reset")}
      submitButtonLabel={t("common.submit")}
      resetFormCallback={() => {}}
      shouldResetForm={false}
      fields={initialFields}
    />
  );
};
