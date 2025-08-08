import { Print, PrintDisabled } from "@mui/icons-material";
import { Button, CircularProgress } from "@mui/material";
import { downloadBlob } from "libraries/doawloadUtils/downloadUtils";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { LaboratoryDTO } from "../../../../generated";
import { renderDateTime } from "../../../../libraries/formatUtils/dataFormatting";
import { usePermission } from "../../../../libraries/permissionUtils/usePermission";
import {
  getLabsRequestByPatientId,
  printExamRequests,
} from "../../../../state/laboratories";
import InfoBox from "../../infoBox/InfoBox";
import { statusLabel } from "../../laboratory/table/ExamTable";
import Table from "../../table/Table";

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

  const header = ["date", "exam", "status"];
  const dateFields = ["date"];

  const label = {
    code: t("common.code"),
    date: t("lab.date"),
    exam: t("lab.exam"),
    status: t("lab.status"),
    note: t("lab.note"),
    //material: t("lab.material"),
  };
  const order = ["date", "exam", "status"];

  const dispatch = useAppDispatch();
  const data = useAppSelector((state) =>
    state.laboratories.labsRequestByPatientId.data
      ? state.laboratories.labsRequestByPatientId.data
      : []
  );

  const patientCode = useAppSelector(
    (state) => state.patients.selectedPatient.data?.code
  );

  useEffect(() => {
    if (shouldUpdateTable || patientCode)
      dispatch(getLabsRequestByPatientId(patientCode));
  }, [dispatch, patientCode, shouldUpdateTable]);

  useEffect(() => {
    if (isPrinting) {
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
        .catch((error) => {})
        .finally(() => setPrinting(false));
    }
  }, [dispatch, isPrinting, patientCode]);

  const formatDataToDisplay = (data: LaboratoryDTO[]) => {
    return data.map((item) => {
      return {
        code: item.code,
        date: item.labDate ? renderDateTime(item.labDate) : "",
        status: item.status ? statusLabel(item.status) : "",
        exam: item.exam?.description ?? "",
        //material: item.material ? t(item.material) : "",
        note: item.note ?? "",
      };
    });
  };

  const labRequestStatus = useAppSelector(
    (state) => state.laboratories.labsRequestByPatientId.status
  );

  const errorMessage = useAppSelector(
    (state) =>
      state.laboratories.labsRequestByPatientId.error?.message ||
      t("common.somethingwrong")
  ) as string;

  const printExamRequestStatus = useAppSelector(
    (state) => state.laboratories.printExamRequest.status
  );

  const printExamRequestErrorMessage = useAppSelector(
    (state) =>
      state.laboratories.printExamRequest.error?.message ||
      t("common.failedtodownloadthereport")
  ) as string;

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
      {labRequestStatus === "SUCCESS" && (
        <Table
          rowData={formatDataToDisplay(data)}
          dateFields={dateFields}
          tableHeader={header}
          labelData={label}
          columnsOrder={order}
          rowsPerPage={5}
          onCancel={canCancel ? onCancel : undefined}
          //onEdit={canUpdate ? onEdit : undefined}
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
      {labRequestStatus === "SUCCESS_EMPTY" && (
        <div ref={infoBoxRef}>
          <InfoBox type="info" message={t("common.emptydata")} />
        </div>
      )}
      {labRequestStatus === "IDLE" && (
        <CircularProgress style={{ marginLeft: "50%", position: "relative" }} />
      )}
      {labRequestStatus === "FAIL" && (
        <div ref={infoBoxRef}>
          <InfoBox type="error" message={errorMessage} />
        </div>
      )}
      {printExamRequestStatus === "FAIL" && (
        <div ref={infoBoxRef}>
          <InfoBox type="error" message={printExamRequestErrorMessage} />
        </div>
      )}
    </div>
  );
};

export default PatientExamRequestsTable;
