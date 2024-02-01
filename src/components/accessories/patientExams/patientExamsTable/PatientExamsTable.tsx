import React, { FunctionComponent, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LabWithRowsDTO } from "../../../../generated";
import { IState } from "../../../../types";
import Table from "../../table/Table";
import { useTranslation } from "react-i18next";
import { CircularProgress } from "@material-ui/core";
import InfoBox from "../../infoBox/InfoBox";
import { getLabsByPatientId } from "../../../../state/laboratories/actions";
import { renderDateTime } from "../../../../libraries/formatUtils/dataFormatting";
import { usePermission } from "../../../../libraries/permissionUtils/usePermission";
import { statusLabel } from "../../laboratory/table/ExamTable";

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
  const canUpdate = usePermission("exams.update");
  const canDelete = usePermission("exams.delete");
  const infoBoxRef = useRef<HTMLDivElement>(null);

  const header = ["date", "exam", "status"];
  const dateFields = ["date"];

  const label = {
    code: t("common.code"),
    date: t("lab.date"),
    exam: t("lab.exam"),
    result: t("lab.result"),
    note: t("lab.note"),
    status: t("lab.status"),
    //material: t("lab.material"),
  };
  const order = ["date", "exam", "status"];

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
    if (shouldUpdateTable || patientCode) {
      dispatch(getLabsByPatientId(patientCode));
    }
  }, [dispatch, patientCode, shouldUpdateTable]);

  const formatDataToDisplay = (data: LabWithRowsDTO[]) => {
    return data.map((item) => {
      return {
        code: item.laboratoryDTO?.code,
        date: item.laboratoryDTO?.labDate
          ? renderDateTime(item.laboratoryDTO?.labDate)
          : "",
        exam: item.laboratoryDTO?.exam?.description ?? "",
        result:
          item.laboratoryDTO?.exam?.procedure === 1
            ? item.laboratoryDTO?.result
            : item.laboratoryRowList?.join(", "),
        note: item.laboratoryDTO?.note,
        status: item.laboratoryDTO?.status
          ? statusLabel(item.laboratoryDTO.status)
          : "",
        // material: item.laboratoryDTO?.material
        //   ? t(item.laboratoryDTO.material)
        //   : "",
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
      <h5>{t("lab.previousentries")}</h5>
      {labStatus === "SUCCESS" && (
        <Table
          rowData={formatDataToDisplay(data)}
          dateFields={dateFields}
          tableHeader={header}
          labelData={label}
          columnsOrder={order}
          rowsPerPage={5}
          //onDelete={canDelete ? onDelete : undefined}
          isCollapsabile={true}
          //onEdit={canUpdate ? onEdit : undefined}
        />
      )}
      {labStatus === "SUCCESS_EMPTY" && (
        <div ref={infoBoxRef}>
          <InfoBox type="info" message={t("common.emptydata")} />
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
