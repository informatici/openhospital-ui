import React, { FunctionComponent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LaboratoryDTO } from "../../../../generated";
import { IState } from "../../../../types";
import Table from "../../table/Table";
import { getTherapiesByPatientId } from "../../../../state/therapies/actions";
import { useTranslation } from "react-i18next";
import { CircularProgress } from "@material-ui/core";
import { getMedicals } from "../../../../state/medicals/actions";
import { dateComparator } from "../../../../libraries/sortUtils/sortUtils";
import moment from "moment";
import InfoBox from "../../infoBox/InfoBox";
import { getLabsByPatientId } from "../../../../state/laboratories/actions";

interface IOwnProps {
  shouldUpdateTable: boolean;
}

const PatientExamsTable: FunctionComponent<IOwnProps> = ({}) => {
  const { t } = useTranslation();

  const header = ["date"];

  const label = {
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
  /*
  const exams = useSelector<IState, ExamDTO[]>((state) =>
    state.exams.getExams.data ? state.exams.getExams.data : []
  );
*/
  const patientCode = useSelector<IState, number | undefined>(
    (state) => state.patients.selectedPatient.data?.code
  );
  useEffect(() => {
    dispatch(getMedicals());
    dispatch(getLabsByPatientId(patientCode));
  }, [dispatch, patientCode]);
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
  const onDelete = () => {
    console.log("delete");
  };

  const onEdit = () => {
    console.log("update");
  };

  const onEView = () => {};

  return (
    <div className="patientExamsTable">
      {(() => {
        switch (labStatus) {
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

export default PatientExamsTable;
