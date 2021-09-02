import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OpdDTO } from "../../../../generated";
import { getOpds } from "../../../../state/opds/actions";
import { IState } from "../../../../types";
import Table from "../../table/Table";
import { CircularProgress } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { dateComparator } from "../../../../libraries/sortUtils/sortUtils";
import InfoBox from "../../infoBox/InfoBox";
import { renderDate } from "../../../../libraries/formatUtils/dataFormatting";
interface IOwnProps {
  shouldUpdateTable: boolean;
  handleEdit: <T>(row: T) => void;
  handleDelete: (code: number | undefined) => void;
}

const PatientOPDTable: FunctionComponent<IOwnProps> = ({
  shouldUpdateTable,
  handleEdit,
  handleDelete,
}) => {
  const { t } = useTranslation();
  const header = ["date"];
  const label = {
    code: t("opd.code"),
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
  useEffect(() => {
    if (shouldUpdateTable || patientCode) dispatch(getOpds(patientCode));
  }, [dispatch, patientCode, shouldUpdateTable]);

  const formatDataToDisplay = (data: OpdDTO[] | undefined) => {
    let results: any = [];
    if (data)
      results = data.map((item) => {
        return {
          code: item.code,
          date: item.date ? renderDate(item.date) : "",
          disease: item.disease?.description || "",
          disease2: item.disease2?.description || "",
          disease3: item.disease3?.description || "",
          note: item.note || "",
        };
      });
    return results;
  };

  const onDelete = (row: OpdDTO) => {
    handleDelete(row.code);
  };

  const onEdit = (row?: OpdDTO) => {
    handleEdit(data.find((item) => item.code === row?.code));
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
      {opdStatus === "LOADING" && (
        <CircularProgress style={{ marginLeft: "50%", position: "relative" }} />
      )}

      {opdStatus === "FAIL" && (
        <div ref={infoBoxRef}>
          <InfoBox type="error" message={t("common.somethingwrong")} />
        </div>
      )}
    </div>
  );
};
export default PatientOPDTable;
