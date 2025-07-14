import { ChevronRight } from "@mui/icons-material";
import { Button, CircularProgress } from "@mui/material";
import InfoBox from "components/accessories/infoBox/InfoBox";
import Table from "components/accessories/table/Table";
import { TFilterField } from "components/accessories/table/filter/types";
import { StudyResponse } from "generated";
import { parseNumericDate } from "libraries/formatUtils/parseNumericDate";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import { useTimeAgo } from "libraries/hooks/useTimeAgo";
import { isEmpty } from "lodash";
import moment from "moment";
import React, { useCallback, useEffect, useMemo } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { getPatientStudies, getPatientStudiesReset } from "state/radiology";
import "./styles.scss";

export const Studies = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const { timeAgo } = useTimeAgo();

  const navigate = useNavigate();

  const patient = useAppSelector(
    (state) => state.patients.selectedPatient.data
  );

  const studiesState = useAppSelector((state) => state.radiology.studies);

  const header = ["title", "date", "series"];
  const dateFields = ["date"];

  const label = {
    title: t("radiology.studies.title"),
    date: t("radiology.studies.date"),
    series: t("radiology.studies.series"),
    lastUpdate: t("radiology.studies.lastUpdate"),
    referrencingPhysician: t("radiology.studies.referrencingPhysician"),
    institution: t("radiology.studies.institution"),
    time: t("radiology.studies.time"),
  };
  const order = ["date", "series"];

  const filters: TFilterField[] = [
    {
      key: "title",
      label: t("radiology.studies.title"),
      type: "text",
    },
    { key: "date", label: t("radiology.studies.date"), type: "date" },
    { key: "series", label: t("radiology.studies.series"), type: "number" },
  ];

  useEffect(() => {
    if (patient?.code) {
      dispatch(getPatientStudies(patient.code.toString()));
    }
  }, [dispatch, patient]);

  useEffect(() => {
    return () => {
      dispatch(getPatientStudiesReset());
    };
  }, [dispatch]);

  const lastStudyDate = useMemo(() => {
    const lastStudy = studiesState.data?.length
      ? studiesState.data?.reduce((acc, value) => {
          const accDate = acc.study?.date
            ? acc.study.time
              ? moment(acc.study.date + acc.study.time, "YYYYMMDDHHmmss")
              : moment(acc.study.date, "YYYYMMDD")
            : null;
          const valueDate = value.study?.date
            ? value.study.time
              ? moment(value.study.date + value.study.time, "YYYYMMDDHHmmss")
              : moment(value.study.date, "YYYYMMDD")
            : null;
          if (!accDate || !valueDate) {
            return valueDate ? value : acc;
          }
          return accDate.isAfter(valueDate) ? acc : value;
        }, studiesState.data![0])
      : null;
    return parseNumericDate(lastStudy?.study?.date ?? "");
  }, [studiesState.data]);

  const formatDataToDisplay = (data: StudyResponse[]) => {
    return data.map((study) => {
      return {
        id: study.id ?? "",
        title: isEmpty(study.study?.description)
          ? "--"
          : study.study?.description,
        date: study.study?.date
          ? moment(study.study.date, "YYYYMMDD")
              .locale(i18n.language)
              .format("L")
          : "",
        series: study.seriesIds?.length ?? 0,
        lastUpdate: study.lastUpdate
          ? moment(study.lastUpdate).locale(i18n.language).format("L")
          : "",
        time: study.study?.time
          ? moment(study.study?.time, "HHmmss")
              .locale(i18n.language)
              .format("LTS")
          : "",
        referringPhysician: study.study?.referringPhysicianName ?? "",
        institution: study.study?.institutionName ?? "",
      };
    });
  };

  const navigateToSeries = useCallback(
    (row: any) => () => {
      navigate(`./${row.id}/series`, { state: row });
    },
    [navigate]
  );

  return (
    <div className="studies">
      {(() => {
        switch (studiesState.status) {
          case "FAIL":
            return (
              <InfoBox
                type="error"
                message={t(
                  studiesState.error?.message ?? "common.somethingwrong"
                )}
              />
            );
          case "LOADING":
            return (
              <CircularProgress
                style={{ marginLeft: "50%", position: "relative" }}
              />
            );

          case "SUCCESS":
            return (
              <>
                <p className="studies__lastStudy">
                  <Trans
                    i18nKey="radiology.studies.summary"
                    defaults="There are no studies for this patient"
                    components={[<strong>value</strong>]}
                    values={{ count: studiesState.data?.length ?? 0 }}
                  />
                </p>
                {lastStudyDate && (
                  <span className="studies__summary">
                    {t("radiology.studies.last", {
                      value: `${timeAgo.format(lastStudyDate)} | ${moment(
                        lastStudyDate
                      )
                        .locale(i18n.language)
                        .format("LL")}`,
                    })}
                  </span>
                )}
                <Table
                  rowData={formatDataToDisplay(studiesState.data ?? [])}
                  dateFields={dateFields}
                  tableHeader={header}
                  labelData={label}
                  columnsOrder={order}
                  rowsPerPage={5}
                  isCollapsabile={true}
                  renderCustomActions={(row) => (
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={navigateToSeries(row)}
                    >
                      <span>{t("radiology.studies.viewSeries")}</span>
                      <ChevronRight />
                    </Button>
                  )}
                  filterColumns={filters}
                  rawData={(studiesState.data ?? []).map((study) => ({
                    id: study.id ?? "",
                    title: study.study?.description ?? "",
                    date: study.study?.date
                      ? (study.study.time
                          ? moment(
                              study.study.date + study.study.time,
                              "YYYYMMDDHHmmss"
                            )
                          : moment(study.study.date, "YYYYMMDD")
                        ).toISOString()
                      : "",
                    series: study.seriesIds?.length ?? 0,
                  }))}
                  manualFilter={false}
                  rowKey="id"
                />
              </>
            );

          case "SUCCESS_EMPTY":
            return (
              <>
                <p className="studies__lastStudy">
                  <Trans
                    i18nKey="radiology.studies.summary"
                    defaults="There are no studies for this patient"
                    components={[<strong>value</strong>]}
                    values={{ count: studiesState.data?.length ?? 0 }}
                  />
                </p>
                <InfoBox type="info" message={t("common.emptydata")} />
              </>
            );

          default:
            return;
        }
      })()}
    </div>
  );
};
