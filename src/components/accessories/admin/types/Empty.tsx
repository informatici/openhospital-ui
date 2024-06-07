import React from "react";
import InfoBox from "../../infoBox/InfoBox";
import { useTranslation } from "react-i18next";

const Empty = () => {
  const { t } = useTranslation();
  return <InfoBox type="info" message={t("types.chooseATypeToStart")} />;
};

export default Empty;
