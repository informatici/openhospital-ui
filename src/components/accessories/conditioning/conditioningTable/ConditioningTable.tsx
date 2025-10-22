import { CircularProgress } from "@mui/material";
import { useConditionsAtAmission } from "libraries/hooks";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import React, { FunctionComponent, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { getConditioningByPatientCode } from "state/conditionings";
import { getEncounterConditionings } from "state/encounter";
import { ConditioningDTO } from "../../../../generated";
import { renderDateTime } from "../../../../libraries/formatUtils/dataFormatting";
import { usePermission } from "../../../../libraries/permissionUtils/usePermission";
import InfoBox from "../../infoBox/InfoBox";
import Table from "../../table/Table";

interface IOwnProps {
  shouldUpdateTable: boolean;
  handleEdit?: (row: any) => void;
}

const ConditioningTable: FunctionComponent<IOwnProps> = ({
  shouldUpdateTable,
  handleEdit,
}) => {
  const { t } = useTranslation();
  const canUpdate = usePermission("conditioning.update");

  const header = ["performedAt"];
  const dateFields = ["performedAt"];

  const { code } = useParams();

  const label = {
    id: t("conditioning.code"),
    performedAt: t("conditioning.performedAt"),
    aspiration: t("conditioning.aspiration"),
    mce: t("conditioning.mce"),
    ventilation: t("conditioning.ventilation"),
    oxygenDebit: t("conditioning.oxygenDebit"),
    sgVolume: t("conditioning.sgVolume"),
    diazepamDose: t("conditioning.diazepamDose"),
    bolusSsVolume: t("conditioning.bolusSsVolume"),
    sngNumber: t("conditioning.sngNumber"),
    others: t("conditioning.others"),
    cpap: t("conditioning.cpap"),
    tdr: t("conditioning.tdr"),
    conditionAtAdmission: t("admission.conditionAtAdmission.label"),
  };

  const order = ["performedAt"];

  const dispatch = useAppDispatch();

  const data = useAppSelector((state) =>
    code
      ? state.encounters.encounterConditionings.data || []
      : state.conditioning.getConditioningByPatientCode.data || []
  );

  const { formatValues: formatConditions } = useConditionsAtAmission();

  const patientCode = useAppSelector(
    (state) => state.patients.selectedPatient.data?.code
  );

  const onEdit = handleEdit
    ? (row: ConditioningDTO) => {
        handleEdit(data.find((item: ConditioningDTO) => item.id === row?.id));
      }
    : undefined;

  useEffect(() => {
    if (shouldUpdateTable || patientCode || code) {
      code
        ? dispatch(getEncounterConditionings({ code: code as string }))
        : dispatch(getConditioningByPatientCode(patientCode as number));
    }
  }, [shouldUpdateTable, dispatch, patientCode, code]);

  const formatDataToDisplay = (data: ConditioningDTO[]) => {
    return data.map((item) => {
      return {
        id: item.id ?? "",
        performedAt: item.performedAt ? renderDateTime(item.performedAt) : "",
        aspiration: item.aspiration ? t("common.yes") : t("common.no"),
        mce: item.mce ?? "",
        cpap: item.cpap ? t("common.yes") : t("common.no"),
        tdr: item.tdr ?? "",
        ventilation: item.ventilation ?? "",
        oxygenDebit: item.oxygenDebit ?? "",
        sgVolume: item.sgVolume ?? "",
        diazepamDose: item.diazepamDose ?? "",
        bolusSsVolume: item.bolusSsVolume ?? "",
        sngNumber: item.sngNumber ?? "",
        others: item.others ?? "",
        conditionAtAdmission: formatConditions(item.conditionAtAdmission).join(
          ", "
        ),
      };
    });
  };

  const status = useAppSelector((state) =>
    code
      ? state.encounters.encounterConditionings.status
      : state.conditioning.getConditioningByPatientCode.status
  );

  const errorMessage = useAppSelector((state) =>
    code
      ? state.encounters.encounterConditionings.error?.message
      : state.conditioning.getConditioningByPatientCode.error?.message ||
        t("common.somethingwrong")
  ) as string;

  const createConditioningStatus = useAppSelector((state) =>
    code
      ? state.encounters.encounterConditionings.status
      : state.conditioning.newConditioning.status
  );

  return (
    <div className="conditioningTable">
      <h5>{t("conditioning.previousentries")}</h5>
      {(() => {
        switch (status) {
          case "FAIL":
            return (
              createConditioningStatus !== "FAIL" && (
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
                onEdit={canUpdate ? onEdit : undefined}
                initialOrderBy="performedAt"
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

export default ConditioningTable;
