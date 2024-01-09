import React, { FunctionComponent, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LaboratoryDTO, LaboratoryDTOStatusEnum } from "../../../../generated";
import { IState } from "../../../../types";
import Table from "../../table/Table";
import { useTranslation } from "react-i18next";
import { CircularProgress } from "@material-ui/core";
import InfoBox from "../../infoBox/InfoBox";
import { getLabsRequestByPatientId } from "../../../../state/laboratories/actions";
import { renderDate } from "../../../../libraries/formatUtils/dataFormatting";
import { usePermission } from "../../../../libraries/permissionUtils/usePermission";
import { statusLabel } from "../../laboratory/table/ExamTable";

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
  const canUpdate = usePermission("laboratories.update");
  const canCancel = usePermission("laboratories.delete");
  const infoBoxRef = useRef<HTMLDivElement>(null);

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

  const dispatch = useDispatch();
  const data = useSelector<IState, LaboratoryDTO[]>((state) =>
    state.laboratories.labsRequestByPatientId.data
      ? state.laboratories.labsRequestByPatientId.data
      : []
  );

  const patientCode = useSelector<IState, number | undefined>(
    (state) => state.patients.selectedPatient.data?.code
  );

  useEffect(() => {
    if (shouldUpdateTable || patientCode)
      dispatch(getLabsRequestByPatientId(patientCode));
  }, [patientCode, shouldUpdateTable]);

  const formatDataToDisplay = (data: LaboratoryDTO[]) => {
    return data.map((item) => {
      return {
        code: item.code,
        date: item.labDate ? renderDate(item.labDate) : "",
        status: item.status ? statusLabel(item.status) : "",
        exam: item.exam?.description ?? "",
        //material: item.material ? t(item.material) : "",
        note: item.note ?? "",
      };
    });
  };

  const labRequestStatus = useSelector<IState, string | undefined>(
    (state) => state.laboratories.labsRequestByPatientId.status
  );

  const errorMessage = useSelector<IState>(
    (state) =>
      state.laboratories.labsRequestByPatientId.error?.message ||
      t("common.somethingwrong")
  ) as string;

  const onEdit = (row: any) => {
    if (handleEdit) {
      handleEdit(data?.find((item) => item.code === row.code));
    }
  };

  const onCancel = (row: any) => {
    if (handleCancel) {
      handleCancel(row.code);
    }
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
    </div>
  );
};

export default PatientExamRequestsTable;
