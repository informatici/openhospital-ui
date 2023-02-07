import React, { FunctionComponent, useEffect } from "react";
import Table from "../../table/Table";
import { useTranslation } from "react-i18next";
import InfoBox from "../../infoBox/InfoBox";
import { CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../../../types";
import { OperationRowDTO } from "../../../../generated";
import { renderDate } from "../../../../libraries/formatUtils/dataFormatting";
import { getOperationsByAdmissionId } from "../../../../state/operations/actions";
import { usePermission } from "../../../../libraries/permissionUtils/usePermission";

interface IOwnProps {
  shouldUpdateTable: boolean;
  onEdit: (opRow: OperationRowDTO) => void;
}

const PatientOperationRowTable: FunctionComponent<IOwnProps> = ({
  shouldUpdateTable,
  onEdit,
}) => {
  const { t } = useTranslation();
  const canUpdate = usePermission("operation.update");

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

  const dispatch = useDispatch();

  const data = useSelector<IState, OperationRowDTO[]>(
    (state) => state.operations.operationRowsByQdmt.data ?? []
  );

  const patientCode = useSelector<IState, number | undefined>(
    (state) => state.patients.selectedPatient.data?.code
  );

  const currentAdmissionId = useSelector<IState, number | undefined>(
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
        opDate: item.opDate ? renderDate(item.opDate) : "",
        opResult: item.opResult ?? "",
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
  const status = useSelector<IState, string | undefined>(
    (state) => state.operations.operationRowsByQdmt.status
  );

  return (
    <div className="patientOperationTable">
      <h5>{t("common.previousentries")}</h5>
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
            return <InfoBox type="warning" message={t("common.emptydata")} />;

          default:
            return;
        }
      })()}
    </div>
  );
};

export default PatientOperationRowTable;
