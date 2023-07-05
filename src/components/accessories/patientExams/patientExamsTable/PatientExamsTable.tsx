import React, { FunctionComponent, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LabWithRowsDTO } from "../../../../generated";
import { IState } from "../../../../types";
import Table from "../../table/Table";
import { useTranslation } from "react-i18next";
import { CircularProgress } from "@material-ui/core";
import InfoBox from "../../infoBox/InfoBox";
import { getLabsByPatientId } from "../../../../state/laboratories/actions";
import { renderDate } from "../../../../libraries/formatUtils/dataFormatting";
import { usePermission } from "../../../../libraries/permissionUtils/usePermission";

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
  const canUpdate = usePermission("exam.update");
  const canDelete = usePermission("exam.delete");
  const infoBoxRef = useRef<HTMLDivElement>(null);

  const header = ["labDate", "exam"];
  const dateFields = ["labDate"];

  const label = {
    code: t("common.code"),
    labDate: t("lab.date"),
    exam: t("lab.exam"),
    result: t("lab.result"),
    note: t("lab.note"),
  };
  const order = ["labDate", "exam"];

  const dispatch = useDispatch();
  const data = useSelector<IState, LabWithRowsDTO[]>((state) =>
    state.laboratories.labsByPatientId.data
      ? state.laboratories.labsByPatientId.data
      : []
  );

  const patientCode = useSelector<IState, number | undefined>(
    (state) => state.patients.selectedPatient.data?.code
  );

  useEffect(() => {
    if (shouldUpdateTable || patientCode)
      dispatch(getLabsByPatientId(patientCode));
  }, [dispatch, patientCode, shouldUpdateTable]);

  const formatDataToDisplay = (data: LabWithRowsDTO[]) => {
    return data.map((item) => {
      return {
        code: item.laboratoryDTO?.code,
        labDate: item.laboratoryDTO?.labDate
          ? renderDate(item.laboratoryDTO?.labDate)
          : "",
        exam: item.laboratoryDTO?.exam?.description ?? "",
        result:
          item.laboratoryDTO?.exam?.procedure === 1
            ? item.laboratoryDTO?.result
            : item.laboratoryRowList?.join(", "),
        note: item.laboratoryDTO?.note,
      };
    });
    //   .sort(dateComparator("desc", "date"));
  };
  const labStatus = useSelector<IState, string | undefined>(
    (state) => state.laboratories.labsByPatientId.status
  );
  const errorMessage = useSelector<IState>(
    (state) =>
      state.laboratories.labsByPatientId.error?.message ||
      t("common.somethingwrong")
  ) as string;
  const labData = useSelector<IState, LabWithRowsDTO[] | undefined>(
    (state) => state.laboratories.labsByPatientId.data
  );

  const onEdit = (row: any) => {
    handleEdit(
      labData?.find((item) => item.laboratoryDTO?.code === row.code)
        ?.laboratoryDTO
    );
  };
  const onDelete = (row: any) => {
    handleDelete(row.code);
  };

  return (
    <div className="patientExamsTable">
      <h5>{t("common.previousentries")}</h5>
      {labStatus === "SUCCESS" && (
        <Table
          rowData={formatDataToDisplay(data)}
          dateFields={dateFields}
          tableHeader={header}
          labelData={label}
          columnsOrder={order}
          rowsPerPage={5}
          onDelete={canDelete ? onDelete : undefined}
          isCollapsabile={true}
          onEdit={canUpdate ? onEdit : undefined}
        />
      )}
      {labStatus === "SUCCESS_EMPTY" && (
        <div ref={infoBoxRef}>
          <InfoBox type="warning" message={t("common.emptydata")} />
        </div>
      )}
      {labStatus === "IDLE" && (
        <CircularProgress style={{ marginLeft: "50%", position: "relative" }} />
      )}
      {labStatus === "FAIL" && (
        <div ref={infoBoxRef}>
          <InfoBox type="error" message={errorMessage} />
        </div>
      )}
    </div>
  );
};

export default PatientExamsTable;
