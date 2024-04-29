import { useTranslation } from "react-i18next";
import WardForm from "../wardForm/WardForm";
import React from "react";
import { initialFields } from "../wardForm/consts";

export const NewWard = () => {
  const { t } = useTranslation();
  const handleSubmit = (values: any) => {
    console.log(values);
  };
  return (
    <WardForm
      creationMode
      onSubmit={handleSubmit}
      isLoading={false}
      resetButtonLabel={t("common.reset")}
      submitButtonLabel={t("common.submit")}
      resetFormCallback={() => {}}
      shouldResetForm={false}
      fields={initialFields}
    />
  );
};
