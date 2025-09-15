import { CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { getEncounterOpds } from "state/encounter";
import { OpdDTO, OpdWithOperationRowDTO } from "../../../../generated";
import { renderDateTime } from "../../../../libraries/formatUtils/dataFormatting";
import { usePermission } from "../../../../libraries/permissionUtils/usePermission";
import { getOpdsWithOperationRows } from "../../../../state/opds";
import InfoBox from "../../infoBox/InfoBox";
import Table from "../../table/Table";
import "./styles.scss";

interface IOwnProps {
  shouldUpdateTable: boolean;
  handleEdit?: (row: any) => void;
}

const PatientOPDTable: FunctionComponent<IOwnProps> = ({
  shouldUpdateTable,
  handleEdit,
}) => {
  const { t } = useTranslation();
  const canUpdate = usePermission("opds.update");
  const header = ["date", "disease"];
  const dateFields = ["date"];
  const label = {
    code: t("opd.code"),
    date: t("opd.dateopd"),
    disease: t("opd.disease1"),
    ward: t("visit.ward"),
    disease2: t("opd.disease2"),
    disease3: t("opd.disease3"),
    note: t("opd.note"),
  };
  const order = ["date", "disease"];
  const dispatch = useAppDispatch();
  const infoBoxRef = useRef<HTMLDivElement>(null);
  const [mostRecentVisit, setMostRecentVisit] = useState<
    OpdWithOperationRowDTO | undefined
  >(undefined);

  const { code } = useParams();

  const data = useAppSelector((state) =>
    code ? state.encounters.encounterOpds.data : state.opds.getOpds.data ?? []
  );

  const opdStatus = useAppSelector((state) =>
    code ? state.encounters.encounterOpds.status : state.opds.getOpds.status
  );
  const errorMessage = useAppSelector(
    (state) => state.opds.getOpds.error?.message || t("common.somethingwrong")
  ) as string;
  const patientCode = useAppSelector(
    (state) => state.patients.selectedPatient.data?.code
  );
  useEffect(() => {
    if (shouldUpdateTable || patientCode || code) {
      const action = code
        ? getEncounterOpds({ code })
        : getOpdsWithOperationRows(patientCode);
      dispatch(action as any);
    }
  }, [dispatch, patientCode, shouldUpdateTable, code]);

  const formatDataToDisplay = (data: OpdWithOperationRowDTO[] | undefined) => {
    let results: any = [];
    if (data)
      results = data.map((item) => {
        return {
          code: item.opdDTO?.code,
          date: item.opdDTO?.date ? renderDateTime(item.opdDTO.date) : "",
          disease: item.opdDTO?.disease?.description || "",
          ward: item.opdDTO?.ward.description,
          disease2: item.opdDTO?.disease2?.description || "",
          disease3: item.opdDTO?.disease3?.description || "",
          note: item.opdDTO?.note || "",
        };
      });
    return results;
  };

  useEffect(() => {
    if (data?.length! > 0) {
      const mostRecent = data?.reduce((latest, item) => {
        if (!!item.opdDTO?.date && latest.opdDTO?.date) {
          return new Date(item.opdDTO?.date) > new Date(latest.opdDTO?.date)
            ? item
            : latest;
        } else {
          return latest;
        }
      });

      setMostRecentVisit(mostRecent);
    }
  }, [data]);

  const onEdit = handleEdit
    ? (row?: OpdDTO) => {
        handleEdit(data?.find((item) => item.opdDTO?.code === row?.code));
      }
    : undefined;

  const getRowClassNames = (row: any): string => {
    if ((row.opdDTO?.code ?? row.code) === mostRecentVisit?.opdDTO?.code) {
      return "mostRecentVisit";
    }

    return "";
  };

  return (
    <div className="patientOpdTable">
      <h5>{t("opd.previousentries")}</h5>
      {opdStatus === "SUCCESS" ? (
        <Table
          rowData={formatDataToDisplay(data)}
          dateFields={dateFields}
          tableHeader={header}
          labelData={label}
          columnsOrder={order}
          rowsPerPage={5}
          isCollapsabile={true}
          rowClassNames={getRowClassNames}
          onEdit={canUpdate ? onEdit : undefined}
          addTitle={t("opd.addoperation")}
        />
      ) : (
        opdStatus === "SUCCESS_EMPTY" && (
          <InfoBox type="info" message={t("common.emptydata")} />
        )
      )}
      {opdStatus === "LOADING" && (
        <CircularProgress style={{ marginLeft: "50%", position: "relative" }} />
      )}

      {opdStatus === "FAIL" && (
        <div ref={infoBoxRef}>
          <InfoBox type="error" message={errorMessage} />
        </div>
      )}
    </div>
  );
};
export default PatientOPDTable;
