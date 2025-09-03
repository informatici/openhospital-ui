import { CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import React, { FunctionComponent, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getConditioningByPatientCode } from "state/conditionings";
import { ConditioningDTO } from "../../../../generated";
import { renderDateTime } from "../../../../libraries/formatUtils/dataFormatting";
import { usePermission } from "../../../../libraries/permissionUtils/usePermission";
import InfoBox from "../../infoBox/InfoBox";
import Table from "../../table/Table";

interface IOwnProps {
  shouldUpdateTable: boolean;
  handleEdit: (row: any) => void;
}

const ConditioningTable: FunctionComponent<IOwnProps> = ({
  shouldUpdateTable,
  handleEdit,
}) => {
  const { t } = useTranslation();
  const canUpdate = usePermission("conditioning.update");

  const header = ["date"];
  const dateFields = ["date"];

  const label = {
    id: t("conditioning.code"),
    date: t("conditioning.date"),
    aspiration: t("conditioning.aspiration"),
    mceDuree: t("conditioning.mceDuree"),
    ventilationDuree: t("conditioning.ventilationDuree"),
    oxygeneDebit: t("conditioning.oxygeneDebit"),
    sgVolume: t("conditioning.sgVolume"),
    diazepamDose: t("conditioning.diazepamDose"),
    bolusSsVolume: t("conditioning.bolusSsVolume"),
    sngNumero: t("conditioning.sngNumero"),
    others: t("conditioning.others"),
  };

  const order = ["date"];

  const dispatch = useAppDispatch();

  const data = useAppSelector(
    (state) => state.conditioning.getConditioningByPatientCode.data || []
  );

  const patientCode = useAppSelector(
    (state) => state.patients.selectedPatient.data?.code
  );

  const onEdit = (row: ConditioningDTO) => {
    handleEdit(data.find((item: ConditioningDTO) => item.id === row?.id));
  };

  useEffect(() => {
    if (shouldUpdateTable || patientCode) {
      dispatch(getConditioningByPatientCode(patientCode as number));
    }
  }, [shouldUpdateTable, dispatch, patientCode]);

  const formatDataToDisplay = (data: ConditioningDTO[]) => {
    return data.map((item) => {
      return {
        id: item.id ?? "",
        date: item.date ? renderDateTime(item.date) : "",
        aspiration: item.aspiration ? t("common.yes") : t("common.no"),
        mceDuree: item.mceDuree ?? "",
        ventilationDuree: item.ventilationDuree ?? "",
        oxygeneDebit: item.oxygeneDebit ?? "",
        sgVolume: item.sgVolume ?? "",
        diazepamDose: item.diazepamDose ?? "",
        bolusSsVolume: item.bolusSsVolume ?? "",
        sngNumero: item.sngNumero ?? "",
        others: item.others ?? "",
      };
    });
  };

  const status = useAppSelector(
    (state) => state.conditioning.getConditioningByPatientCode.status
  );

  const errorMessage = useAppSelector(
    (state) =>
      state.conditioning.getConditioningByPatientCode.error?.message ||
      t("common.somethingwrong")
  ) as string;

  const createConditioningStatus = useAppSelector(
    (state) => state.conditioning.newConditioning.status
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
                initialOrderBy="date"
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
