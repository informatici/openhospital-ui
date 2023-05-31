import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { CustomModal } from "../../customModal/CustomModal";
import Table from "../../table/Table";
import { IExamTableProps, multipleResultsLabel } from "./types";
import "./styles.scss";
import { renderDate } from "../../../../libraries/formatUtils/dataFormatting";
import { LaboratoryDetails } from "../LaboratoryDetails";
import { useDispatch, useSelector } from "react-redux";
import { getLabWithRowsByCode } from "../../../../state/laboratories/actions";
import { IState } from "../../../../types";
import InfoBox from "../../infoBox/InfoBox";
import { usePermission } from "../../../../libraries/permissionUtils/usePermission";
import { LabWithRowsDTO, LaboratoryDTOStatusEnum } from "../../../../generated";
import { LabelBadge } from "../../labelBadge/LabelBadge";
import { TActions } from "../../table/types";

export const statusLabel = (status: LaboratoryDTOStatusEnum) => {
  switch (status) {
    case LaboratoryDTOStatusEnum.DELETED:
      return <LabelBadge color="danger" label={status} />;
    case LaboratoryDTOStatusEnum.INVALID:
      return <LabelBadge color="warning" label={status} />;

    case LaboratoryDTOStatusEnum.OPEN:
      return <LabelBadge color="info" label={status} />;

    case LaboratoryDTOStatusEnum.DONE:
      return <LabelBadge color="success" label={status} />;

    default:
      return <LabelBadge color="default" label={status} />;
  }
};

export const ExamTable: FC<IExamTableProps> = ({
  data,
  handleDelete,
  handleEdit,
  handleCancel,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const canUpdate = usePermission("exam.update");
  const canDelete = usePermission("exam.delete");
  const deleteStatus = useSelector<IState, any>(
    (state: IState) => state.laboratories.deleteLab.status
  );
  const deleteErrorMessage = useSelector(
    (state: IState) => state.laboratories.deleteLab.error?.message
  );

  const header = ["id", "date", "patName", "exam", "result", "status"];
  const dateFields = ["date"];
  const label = {
    id: t("lab.code"),
    date: t("lab.date"),
    patName: t("lab.patient"),
    exam: t("lab.exam"),
    result: t("lab.result"),
    status: t("lab.status"),
  };
  const order = ["id", "date", "patName", "exam", "result", "status"];

  const formatDataToDisplay = (data: LabWithRowsDTO[]) => {
    let results: any = [];
    if (data && data.length > 0)
      results = data.map((e) => {
        return {
          id: e.laboratoryDTO?.code ?? "",
          date: renderDate(e.laboratoryDTO?.labDate ?? ""),
          patName: e.laboratoryDTO?.patName ?? "",
          exam:
            e.laboratoryDTO?.exam?.description ?? e.laboratoryDTO?.exam ?? "", //The second case should be removed when the api is ready
          result:
            e.laboratoryDTO?.result !== multipleResultsLabel //CASE OF PROC2
              ? e.laboratoryDTO?.result ?? ""
              : t("lab.multipleresults"),
          patientCode: e.laboratoryDTO?.patientCode ?? "",
          status: e.laboratoryDTO?.status
            ? statusLabel(e.laboratoryDTO.status)
            : "",
          statusText: e.laboratoryDTO?.status ?? "",
        };
      });
    return results;
  };

  const formattedData: any[] = formatDataToDisplay(data);

  const shouldDisplayAction = (row: any, action: TActions): boolean => {
    if (
      (row.statusText === LaboratoryDTOStatusEnum.DELETED ||
        row.statusText === LaboratoryDTOStatusEnum.INVALID) &&
      action === "delete"
    ) {
      return false;
    }

    return true;
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleView = (row: any) => {
    dispatch(getLabWithRowsByCode(row.id));
    handleOpen();
  };

  const onEdit = (row: any) => {
    if (handleEdit !== undefined) {
      handleEdit(
        data.find((item) => item.laboratoryDTO?.code === row.id)
          ?.laboratoryDTO ?? {}
      );
    }
  };

  const onDelete = (row: any) => {
    let labExam = data.find(
      (item) => item.laboratoryDTO?.code === row.id
    )?.laboratoryDTO;

    if (labExam) {
      if (
        labExam.status === LaboratoryDTOStatusEnum.DRAFT ||
        labExam.status === LaboratoryDTOStatusEnum.OPEN
      ) {
        if (handleCancel !== undefined) handleCancel(labExam.code);
      } else {
        if (handleDelete !== undefined) handleDelete(labExam.code);
      }
    }
  };

  return (
    <div className="exams__table">
      <Table
        rowData={formattedData}
        dateFields={dateFields}
        tableHeader={header}
        labelData={label}
        columnsOrder={order}
        rowsPerPage={10}
        onView={handleView}
        onEdit={canUpdate ? onEdit : undefined}
        onDelete={canDelete ? onDelete : undefined}
        displayRowAction={shouldDisplayAction}
      />
      {deleteStatus === "FAIL" && (
        <div className="info-box-container">
          <InfoBox type="error" message={deleteErrorMessage} />
        </div>
      )}
      <CustomModal
        open={open}
        onClose={handleClose}
        title={t("lab.details")}
        description={t("lab.details")}
        content={<LaboratoryDetails />}
      />
    </div>
  );
};
