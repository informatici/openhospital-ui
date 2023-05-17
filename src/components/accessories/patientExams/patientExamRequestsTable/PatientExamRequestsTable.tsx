import React, { FunctionComponent, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LaboratoryDTO } from "../../../../generated";
import { IState } from "../../../../types";
import Table from "../../table/Table";
import { useTranslation } from "react-i18next";
import { CircularProgress } from "@material-ui/core";
import InfoBox from "../../infoBox/InfoBox";
import { getLabsRequestByPatientId } from "../../../../state/laboratories/actions";
import { renderDate } from "../../../../libraries/formatUtils/dataFormatting";
import { usePermission } from "../../../../libraries/permissionUtils/usePermission";

interface IOwnProps {
  shouldUpdateTable: boolean;
  handleEdit?: (row: any) => void;
  handleDelete?: (code: number | undefined) => void;
}

const PatientExamRequestsTable: FunctionComponent<IOwnProps> = ({
  shouldUpdateTable,
  handleEdit,
  handleDelete,
}) => {
  const { t } = useTranslation();
  //const canUpdate = usePermission("exam.update");
  //const canDelete = usePermission("exam.delete");
  const infoBoxRef = useRef<HTMLDivElement>(null);

  const header = ["date", "exam"];
  const dateFields = ["date"];

  const label = {
    code: t("common.code"),
    date: t("lab.date"),
    exam: t("lab.exam"),
    result: t("lab.result"),
    note: t("lab.note"),
  };
  const order = ["date", "exam"];

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
  }, [dispatch, patientCode, shouldUpdateTable]);

  const formatDataToDisplay = (data: LaboratoryDTO[]) => {
    return data.map((item) => {
      return {
        code: item.code,
        date: item.labDate ? renderDate(item.labDate) : "",
        exam: item.exam?.description ?? "",
        result: "",
      };
    });
    //   .sort(dateComparator("desc", "date"));
  };
  const labRequestStatus = useSelector<IState, string | undefined>(
    (state) => state.laboratories.labsRequestByPatientId.status
  );
  const errorMessage = useSelector<IState>(
    (state) =>
      state.laboratories.labsRequestByPatientId.error?.message ||
      t("common.somethingwrong")
  ) as string;

  const labRequestData = useSelector<IState, LaboratoryDTO[] | undefined>(
    (state) => state.laboratories.labsRequestByPatientId.data
  );

  const onEdit = (row: any) => {
    if (handleEdit) {
      handleEdit(labRequestData?.find((item) => item.code === row.code));
    }
  };
  const onDelete = (row: any) => {
    if (handleDelete) {
      handleDelete(row.code);
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
          onDelete={undefined}
          isCollapsabile={true}
          onEdit={undefined}
        />
      )}
      {labRequestStatus === "SUCCESS_EMPTY" && (
        <div ref={infoBoxRef}>
          <InfoBox type="warning" message={t("common.emptydata")} />
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
