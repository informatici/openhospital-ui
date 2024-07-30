import React, { FunctionComponent, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "@/libraries/hooks/redux";
import { VisitDTO } from "../../../../generated";
import { getVisits } from "../../../../state/visits";
import { IState } from "../../../../types";
import Table from "../../table/Table";
import { CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";
import InfoBox from "../../infoBox/InfoBox";
import { renderDate } from "../../../../libraries/formatUtils/dataFormatting";
import { usePermission } from "../../../../libraries/permissionUtils/usePermission";
interface IOwnProps {
  shouldUpdateTable: boolean;
  handleEdit: (row: any) => void;
}

const PatientVisitTable: FunctionComponent<IOwnProps> = ({
  shouldUpdateTable,
  handleEdit,
}) => {
  const { t } = useTranslation();
  const canUpdate = usePermission("opds.update");
  const header = ["date", "duration"];
  const dateFields = ["date"];
  const label = {
    visitID: t("visit.id"),
    date: t("visit.date"),
    duration: t("visit.duration"),
    service: t("visit.service"),
    ward: t("visit.ward"),
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

  const errorMessage = useSelector<IState>(
    (state) =>
      state.visits.getVisits.error?.message || t("common.somethingwrong")
  ) as string;

  const patientCode = useSelector<IState, number | undefined>(
    (state) => state.patients.selectedPatient.data?.code
  );
  useEffect(() => {
    if (shouldUpdateTable || patientCode)
      dispatch(getVisits(patientCode ?? -1));
  }, [dispatch, patientCode, shouldUpdateTable]);

  const formatDataToDisplay = (data: VisitDTO[]) => {
    return data.map((item) => ({
      visitID: item.visitID ?? "",
      duration: item.duration ?? "",
      date: item.date ? renderDate(item.date) : "",
      service: item.service ?? "",
      ward: item.ward?.description ?? "",
    }));
  };

  const onEdit = (row?: VisitDTO) => {
    handleEdit(data.find((item) => item.visitID === row?.visitID));
  };

  return (
    <div className="PatientVisitTable">
      <h5>{t("visit.previousentries")}</h5>
      {(() => {
        switch (visitStatus) {
          case "FAIL":
            return (
              <div ref={infoBoxRef}>
                <InfoBox type="error" message={errorMessage} />
              </div>
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
                dateFields={dateFields}
                tableHeader={header}
                labelData={label}
                columnsOrder={order}
                rowsPerPage={5}
                isCollapsabile={true}
                onEdit={canUpdate ? onEdit : undefined}
                addTitle={t("visit.addoperation")}
              />
            );

          case "SUCCESS_EMPTY":
            return <InfoBox type="info" message={t("common.emptydata")} />;

          default:
            return;
        }
      })()}
    </div>
  );
};
export default PatientVisitTable;
