import { CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import React, { FunctionComponent, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { LabWithRowsDTO, LaboratoryDTO } from "../../../../generated";
import { renderDateTime } from "../../../../libraries/formatUtils/dataFormatting";
import { getLabsByPatientId } from "../../../../state/laboratories";
import InfoBox from "../../infoBox/InfoBox";
import { statusLabel } from "../../laboratory/table/ExamTable";
import Table from "../../table/Table";
import { useParams } from "react-router";
import { getEncounterLaboratoryExams } from "state/encounter";

interface IOwnProps {
  shouldUpdateTable: boolean;
  handleEdit: (row: any) => void;
  handleDelete: (code: number | undefined) => void;
}

const PatientExamsTable: FunctionComponent<IOwnProps> = ({
  shouldUpdateTable,
  handleEdit,
  handleDelete,
}) => {
  const { t } = useTranslation();
  const infoBoxRef = useRef<HTMLDivElement>(null);

  const { code } = useParams();

  const header = ["date", "exam", "status"];
  const dateFields = ["date"];

  const label = {
    code: t("common.code"),
    date: t("lab.date"),
    exam: t("lab.exam"),
    result: t("lab.result"),
    note: t("lab.note"),
    status: t("lab.status"),
  };
  const order = ["date", "exam", "status"];

  const dispatch = useAppDispatch();

  const encounterData = useAppSelector(
    (state) => state.encounters.encounterLaboratoryExams.data
  );
  const labsData = useAppSelector(
    (state) => state.laboratories.labsByPatientId.data
  );

  const data = code ? encounterData : labsData;

  const patientCode = useAppSelector(
    (state) => state.patients.selectedPatient.data?.code
  );

  const encounterStatus = useAppSelector(
    (state) => state.encounters.encounterLaboratoryExams.status
  );
  const labsStatus = useAppSelector(
    (state) => state.laboratories.labsByPatientId.status
  );

  const isLoading = code 
    ? encounterStatus === "LOADING"
    : labsStatus === "LOADING";

    const isFail = code 
    ? encounterStatus === "FAIL"
    : labsStatus === "FAIL";

  const isSuccess = code 
    ? encounterStatus === "SUCCESS"
    : labsStatus === "SUCCESS";

  const isEmpty = code 
    ? encounterStatus === "SUCCESS_EMPTY"
    : labsStatus === "SUCCESS_EMPTY";

  const errorMessage = useAppSelector((state) =>
    code
      ? state.encounters.encounterLaboratoryExams.error?.message
      : state.laboratories.labsByPatientId.error?.message
  ) || t("common.somethingwrong");

  useEffect(() => {
    if (shouldUpdateTable || patientCode || code) {
      
      if (code) {
        dispatch(getEncounterLaboratoryExams({ code }) as any);
      } else if (patientCode) {
        dispatch(getLabsByPatientId(patientCode) as any);
      }
    }
  }, [dispatch, patientCode, shouldUpdateTable, code]);

  const isLabWithRowsDTO = (item: any): item is LabWithRowsDTO => {
    return "laboratoryDTO" in item; 
  };

  const formatDataToDisplay = (data: (LabWithRowsDTO | LaboratoryDTO)[]) => {
    if (!data) return [];
    
    return data.map((item) => {
      if (isLabWithRowsDTO(item)) {
        return {
          code: item.laboratoryDTO?.code,
          date: item.laboratoryDTO?.labDate
            ? renderDateTime(item.laboratoryDTO.labDate)
            : "",
          exam: item.laboratoryDTO?.exam?.description ?? "",
          result: item.laboratoryDTO?.exam?.procedure === 1 ? item.laboratoryDTO?.result : item.laboratoryRowList?.join(", "),
          note: item.laboratoryDTO?.note ?? "",
          status: item.laboratoryDTO?.status ? statusLabel(item.laboratoryDTO.status) : "",
        };  
      }
      return {
        code: item.code,
        date: item.labDate ? renderDateTime(item.labDate) : "",
        exam: item.exam?.description ?? "",
        result: item.exam?.procedure === 1 ? item.result : "",
        note: item.note?.length === 0 ? "/" : item.note,
        status: item.status ? statusLabel(item.status) : "",
      };
    });
  };

  return (
    <div className="patientExamsTable">
      <h5>{t("lab.previousentries")}</h5>
      
      {isLoading && (
        <CircularProgress style={{ marginLeft: "50%", position: "relative" }} />
      )}
      
      {isSuccess && data && data.length > 0 && (
        <Table
          rowData={formatDataToDisplay(data)}
          dateFields={dateFields}
          tableHeader={header}
          labelData={label}
          columnsOrder={order}
          rowsPerPage={5}
          isCollapsabile={true}
        />
      )}
      
      {isEmpty && (
        <div ref={infoBoxRef}>
          <InfoBox type="info" message={t("common.emptydata")} />
        </div>
      )}
      
      {isFail && errorMessage && (
        <div ref={infoBoxRef}>
          <InfoBox type="error" message={errorMessage} />
        </div>
      )}
    </div>
  );
};

export default PatientExamsTable;