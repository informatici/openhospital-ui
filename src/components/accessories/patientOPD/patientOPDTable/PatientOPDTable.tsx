import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OpdDTO } from "../../../../generated";
import { deleteOpd, getOpds } from "../../../../state/opds/actions";
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
  const data = useSelector<IState, OpdDTO[]>((state) =>
    state.opds.getOpds.data ? state.opds.getOpds.data : []
  );
  const searchStatus = useSelector<IState, string | undefined>(
    (state) => state.opds.getOpds.status
  );
  const patientCode = useSelector<IState, number | undefined>(
    (state) => state.patients.selectedPatient.data?.code
  );

  const deleteStatus = useSelector<IState, string | undefined>(
    (state) => state.opds.deleteOpd.status
  );
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);

  useEffect(() => {
    if (deleteStatus === "SUCCESS") setOpenSuccessDialog(true);
    if (shouldUpdateTable || deleteStatus === "SUCCESS")
      dispatch(getOpds(patientCode));
  }, [dispatch, patientCode, shouldUpdateTable, deleteStatus]);

  const formatDataToDisplay = (data: OpdDTO[] | undefined) => {
    let results: any = [];
    if (data)
      results = data.map((item) => {
        return {
          code: item.code,
          date: item.date ? moment(item.date).format("DD/MM/YYYY") : "",
          disease: item.disease ? item.disease.description : "",
          disease2: item.disease2 ? item.disease2.description : "",
          disease3: item.disease3 ? item.disease3.description : "",
          note: item.note + "",
        };
      });
    return results;
  };

  const onDelete = (row: OpdDTO) => {
    if (row.code) dispatch(deleteOpd(row.code));
  };

  const onEdit = () => {
    console.log("update");
  };

  const onEView = () => {};

  const renderSwitch = (status: string = "") => {
    switch (status) {
      case "FAIL":
        return <InfoBox type="error" message={t("common.somethingwrong")} />;
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
        );

      case "SUCCESS_EMPTY":
        return <InfoBox type="warning" message={t("common.emptydata")} />;

      default:
        return;
    }
  };

  const renderDeleteState = (status = "") => {
    switch (status) {
      case "FAIL":
        return <InfoBox type="error" message={t("common.somethingwrong")} />;

      case "SUCCESS":
        return (
          <ConfirmationDialog
            isOpen={openSuccessDialog}
            title="Opd deleted"
            icon={checkIcon}
            info={t("common.deletesuccess")}
            primaryButtonLabel="OK"
            handlePrimaryButtonClick={() => setOpenSuccessDialog(false)}
            handleSecondaryButtonClick={() => {}}
          />
        );
      default:
        return;
    }
  };
  return (
    <div className="patientOpdTable">
      {renderSwitch(searchStatus)}
      {renderDeleteState(deleteStatus)}
    </div>
  );
};

export default PatientOPDTable;
