import { CircularProgress } from "@mui/material";
import { MedicalHistoryDTO } from "generated";
import {
  renderDate,
  renderDateTime,
} from "libraries/formatUtils/dataFormatting";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import React, { FunctionComponent, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { getEncounterMedicalHistories } from "state/encounter";
import { getMedicalHistoryByPatientCode } from "state/medicalhistory";
import InfoBox from "../../infoBox/InfoBox";
import Table from "../../table/Table";

interface IOwnProps {
  shouldUpdateTable: boolean;
  handleEdit?: (row: any) => void;
}

const MedicalHistoryTable: FunctionComponent<IOwnProps> = ({
  shouldUpdateTable,
  handleEdit,
}) => {
  const { t } = useTranslation();

  const header = ["termPregnancy", "siblingRank"];
  const dateFields = ["termPregnancy", "siblingRank"];

  const label = {
    id: t("medicalHistory.id"),
    siblingRank: t("medicalHistory.physiological.siblingRank"),
    termPregnancy: t("medicalHistory.physiological.pregnancyTerm"),
    pregnancy: t("medicalHistory.physiological.pregnancy"),
    deliveryMode: t("medicalHistory.physiological.deliveryMode"),
    reasonMode: t("medicalHistory.physiological.reasonMode"),
    apgarScore: t("medicalHistory.physiological.apgarScore"),
    birthWeight: t("medicalHistory.physiological.birthWeight"),
    vaccinationStatePev: t("medicalHistory.physiological.vaccinationStatePev"),
    vaccinationStateNoPev: t(
      "medicalHistory.physiological.vaccinationStateNoPev"
    ),
    antiMalarialProphylaxisVap: t(
      "medicalHistory.physiological.antiMalarialProphylaxisVap"
    ),
    antiMalarialProphylaxisMilda: t(
      "medicalHistory.physiological.antiMalarialProphylaxisMilda"
    ),
    antiMalarialProphylaxisOthers: t(
      "medicalHistory.physiological.antiMalarialProphylaxisOthers"
    ),
    antiMalarialProphylaxis: t(
      "medicalHistory.physiological.malariaProphylaxis"
    ),
    diet: t("medicalHistory.physiological.diet"),
    surgicalProcedure: t(
      "medicalHistory.personalPathological.surgicalProcedure"
    ),
    surgicalProcedureCondition: t(
      "medicalHistory.personalPathological.surgicalProcedureCondition"
    ),
    surgicalProcedureType: t(
      "medicalHistory.personalPathological.surgicalProcedureType"
    ),
    surgicalProcedureDate: t(
      "medicalHistory.personalPathological.surgicalProcedureDate"
    ),
    neonatalPeriod: t("medicalHistory.personalPathological.neonatalPeriod"),
    previousHospitalization: t(
      "medicalHistory.personalPathological.previousHospitalization"
    ),
    father: t("medicalHistory.familyPathological.father"),
    mother: t("medicalHistory.familyPathological.mother"),
    siblings: t("medicalHistory.familyPathological.siblings"),
    otherUsefulInformation: t(
      "medicalHistory.familyPathological.otherUsefulInformation"
    ),
    diversification: t("medicalHistory.physiological.diversification"),
    deParasitization: t("medicalHistory.physiological.deParasitization"),
    psychomotorDev: t("medicalHistory.physiological.psychomotorDevelopment"),
    somaticGrowth: t("medicalHistory.physiological.somaticGrowth"),
    ironSupplement: t("medicalHistory.physiological.ironSupplement"),
    folicAcidSupplement: t("medicalHistory.physiological.folicAcidSupplement"),
    vitASupplement: t("medicalHistory.physiological.vitASupplement"),
    otherSupplements: t("medicalHistory.physiological.otherSupplements"),
    transfusion: t("medicalHistory.personalPathological.transfusion"),
    lastTransfusionDate: t(
      "medicalHistory.personalPathological.lastTransfusionDate"
    ),
    sickleCell: t("medicalHistory.personalPathological.sickleCell"),
    drugAllergy: t("medicalHistory.personalPathological.drugAllergy"),
    allergyPrecision: t("medicalHistory.personalPathological.allergyPrecision"),
    hemylosis: t("medicalHistory.personalPathological.hemolysis"),
    otherPersonalPathologies: t(
      "medicalHistory.personalPathological.otherPathologies"
    ),
    otherFamilyPathologies: t(
      "medicalHistory.familyPathological.otherFamilyPathologies"
    ),
    performedAt: t("medicalHistory.performedAt"),
  };
  const order = ["id"];

  const { code } = useParams();

  const dispatch = useAppDispatch();

  const data = useAppSelector((state) =>
    code
      ? state.encounters.encounterMedicalHistories.data || []
      : state.medicalhistory.getMedicalHistoryByPatientCode.data || []
  );

  const patientCode = useAppSelector(
    (state) => state.patients.selectedPatient.data?.code
  );

  useEffect(() => {
    if (shouldUpdateTable || patientCode || code) {
      code
        ? dispatch(getEncounterMedicalHistories({ code: code as string }))
        : dispatch(getMedicalHistoryByPatientCode(patientCode!!));
    }
  }, [shouldUpdateTable, dispatch, patientCode, code]);

  const formatDataToDisplay = (data: MedicalHistoryDTO[]) => {
    return data.map((item) => {
      return {
        id: item.id ?? "",
        siblingRank: item.siblingRank ?? "",
        termPregnancy: item.termPregnancy ?? "",
        pregnancy: item.pregnancy ?? "",
        deliveryMode: item.deliveryMode
          ? t("medicalHistory.physiological." + item.deliveryMode)
          : "",
        reasonMode: item.reasonMode ?? "",
        apgarScore: item.apgarScore ?? "",
        birthWeight: item.birthWeight ?? "",
        vaccinationStatePev: item.vaccinationStatePev ?? "",
        vaccinationStateNoPev: item.vaccinationStateNoPev ?? "",
        antiMalarialProphylaxisVap: item.antiMalarialProphylaxisVap ?? "",
        antiMalarialProphylaxisMilda: item.antiMalarialProphylaxisMilda ?? "",
        antiMalarialProphylaxisOthers: item.antiMalarialProphylaxisOthers ?? "",
        surgicalProcedure: item.surgicalProcedure
          ? t("common.yes")
          : t("common.no"),
        surgicalProcedureCondition: item.surgicalProcedureCondition ?? "",
        surgicalProcedureType: item.vaccinationStatePev ?? "",
        surgicalProcedureDate: item.surgicalProcedureDate
          ? renderDateTime(item.surgicalProcedureDate)
          : "",
        diversification: item.diversification ?? "",
        neonatalPeriod: item.neonatalPeriod ?? "",
        previousHospitalization: item.previousHospitalization ?? "",
        father: item.father ?? "",
        mother: item.mother ?? "",
        siblings: item.siblings ?? "",
        otherUsefulInformation: item.otherUsefulInformation ?? "",
        diet: item.diet ?? "",
        deParasitization: item.deParasitization
          ? t("common.yes")
          : t("common.no"),
        psychomotorDev: item.psychomotorDev ?? "",
        somaticGrowth: item.somaticGrowth ?? "",
        ironSupplement: item.ironSupplement ? t("common.yes") : t("common.no"),
        folicAcidSupplement: item.folicAcidSupplement
          ? t("common.yes")
          : t("common.no"),
        vitASupplement: item.vitASupplement ? t("common.yes") : t("common.no"),
        otherSupplements: item.otherSupplements ?? "",
        transfusion: item.transfusion ? t("common.yes") : t("common.no"),
        lastTransfusionDate: item.lastTransfusionDate
          ? renderDateTime(item.lastTransfusionDate)
          : "",
        sickleCell: item.sickleCell ? t("common.yes") : t("common.no"),
        drugAllergy: item.drugAllergy ? t("common.yes") : t("common.no"),
        allergyPrecision: item.allergyPrecision ?? "",
        hemylosis: item.hemylosis ?? "",
        otherPersonalPathologies: item.otherPersonalPathologies ?? "",
        otherFamilyPathologies: item.otherFamilyPathologies ?? "",
        performedAt: renderDate(item.performedAt!),
      };
    });
  };
  const status = useAppSelector(
    (state) => state.medicalhistory.getMedicalHistoryByPatientCode.status
  );

  const errorMessage = useAppSelector(
    (state) =>
      state.medicalhistory.getMedicalHistoryByPatientCode.error?.message ||
      t("common.somethingwrong")
  ) as string;
  const createMedicalHistoryStatus = useAppSelector(
    (state) => state.medicalhistory.createMedicalHistory.status
  );

  const onEdit = handleEdit
    ? (row: MedicalHistoryDTO) => {
        handleEdit(data.find((item) => item.id === row?.id));
      }
    : undefined;

  return (
    <div className="patientMedicalHistoryTable">
      <h5>{t("medicalHistory.previousentries")}</h5>
      {(() => {
        switch (status) {
          case "FAIL":
            return (
              createMedicalHistoryStatus !== "FAIL" && (
                <InfoBox type="error" message={errorMessage} />
              )
            );
          case "LOADING":
            return (
              <CircularProgress
                style={{ marginLeft: "50%", position: "relative" }}
              />
            );

          case "SUCCESS":
            return (
              <Table
                rowData={formatDataToDisplay(data)}
                dateFields={dateFields}
                tableHeader={header}
                labelData={label}
                columnsOrder={order}
                rowsPerPage={5}
                isCollapsabile={true}
                onEdit={onEdit}
                initialOrderBy="disDate"
                showEmptyCell={false}
              />
            );
          case "SUCCESS_EMPTY":
            return <InfoBox type="info" message={t("common.emptydata")} />;
          default:
            return;
        }
      })()}
    </div>
  );
};

export default MedicalHistoryTable;
