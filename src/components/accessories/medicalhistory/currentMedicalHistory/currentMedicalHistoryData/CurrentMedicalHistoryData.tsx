import { Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { MedicalHistoryDTO } from "generated";
import { renderDateTime } from "libraries/formatUtils/dataFormatting";
import { isEmpty } from "lodash";
import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import "../styles.scss";

interface IOwnProps {
  onEdit?: () => void;
  medicalHistory: MedicalHistoryDTO;
}

export const CurrentMedicalHistoryData: FunctionComponent<IOwnProps> = ({
  onEdit,
  medicalHistory,
}) => {
  const { t } = useTranslation();

  return (
    <div className="currentMedicalHistoryData">
      <div className="currentMedicalHistory_leading">
        {onEdit && (
          <IconButton onClick={onEdit}>
            <Edit />
          </IconButton>
        )}
      </div>
      <h4>{t("medicalHistory.physiological.title")}</h4>
      <div className="currentMedicalHistoryData__content">
        {medicalHistory?.siblingRank && (
          <div className="currentMedicalHistoryData__item">
            <span className="item_label">
              {t("medicalHistory.physiological.siblingRank")}
            </span>
            <p className="item_content">{medicalHistory?.siblingRank}</p>
          </div>
        )}
      </div>
      <h4 className="formInsertMode">
        {t("medicalHistory.physiological.pregnancyAndDelivery")}
      </h4>
      <div className="currentMedicalHistoryData__content">
        {!isEmpty(medicalHistory?.termPregnancy) && (
          <div className="grid currentMedicalHistoryData__item">
            <span className="item_label">
              {t("medicalHistory.physiological.pregnancyTerm")}
            </span>
            <p className="item_content">{medicalHistory?.termPregnancy}</p>
          </div>
        )}
        {!isEmpty(medicalHistory?.deliveryMode) && (
          <div className="grid currentMedicalHistoryData__item">
            <span className="item_label">
              {t("medicalHistory.physiological.deliveryMode")}
            </span>
            <p className="item_content">{medicalHistory?.deliveryMode}</p>
          </div>
        )}
        {medicalHistory?.birthWeight && (
          <div className="grid currentMedicalHistoryData__item">
            <span className="item_label">
              {t("medicalHistory.physiological.birthWeight")}
            </span>
            <p className="item_content">{medicalHistory?.birthWeight}</p>
          </div>
        )}
        {!isEmpty(medicalHistory?.apgarScore) && (
          <div className="grid currentMedicalHistoryData__item">
            <span className="item_label">
              {t("medicalHistory.physiological.apgarScore")}
            </span>
            <p className="item_content">{medicalHistory?.apgarScore}</p>
          </div>
        )}
        {!isEmpty(medicalHistory?.vaccinationState) && (
          <div className="grid currentMedicalHistoryData__item">
            <span className="item_label">
              {t("medicalHistory.physiological.vaccinationStatus")}
            </span>
            <p className="item_content">{medicalHistory?.vaccinationState}</p>
          </div>
        )}
        {!isEmpty(medicalHistory?.somaticGrowth) && (
          <div className="grid currentMedicalHistoryData__item">
            <span className="item_label">
              {t("medicalHistory.physiological.somaticGrowth")}
            </span>
            <p className="item_content">{medicalHistory?.somaticGrowth}</p>
          </div>
        )}
        {!isEmpty(medicalHistory?.antiMalarialProphylaxis) && (
          <div className="currentMedicalHistoryData__item">
            <span className="item_label">
              {t("medicalHistory.physiological.malariaProphylaxis")}
            </span>
            <p className="item_content">
              {medicalHistory?.antiMalarialProphylaxis}
            </p>
          </div>
        )}
        {!isEmpty(medicalHistory?.diet) && (
          <div className="currentMedicalHistoryData__item">
            <span className="item_label">
              {t("medicalHistory.physiological.diet")}
            </span>
            <p className="item_content">{medicalHistory?.diet}</p>
          </div>
        )}
        {!isEmpty(medicalHistory?.deParasitization) && (
          <div className="currentMedicalHistoryData__item">
            <span className="item_label">
              {t("medicalHistory.physiological.deworming")}
            </span>
            <p className="item_content">{medicalHistory?.deParasitization}</p>
          </div>
        )}
        {!isEmpty(medicalHistory?.psychomotorDev) && (
          <div className="currentMedicalHistoryData__item">
            <span className="item_label">
              {t("medicalHistory.physiological.psychomotorDevelopment")}
            </span>
            <p className="item_content">{medicalHistory.psychomotorDev}</p>
          </div>
        )}
      </div>
      <h4 className="formInsertMode">
        {t("medicalHistory.physiological.Supplement")}
      </h4>
      <div className="currentMedicalHistoryData__content">
        <div className="grid currentMedicalHistoryData__item">
          <span className="item_label">
            {t("medicalHistory.physiological.ironSupplement")}
          </span>
          <p className="item_content">
            {medicalHistory?.ironSupplement ? "true" : "false"}
          </p>
        </div>

        <div className="grid currentMedicalHistoryData__item">
          <span className="item_label">
            {t("medicalHistory.physiological.folicAcidSupplement")}
          </span>
          <p className="item_content">
            {medicalHistory?.folicAcidSupplement ? "true" : "false"}
          </p>
        </div>

        <div className="grid currentMedicalHistoryData__item">
          <span className="item_label">
            {t("medicalHistory.physiological.vitASupplement")}
          </span>
          <p className="item_content">
            {medicalHistory?.vitASupplement ? "true" : "false"}
          </p>
        </div>

        {!isEmpty(medicalHistory?.otherSupplements) && (
          <div className="fullWidth currentMedicalHistoryData__item">
            <span className="item_label">
              {t("medicalHistory.physiological.otherSupplements")}
            </span>
            <p className="item_content">{medicalHistory?.otherSupplements}</p>
          </div>
        )}
      </div>
      <h4 className="formInsertMode">
        {t("medicalHistory.personalPathological.title")}
      </h4>
      <div className="currentMedicalHistoryData__content">
        {!isEmpty(medicalHistory?.lastTransfusionDate) && (
          <div className="currentMedicalHistoryData__item">
            <span className="item_label">
              {t("medicalHistory.personalPathological.lastTransfusionDate")}
            </span>
            <p className="item_content">
              {renderDateTime(medicalHistory?.lastTransfusionDate!)}
            </p>
          </div>
        )}

        {!isEmpty(medicalHistory?.allergyPrecision) && (
          <div className="currentMedicalHistoryData__item">
            <span className="item_label">
              {t("medicalHistory.personalPathological.drugAllergy")}
            </span>
            <p className="item_content">{medicalHistory?.allergyPrecision}</p>
          </div>
        )}

        <div className="grid currentMedicalHistoryData__item">
          <span className="item_label">
            {t("medicalHistory.personalPathological.transfusion")}
          </span>
          <p className="item_content">
            {medicalHistory?.transfusion ? "true" : "false"}
          </p>
        </div>

        <div className="grid currentMedicalHistoryData__item">
          <span className="item_label">
            {t("medicalHistory.personalPathological.sickleCell")}
          </span>
          <p className="item_content">
            {medicalHistory?.sickleCell ? "true" : "false"}
          </p>
        </div>

        {!isEmpty(medicalHistory?.hemylosis) && (
          <div className="grid currentMedicalHistoryData__item">
            <span className="item_label">
              {t("medicalHistory.personalPathological.hemolysis")}
            </span>
            <p className="item_content">{medicalHistory?.hemylosis}</p>
          </div>
        )}

        {!isEmpty(medicalHistory?.otherPersonalPathologies) && (
          <div className="fullWidth currentMedicalHistoryData__item">
            <span className="item_label">
              {t("medicalHistory.personalPathological.otherPathologies")}
            </span>
            <p className="item_content">
              {medicalHistory?.otherPersonalPathologies}
            </p>
          </div>
        )}
      </div>
      <h4 className="formInsertMode">
        {t("medicalHistory.familyPathological.title")}
      </h4>
      <div className="currentMedicalHistoryData__content">
        {!isEmpty(medicalHistory?.otherFamilyPathologies) && (
          <div className="fullWidth currentMedicalHistoryData__item">
            <span className="item_label">
              {t("medicalHistory.familyPathological.otherFamilyPathologies")}
            </span>
            <p className="item_content">
              {medicalHistory?.otherFamilyPathologies}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
