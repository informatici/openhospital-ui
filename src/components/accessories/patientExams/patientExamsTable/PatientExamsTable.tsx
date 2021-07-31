import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LaboratoryDTO } from "../../../../generated";
import { IState } from "../../../../types";
import Table from "../../table/Table";
import { useTranslation } from "react-i18next";
import { CircularProgress } from "@material-ui/core";
import { dateComparator } from "../../../../libraries/sortUtils/sortUtils";
import moment from "moment";
import InfoBox from "../../infoBox/InfoBox";
import {
  deleteLab,
  deleteLabReset,
  getLabsByPatientId,
} from "../../../../state/laboratories/actions";
import ConfirmationDialog from "../../confirmationDialog/ConfirmationDialog";
import checkIcon from "../../../../assets/check-icon.png";

interface IOwnProps {
  shouldUpdateTable: boolean;
  handleEdit: (row: any) => void;
}

const PatientExamsTable: FunctionComponent<IOwnProps> = ({
  shouldUpdateTable,
  handleEdit,
}) => {
  const { t } = useTranslation();
  const [deletedObjCode, setDeletedObjCode] = useState("");
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const infoBoxRef = useRef<HTMLDivElement>(null);

  const header = ["date"];

  const label = {
    code: t("common.code"),
    date: t("lab.date"),
    exam: t("lab.exam"),
    material: t("lab.material"),
    result: t("lab.result"),
    note: t("lab.note"),
  };
  const order = ["date"];

  const dispatch = useDispatch();
  const data = useSelector<IState, LaboratoryDTO[]>((state) =>
    state.laboratories.labsByPatientId.data
      ? state.laboratories.labsByPatientId.data
      : []
  );

  const deleteStatus = useSelector<IState, string | undefined>(
    (state) => state.laboratories.deleteLab.status
  );

  const patientCode = useSelector<IState, number | undefined>(
    (state) => state.patients.selectedPatient.data?.code
  );

  useEffect(() => {
    setOpenSuccessDialog(false);
    dispatch(deleteLabReset());
  }, [dispatch, deleteLabReset]);

  useEffect(() => {
    if (shouldUpdateTable || patientCode)
      dispatch(getLabsByPatientId(patientCode));
  }, [dispatch, patientCode, shouldUpdateTable, getLabsByPatientId]);

  useEffect(() => {
    if (deleteStatus === "SUCCESS") setOpenSuccessDialog(true);
    if (deleteStatus === "SUCCESS") dispatch(getLabsByPatientId(patientCode));
  }, [dispatch, patientCode, deleteStatus, getLabsByPatientId]);

  const formatDataToDisplay = (data: LaboratoryDTO[]) => {
    return data.map((item) => {
      return {
        code: item.code,
        date: (item.date && moment(item.date).format("DD/MM/YYYY")) || "",
        exam: item.exam?.description || "",
        material: item.material,
        result: item.result,
        note: item.note,
      };
    });
    //   .sort(dateComparator("desc", "date"));
  };
  const labStatus = useSelector<IState, string | undefined>(
    (state) => state.laboratories.labsByPatientId.status
  );
  const labData = useSelector<IState, LaboratoryDTO[] | undefined>(
    (state) => state.laboratories.labsByPatientId.data
  );
  const onDelete = (row: LaboratoryDTO) => {
    if (row.code) {
      setDeletedObjCode(row.code + "");
      dispatch(deleteLab(row.code));
    }
  };

  const onEdit = (row: any) => {
    handleEdit(labData?.find((item) => item.code === row.code));
  };

  const onEView = () => {};

  return (
    <div className="patientExamsTable">
      {labStatus === "SUCCESS" && (
        <Table
          rowData={formatDataToDisplay(data)}
          compareRows={dateComparator}
          tableHeader={header}
          labelData={label}
          columnsOrder={order}
          rowsPerPage={5}
          onDelete={onDelete}
          isCollapsabile={true}
          onEdit={onEdit}
          onView={onEView}
        />
      )}
      {labStatus === "SUCCESS_EMPTY" && (
        <div ref={infoBoxRef}>
          <InfoBox type="warning" message={t("common.emptydata")} />
        </div>
      )}
      {(deleteStatus === "LOADING" || labStatus === "LOADING") && (
        <CircularProgress style={{ marginLeft: "50%", position: "relative" }} />
      )}
      {(labStatus === "FAIL" || deleteStatus === "FAIL") && (
        <div ref={infoBoxRef}>
          <InfoBox type="error" message={t("common.somethingwrong")} />
        </div>
      )}
      <ConfirmationDialog
        isOpen={openSuccessDialog}
        title={t("lab.deleted")}
        icon={checkIcon}
        info={t("common.deletesuccess", { code: deletedObjCode })}
        primaryButtonLabel="OK"
        handlePrimaryButtonClick={() => setOpenSuccessDialog(false)}
        handleSecondaryButtonClick={() => {}}
      />
    </div>
  );
};

export default PatientExamsTable;
