import { IconButton } from "@mui/material";
import { Edit } from "@mui/icons-material";
import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { AdmissionDTO } from "../../../../generated";
import "../styles.scss";
import { isEmpty } from "lodash";
import { renderDate } from "../../../../libraries/formatUtils/dataFormatting";

interface IOwnProps {
  onEdit?: () => void;
  admission: AdmissionDTO;
}

export const CurrentAdmissionData: FunctionComponent<IOwnProps> = ({
  onEdit,
  admission,
}) => {
  const { t } = useTranslation();

  return (
    <div className="currentAdmissionData">
      <div className="currentAdmission_leading">
        {onEdit && (
          <IconButton onClick={onEdit}>
            <Edit />
          </IconButton>
        )}
      </div>
      <div className="currentAdmissionData__content">
        {!isEmpty(admission?.admDate) && (
          <div className="currentAdmissionData__item">
            <span className="item_label">{t("admission.admDate")}</span>
            <p className="item_content">{renderDate(admission?.admDate)}</p>
          </div>
        )}
        {!isEmpty(admission?.ward?.description) && (
          <div className="currentAdmissionData__item">
            <span className="item_label">{t("admission.ward")}</span>
            <p className="item_content">{admission?.ward?.description}</p>
          </div>
        )}
        {!isEmpty(admission?.fhu) && (
          <div className="currentAdmissionData__item">
            <span className="item_label">{t("admission.fhu")}</span>
            <p className="item_content">{admission?.fhu}</p>
          </div>
        )}
        {!isEmpty(admission?.admType?.description) && (
          <div className="currentAdmissionData__item">
            <span className="item_label">{t("admission.admType")}</span>
            <p className="item_content">{admission?.admType?.description}</p>
          </div>
        )}
        {!isEmpty(admission?.diseaseIn?.description) && (
          <div className="currentAdmissionData__item">
            <span className="item_label">{t("admission.diseaseIn")}</span>
            <p className="item_content">{admission?.diseaseIn?.description}</p>
          </div>
        )}
        {!isEmpty(admission?.note) && (
          <div className="fullWidth currentAdmissionData__item">
            <span className="item_label">{t("admission.note")}</span>
            <p className="item_content">{admission?.note}</p>
          </div>
        )}
      </div>
    </div>
  );
};
