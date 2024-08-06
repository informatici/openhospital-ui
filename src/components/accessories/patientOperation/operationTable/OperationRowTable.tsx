import { CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import React, { FunctionComponent, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { OperationRowDTO } from "../../../../generated";
import { renderDateTime } from "../../../../libraries/formatUtils/dataFormatting";
import { usePermission } from "../../../../libraries/permissionUtils/usePermission";
import { getOperationsByAdmissionId } from "../../../../state/operations";
import InfoBox from "../../infoBox/InfoBox";
import Table from "../../table/Table";

interface IOwnProps {
  shouldUpdateTable: boolean;
  onEdit: (opRow: OperationRowDTO) => void;
}

const PatientOperationRowTable: FunctionComponent<IOwnProps> = ({
  shouldUpdateTable,
  onEdit,
}) => {
  const { t } = useTranslation();
  const canUpdate = usePermission("operations.update");

  const header = ["opDate", "operation"];
  const dateFields = ["opDate"];

  const label = {
    opDate: t("operation.opDate"),
    opResult: t("operation.opResult"),
    remarks: t("operation.remarks"),
    transUnit: t("operation.transUnit"),
    operation: t("operation.operation"),
    prescriber: t("operation.prescriber"),
  };
  const order = ["opDate", "operation"];

  const dispatch = useAppDispatch();

  const data = useAppSelector(
    (state) => state.operations.operationRowsByQdmt.data ?? []
  );

  const patientCode = useAppSelector(
    (state) => state.patients.selectedPatient.data?.code
  );

  const currentAdmissionId = useAppSelector(
    (state) => state.admissions.currentAdmissionByPatientId.data?.id
  );

  useEffect(() => {
    if (shouldUpdateTable || patientCode) {
      dispatch(getOperationsByAdmissionId(currentAdmissionId ?? -1));
    }
  }, [shouldUpdateTable, dispatch, patientCode, currentAdmissionId]);

  const formatDataToDisplay = (data: OperationRowDTO[]) => {
    return data.map((item) => {
      return {
        id: item.id,
        opDate: item.opDate ? renderDateTime(item.opDate) : "",
        opResult: t("operation.result." + item.opResult ?? "unknown"),
        remarks: item.remarks ?? "",
        operation: item.operation?.description ?? "",
        transUnit: item.transUnit,
        prescriber: item.prescriber ?? "",
      };
    });
  };
  const handleEdit = (row: any) => {
    const opRow = data.find((item) => item.id === row.id);
    if (opRow !== undefined) onEdit(opRow);
  };
  const status = useAppSelector(
    (state) => state.operations.operationRowsByQdmt.status
  );

  return (
    <div className="patientOperationTable">
      <h5>{t("operation.previousentries")}</h5>
      {(() => {
        switch (status) {
          case "FAIL":
            return (
              <InfoBox type="error" message={t("common.somethingwrong")} />
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
                onEdit={canUpdate ? handleEdit : undefined}
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

export default PatientOperationRowTable;
