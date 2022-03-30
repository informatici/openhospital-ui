import React, { FunctionComponent, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { VisitDTO } from "../../../../generated";
import { getVisits } from "../../../../state/visits/actions";
import { IState } from "../../../../types";
import Table from "../../table/Table";
import { CircularProgress } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import InfoBox from "../../infoBox/InfoBox";
import { renderDate } from "../../../../libraries/formatUtils/dataFormatting";
interface IOwnProps {
  shouldUpdateTable: boolean;
  handleEdit: <T>(row: T) => void;
  handleDelete: (code: number | undefined) => void;
}

const PatientVisitTable: FunctionComponent<IOwnProps> = ({
  shouldUpdateTable,
  handleEdit,
  handleDelete,
}) => {
  const { t } = useTranslation();
  const header = ["date", "duration"];
  const dateFields = ["date"];
  const label = {
    visitID: t("visit.id"),
    date: t("visit.date"),
    duration: t("visit.duration"),
    service: t("visit.service"),
    ward: t("visit.ward"),
    note: t("visit.note"),
    sms: t("visit.sms"),
  };
  const order = ["date", "duration"];
  const dispatch = useDispatch();
  const infoBoxRef = useRef<HTMLDivElement>(null);

  const data = useSelector<IState, VisitDTO[]>(
    (state) => state.visits.getVisits.data ?? []
  );
  const visitStatus = useSelector<IState, string | undefined>(
    (state) => state.visits.getVisits.status
  );
  const patientCode = useSelector<IState, number | undefined>(
    (state) => state.patients.selectedPatient.data?.code
  );
  useEffect(() => {
    if (shouldUpdateTable || patientCode)
      dispatch(getVisits(patientCode ?? -1));
  }, [dispatch, patientCode, shouldUpdateTable]);

  const formatDataToDisplay = (data: VisitDTO[] | undefined) => {
    let results: any = [];
    if (data)
      results = data.map((item) => {
        return {
          id: item.visitID,
          date: item.date ? renderDate(item.date) : "",
          ward: item.ward?.description || "",
          service: item.service || "",
          note: item.note || "",
          sms: item.sms || false,
        };
      });
    return results;
  };

  const onDelete = (row: VisitDTO) => {
    handleDelete(row.visitID);
  };

  const onEdit = (row?: VisitDTO) => {
    handleEdit(data.find((item) => item.visitID === row?.visitID));
  };

  const onEView = () => {};

  return (
    <div className="PatientVisitTable">
      {visitStatus === "SUCCESS" ? (
        <Table
          rowData={formatDataToDisplay(data)}
          dateFields={dateFields}
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
        visitStatus === "SUCCESS_EMPTY" && (
          <InfoBox type="warning" message={t("common.emptydata")} />
        )
      )}
      {visitStatus === "LOADING" && (
        <CircularProgress style={{ marginLeft: "50%", position: "relative" }} />
      )}

      {visitStatus === "FAIL" && (
        <div ref={infoBoxRef}>
          <InfoBox type="error" message={t("common.somethingwrong")} />
        </div>
      )}
    </div>
  );
};
export default PatientVisitTable;
