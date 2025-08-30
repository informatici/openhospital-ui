import { CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import React, { FunctionComponent, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getEncountersByPatient } from "state/encounter";
import { EncounterDTO, EncounterDTOStatusEnum } from "../../../../generated";
import InfoBox from "../../infoBox/InfoBox";
import Table from "../../table/Table";

interface IOwnProps {
  shouldUpdateTable: boolean;
  handleEdit: (row: any) => void;
  activityTransitionState: string;
}

const EncounterTable: FunctionComponent<IOwnProps> = ({
  shouldUpdateTable,
  handleEdit,
  activityTransitionState,
}) => {
  const { t } = useTranslation();

  const header = ["code", "status"];
  const dateFields = ["code", "status"];

  const label = {
    code: t("encounter.code"),
    status: t("encounter.status"),
  };
  const order = ["code"];

  const dispatch = useAppDispatch();

  const data = useAppSelector(
    (state) =>
      state.encounters.getEncountersByPatient.data?.filter(
        (item) => item.status !== EncounterDTOStatusEnum.Open
      ) ?? []
  );

  const patientCode = useAppSelector(
    (state) => state.patients.selectedPatient.data?.code
  );

  useEffect(() => {
    if (shouldUpdateTable || patientCode) {
      dispatch(getEncountersByPatient(patientCode!!));
    }
  }, [shouldUpdateTable, dispatch, patientCode, activityTransitionState]);

  const formatDataToDisplay = (data: EncounterDTO[]) => {
    return data.map((item) => {
      return {
        code: item.code ?? "",
        status: item.status,
      };
    });
  };
  const status = useAppSelector(
    (state) => state.encounters.getEncountersByPatient.status
  );

  const errorMessage = useAppSelector(
    (state) =>
      state.encounters.getEncountersByPatient.error?.message ||
      t("common.somethingwrong")
  ) as string;
  const createEncounterStatus = useAppSelector(
    (state) => state.encounters.createEncounter.status
  );

  return (
    <div className="patientAdmissionTable">
      <h5>{t("encounter.previousentries")}</h5>
      {(() => {
        switch (status) {
          case "FAIL":
            return (
              createEncounterStatus !== "FAIL" && (
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
                onEdit={undefined}
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

export default EncounterTable;
