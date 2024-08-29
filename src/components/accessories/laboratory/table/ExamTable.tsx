import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { LabWithRowsDTO, LaboratoryDTOStatusEnum } from "../../../../generated";
import { renderDateTime } from "../../../../libraries/formatUtils/dataFormatting";
import { usePermission } from "../../../../libraries/permissionUtils/usePermission";
import { getLabWithRowsByCode } from "../../../../state/laboratories";
import { IState } from "../../../../types";
import { CustomModal } from "../../customModal/CustomModal";
import InfoBox from "../../infoBox/InfoBox";
import { LabelBadge } from "../../labelBadge/LabelBadge";
import Table from "../../table/Table";
import { TActions } from "../../table/types";
import { LaboratoryDetails } from "../LaboratoryDetails";
import "./styles.scss";
import { IExamTableProps, multipleResultsLabel } from "./types";

export const statusLabel = (status: LaboratoryDTOStatusEnum) => {
  status = status.toUpperCase() as LaboratoryDTOStatusEnum;
  switch (status) {
    case LaboratoryDTOStatusEnum.Deleted.toUpperCase():
      return <LabelBadge color="danger" label={status} />;
    case LaboratoryDTOStatusEnum.Invalid.toUpperCase():
      return <LabelBadge color="warning" label={status} />;

    case LaboratoryDTOStatusEnum.Open.toUpperCase():
      return <LabelBadge color="info" label={status} />;

    case LaboratoryDTOStatusEnum.Done.toUpperCase():
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
  const dispatch = useAppDispatch();
  const canUpdate = usePermission("exams.update");
  const canDelete = usePermission("exams.delete");
  const deleteStatus = useAppSelector(
    (state: IState) => state.laboratories.deleteLab.status
  );
  const deleteErrorMessage = useAppSelector(
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
          date: renderDateTime(e.laboratoryDTO?.labDate ?? ""),
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
      (row.statusText === LaboratoryDTOStatusEnum.Deleted ||
        row.statusText === LaboratoryDTOStatusEnum.Invalid) &&
      (action === "delete" || action === "edit")
    ) {
      return false;
    }

    if (
      row.statusText !== LaboratoryDTOStatusEnum.Draft &&
      row.statusText !== LaboratoryDTOStatusEnum.Open &&
      action === "cancel"
    ) {
      return false;
    }

    if (
      (row.statusText === LaboratoryDTOStatusEnum.Draft ||
        row.statusText === LaboratoryDTOStatusEnum.Open) &&
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

  const onCancel = (row: any) => {
    if (handleCancel) {
      handleCancel(row.id);
    }
  };

  const onDelete = (row: any) => {
    let labExam = data.find(
      (item) => item.laboratoryDTO?.code === row.id
    )?.laboratoryDTO;

    if (labExam) {
      if (
        labExam.status === LaboratoryDTOStatusEnum.Draft ||
        labExam.status === LaboratoryDTOStatusEnum.Open
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
        onCancel={canDelete ? onCancel : undefined}
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
