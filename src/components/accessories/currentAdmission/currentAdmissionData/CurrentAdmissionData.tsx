import { Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { renderDateTime } from "libraries/formatUtils/dataFormatting";
import { isEmpty } from "lodash";
import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { AdmissionDTO } from "../../../../generated";
import "../styles.scss";

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
            <p className="item_content">{renderDateTime(admission?.admDate)}</p>
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
        {admission?.alertReceived != null && (
          <div className="currentAdmissionData__item">
            <span className="item_label">{t("patient.alertReceived")}</span>
            <p className="item_content">
              {admission.alertReceived ? t("common.yes") : t("common.no")}
            </p>
          </div>
        )}
        {admission?.referenceSheet != null && (
          <div className="currentAdmissionData__item">
            <span className="item_label">{t("patient.referenceSheet")}</span>
            <p className="item_content">
              {admission.referenceSheet ? t("common.yes") : t("common.no")}
            </p>
          </div>
        )}
        {admission?.qualifiedAgent != null && (
          <div className="currentAdmissionData__item">
            <span className="item_label">{t("patient.qualifiedAgent")}</span>
            <p className="item_content">
              {admission.qualifiedAgent ? t("common.yes") : t("common.no")}
            </p>
          </div>
        )}
        {!isEmpty(admission?.anamnesis) && (
          <div className="fullWidth currentAdmissionData__item">
            <span className="item_label">{t("admission.anamnesis")}</span>
            <p className="item_content">{admission?.anamnesis}</p>
          </div>
        )}
        {!isEmpty(admission?.preTreatment) && (
          <div className="fullWidth currentAdmissionData__item">
            <span className="item_label">{t("admission.preTreatment")}</span>
            <p className="item_content">{admission?.preTreatment}</p>
          </div>
        )}
        {!isEmpty(admission?.preAssessment) && (
          <div className="fullWidth currentAdmissionData__item">
            <span className="item_label">{t("admission.preAssessment")}</span>
            <p className="item_content">{admission?.preAssessment}</p>
          </div>
        )}
        {!isEmpty(admission?.entryReason) && (
          <div className="fullWidth currentAdmissionData__item">
            <span className="item_label">{t("admission.entryReason")}</span>
            <p className="item_content">{admission.entryReason}</p>
          </div>
        )}
      </div>
    </div>
  );
};
