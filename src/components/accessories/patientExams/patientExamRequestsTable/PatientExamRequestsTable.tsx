import { Print, PrintDisabled } from "@mui/icons-material";
import { Button, CircularProgress } from "@mui/material";
import { downloadBlob } from "libraries/downloadUtils/downloadUtils";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { LabWithRowsDTO, LaboratoryDTO } from "../../../../generated";
import { renderDateTime } from "../../../../libraries/formatUtils/dataFormatting";
import { usePermission } from "../../../../libraries/permissionUtils/usePermission";
import {
  getLabsRequestByPatientId,
  printExamRequests,
} from "../../../../state/laboratories";
import InfoBox from "../../infoBox/InfoBox";
import { statusLabel } from "../../laboratory/table/ExamTable";
import Table from "../../table/Table";
import { useParams } from "react-router";
import { getEncounterExamRequests } from "state/encounter";

interface IOwnProps {
  shouldUpdateTable: boolean;
  handleEdit?: (row: any) => void;
  handleCancel?: (code: number | undefined) => void;
}

const PatientExamRequestsTable: FunctionComponent<IOwnProps> = ({
  shouldUpdateTable,
  handleEdit,
  handleCancel,
}) => {
  const { t } = useTranslation();
  const canCancel = usePermission("laboratories.delete");
  const infoBoxRef = useRef<HTMLDivElement>(null);
  const [isPrinting, setPrinting] = useState(false);

  const { code } = useParams();

  const header = ["date", "exam", "status"];
  const dateFields = ["date"];

  const label = {
    code: t("common.code"),
    date: t("lab.date"),
    exam: t("lab.exam"),
    status: t("lab.status"),
    note: t("lab.note"),
  };
  const order = ["date", "exam", "status"];

  const dispatch = useAppDispatch();
  const data = useAppSelector(
    (state) =>
      (code
        ? state.encounters.encounterExamRequests.data
        : state.laboratories.labsRequestByPatientId.data
      ) ?? []
  );

  const patientCode = useAppSelector(
    (state) => state.patients.selectedPatient.data?.code
  );

  const isLoading = useAppSelector((state) =>
    code
      ? state.encounters.encounterExamRequests.status === "LOADING"
      : state.laboratories.labsRequestByPatientId.status === "LOADING"
  );

  const isFail = useAppSelector((state) =>
    code
      ? state.encounters.encounterExamRequests.status === "FAIL"
      : state.laboratories.labsRequestByPatientId.status === "FAIL"
  );

  const isSuccess = useAppSelector((state) =>
    code
      ? state.encounters.encounterExamRequests.status === "SUCCESS"
      : state.laboratories.labsRequestByPatientId.status === "SUCCESS"
  );

  const isEmpty = useAppSelector((state) =>
    code
      ? state.encounters.encounterExamRequests.status === "SUCCESS_EMPTY"
      : state.laboratories.labsRequestByPatientId.status === "SUCCESS_EMPTY"
  );

  const errorMessage = useAppSelector((state) =>
    code
      ? state.encounters.encounterExamRequests.error?.message
      : state.laboratories.labsRequestByPatientId.error?.message
  ) || t("common.somethingwrong");

  useEffect(() => {
    if (shouldUpdateTable || patientCode || code) {
      if (code) {
        dispatch(getEncounterExamRequests({ code }) as any)
      } else if (patientCode) {
        dispatch(getLabsRequestByPatientId(patientCode) as any)
      }
    }
  }, [dispatch, patientCode, shouldUpdateTable, code]);

  useEffect(() => {
    if (isPrinting && patientCode) {
      dispatch(printExamRequests(patientCode))
        .unwrap()
        .then((result) => {
          if (result instanceof Blob) {
            downloadBlob(
              result,
              `patient-exam-request-${patientCode}-${new Date().getTime()}.pdf`
            );
          }
        })
        .finally(() => setPrinting(false));
    }
  }, [dispatch, isPrinting, patientCode]);

  const isLabWithRowsDTO = (item: any): item is LabWithRowsDTO => {
    return "laboratoryDTO" in item;
  };

  const formatDataToDisplay = (data: (LabWithRowsDTO | LaboratoryDTO)[]) => {
    return data.map((item) => {
      if (isLabWithRowsDTO(item)) {
        return {
          code: item.laboratoryDTO?.code,
          date: item.laboratoryDTO?.labDate
            ? renderDateTime(item.laboratoryDTO.labDate)
            : "",
          status: item.laboratoryDTO?.status
            ? statusLabel(item.laboratoryDTO.status)
            : "",
          exam: item.laboratoryDTO?.exam?.description ?? "",
          note: item.laboratoryDTO?.note ?? "",
        };
      }
      return {
        code: item.code,
        date: item.labDate ? renderDateTime(item.labDate) : "",
        status: item.status ? statusLabel(item.status) : "",
        exam: item.exam?.description ?? "",
        note: item.note ?? "",
      };
    });
  };

  const onCancel = (row: any) => {
    if (handleCancel) {
      handleCancel(row.code);
    }
  };

  const handlePrint = () => {
    setPrinting(true);
  };

  return (
    <div className="patientExamsTable">
      <h5>{t("lab.patientrequestedexam")}</h5>
      
      {isLoading && (
        <CircularProgress style={{ marginLeft: "50%", position: "relative" }} />
      )}
      
      {isSuccess && data.length > 0 && (
        <Table
          rowData={formatDataToDisplay(data)}
          dateFields={dateFields}
          tableHeader={header}
          labelData={label}
          columnsOrder={order}
          rowsPerPage={5}
          onCancel={canCancel ? onCancel : undefined}
          isCollapsabile={true}
          headerActions={
            <Button
              startIcon={isPrinting ? <PrintDisabled /> : <Print />}
              type="button"
              onClick={handlePrint}
              variant="contained"
              disabled={isPrinting}
            >
              {t("lab.print_exam_request")}
            </Button>
          }
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

export default PatientExamRequestsTable;