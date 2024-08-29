import React from "react";
import { useTranslation } from "react-i18next";
import InfoBox from "../../infoBox/InfoBox";

const Empty = () => {
  const { t } = useTranslation();
  return <InfoBox type="info" message={t("types.chooseATypeToStart")} />;
};

export default Empty;
