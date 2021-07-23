import React, { FunctionComponent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OpdDTO } from "../../../../generated";
import { getOpds } from "../../../../state/opds/actions";
import { IState } from "../../../../types";
import Table from "../../table/Table";
import { CircularProgress } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { dateComparator } from "../../../../libraries/sortUtils/sortUtils";
import InfoBox from "../../infoBox/InfoBox";
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
  const opdStatus = useSelector<IState, string | undefined>(
    (state) => state.opds.getOpds.status
  );
  const patientCode = useSelector<IState, number | undefined>(
    (state) => state.patients.selectedPatient.data?.code
  );

  useEffect(() => {
    if (shouldUpdateTable) dispatch(getOpds(patientCode));
  }, [dispatch, patientCode, shouldUpdateTable]);

  const formatDataToDisplay = (data: OpdDTO[] | undefined) => {
    let results: any = [];
    if (data)
      results = data.map((item) => {
        return {
          date: item.date ? moment(item.date).format("DD/MM/YYYY") : "",
          disease: item.disease?.description || "",
          disease2: item.disease2?.description || "",
          disease3: item.disease3?.description || "",
          note: item.note || "",
        };
      });
    return results;
  };

  const onDelete = () => {
    console.log("delete");
  };

  const onEdit = () => {
    console.log("update");
  };

  const onEView = () => {};

  return (
    <div className="patientOpdTable">
      {(() => {
        switch (opdStatus) {
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
      })()}
    </div>
  );
};

export default PatientOPDTable;
