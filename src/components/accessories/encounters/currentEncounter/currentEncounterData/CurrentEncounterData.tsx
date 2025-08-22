import { Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { isEmpty } from "lodash";
import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { EncounterDTO } from "../../../../../generated";
import "../styles.scss";

interface IOwnProps {
  onEdit?: () => void;
  encounter: EncounterDTO;
}

export const CurrentEncounterData: FunctionComponent<IOwnProps> = ({
  onEdit,
  encounter,
}) => {
  const { t } = useTranslation();

  return (
    <div className="currentEncounterData">
      <div className="currentEncounter_leading">
        <IconButton onClick={onEdit}>
          <Edit />
        </IconButton>
      </div>
      <div className="currentEncounterData__content">
        {!isEmpty(encounter?.code) && (
          <div className="currentEncounterData__item">
            <span className="item_label">{t("encounter.code")}</span>
            <p className="item_content">{encounter?.code}</p>
          </div>
        )}
        {!isEmpty(encounter?.status) && (
          <div className="currentEncounterData__item">
            <span className="item_label">{t("encounter.status")}</span>
            <p className="item_content">{encounter?.status}</p>
          </div>
        )}
      </div>
    </div>
  );
};
