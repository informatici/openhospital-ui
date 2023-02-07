import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { AlertBox } from "../alertBox/AlertBox";

export const CustomPermissionDenied: FC<{ message?: string }> = ({
  message,
}) => {
  const { t } = useTranslation();
  return (
    <AlertBox
      type="error"
      message={message ?? t("permission.accessdenied")}
      title={t("permission.denied")}
    />
  );
};
