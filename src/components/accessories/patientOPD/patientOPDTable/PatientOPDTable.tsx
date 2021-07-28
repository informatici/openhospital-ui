import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OpdDTO } from "../../../../generated";
import {
  deleteOpd,
  deleteOpdReset,
  getOpds,
} from "../../../../state/opds/actions";
import { IState } from "../../../../types";
import Table from "../../table/Table";
import { CircularProgress } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { dateComparator } from "../../../../libraries/sortUtils/sortUtils";
import InfoBox from "../../infoBox/InfoBox";
import ConfirmationDialog from "../../confirmationDialog/ConfirmationDialog";
import checkIcon from "../../../../assets/check-icon.png";
interface IOwnProps {
  shouldUpdateTable: boolean;
}

const PatientOPDTable: FunctionComponent<IOwnProps> = ({
  shouldUpdateTable,
}) => {
  const { t } = useTranslation();
  const header = ["date"];
  const label = {
    date: t("opd.dateopd"),
    disease: t("opd.disease1"),
    disease2: t("opd.disease2"),
    disease3: t("opd.disease3"),
    note: t("opd.note"),
  };
  const order = ["date"];
  const dispatch = useDispatch();
  const infoBoxRef = useRef<HTMLDivElement>(null);
  const data = useSelector<IState, OpdDTO[]>((state) =>
    state.opds.getOpds.data ? state.opds.getOpds.data : []
  );
  const opdStatus = useSelector<IState, string | undefined>(
    (state) => state.opds.getOpds.status
  );
  const patientCode = useSelector<IState, number | undefined>(
    (state) => state.patients.selectedPatient.data?.code
  );

  const [deletedObjCode, setDeletedObjCode] = useState("");

  const deleteStatus = useSelector<IState, string | undefined>(
    (state) => state.opds.deleteOpd.status
  );
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  useEffect(() => {
    setOpenSuccessDialog(false);
    dispatch(deleteOpdReset());
  }, [dispatch, deleteOpdReset]);

  useEffect(() => {
    if (deleteStatus === "SUCCESS") setOpenSuccessDialog(true);
    if (
      shouldUpdateTable ||
      deleteStatus === "SUCCESS" ||
      (patientCode && opdStatus !== "SUCCESS")
    )
      dispatch(getOpds(patientCode));
  }, [dispatch, patientCode, shouldUpdateTable, deleteStatus]);

  const formatDataToDisplay = (data: OpdDTO[] | undefined) => {
    let results: any = [];
    if (data)
      results = data.map((item) => {
        return {
          code: item.code,
          date: item.date ? moment(item.date).format("DD/MM/YYYY") : "",
          disease: item.disease?.description || "",
          disease2: item.disease2?.description || "",
          disease3: item.disease3?.description || "",
          note: item.note || "",
        };
      });
    return results;
  };

  const onDelete = (row: OpdDTO) => {
    if (row.code) {
      setDeletedObjCode(row.code + "");
      dispatch(deleteOpd(row.code));
    }
  };

  const onEdit = () => {
    console.log("update");
  };

  const onEView = () => {};

  return (
    <div className="patientOpdTable">
      {opdStatus === "SUCCESS" ? (
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
      ) : (
        opdStatus === "SUCCESS_EMPTY" && (
          <InfoBox type="warning" message={t("common.emptydata")} />
        )
      )}

      {deleteStatus === "SUCCESS" && (
        <ConfirmationDialog
          isOpen={openSuccessDialog}
          title="Opd deleted"
          icon={checkIcon}
          info={t("common.deletesuccess", { code: deletedObjCode })}
          primaryButtonLabel="OK"
          handlePrimaryButtonClick={() => setOpenSuccessDialog(false)}
          handleSecondaryButtonClick={() => {}}
        />
      )}

      {(deleteStatus === "LOADING" || opdStatus === "LOADING") && (
        <CircularProgress style={{ marginLeft: "50%", position: "relative" }} />
      )}

      {(opdStatus === "FAIL" || deleteStatus === "FAIL") && (
        <div ref={infoBoxRef}>
          <InfoBox type="error" message={t("common.somethingwrong")} />
        </div>
      )}
    </div>
  );
};
export default PatientOPDTable;
