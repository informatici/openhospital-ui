import { ChevronLeft, OpenInNew } from "@mui/icons-material";
import {
  Backdrop,
  Button,
  CircularProgress,
  IconButton,
  Tooltip,
} from "@mui/material";
import InfoBox from "components/accessories/infoBox/InfoBox";
import Table from "components/accessories/table/Table";
import { TFilterField } from "components/accessories/table/filter/types";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import { isEmpty } from "lodash";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useParams } from "react-router";
import {
  SeriesWithInstances,
  getInstancePreview,
  getInstancePreviewReset,
  getStudySeriesReset,
  getStudySeriesWithInstances,
  getStudySeriesWithInstancesReset,
} from "state/radiology";
import { useViewInOrthanc } from "../hooks";
import { Instances } from "./instances/Instances";
import { Preview } from "./preview/Preview";
import "./styles.scss";

export const Series = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams();

  const { state: study } = useLocation();

  const [openPreview, setOpenPreview] = useState(false);

  const seriesState = useAppSelector(
    (state) => state.radiology.seriesWithInstances
  );

  const previewState = useAppSelector((state) => state.radiology.preview);

  const header = ["title", "lastUpdate", "instances"];
  const dateFields = ["lastUpdate"];

  const label = {
    title: t("radiology.series.title"),
    status: t("radiology.series.status"),
    operators: t("radiology.series.operators"),
    instances: t("radiology.series.instances"),
    station: t("radiology.series.station"),
    expectedInstances: t("radiology.series.expectedInstances"),
    lastUpdate: t("radiology.series.lastUpdate"),
  };
  const order = ["lastUdate", "instances"];

  const filters: TFilterField[] = [
    {
      key: "title",
      label: t("radiology.series.title"),
      type: "text",
    },
    {
      key: "lastUpdate",
      label: t("radiology.series.lastUpdate"),
      type: "date",
    },
    { key: "instances", label: t("radiology.series.intances"), type: "number" },
  ];

  useEffect(() => {
    if (id) {
      dispatch(getStudySeriesWithInstances(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    return () => {
      dispatch(getStudySeriesWithInstancesReset());
    };
  }, [dispatch]);

  const formatDataToDisplay = (data: SeriesWithInstances[]) => {
    return data.map((series) => {
      return {
        id: series.id ?? "",
        title: isEmpty(series.series?.seriesDescription)
          ? "--"
          : series.series?.seriesDescription,
        instancesData: series.instances,
        instances: series.instancesIds?.length ?? 0,
        expectedInstances: series.expectedNumberOfInstances ?? "",
        lastUpdate: series.lastUpdate
          ? moment(series.lastUpdate).locale(i18n.language).format("L")
          : "",
        operators: series.series?.operatorsName ?? "",
        protocol: series.series?.protocolName ?? "",
        station: series.series?.stationName ?? "",
        status: series.status ?? "",
      };
    });
  };

  const navigateToStudies = useCallback(() => {
    navigate("..");
  }, [navigate]);

  useEffect(() => {
    return () => {
      getStudySeriesReset();
      if (previewState.status !== "IDLE") {
        getInstancePreviewReset();
      }
    };
  }, [dispatch]);

  const handlePreview = useCallback(
    (row: any) => () => {
      dispatch(getInstancePreview(row.id));
    },
    [dispatch]
  );

  const handleClosePreview = useCallback(() => {
    setOpenPreview(false);
    dispatch(getInstancePreviewReset());
  }, [dispatch, setOpenPreview]);

  useEffect(() => {
    if (previewState.hasSucceeded) {
      setOpenPreview(true);
    }
  }, [previewState.status, setOpenPreview]);

  const handleViewSeries = useViewInOrthanc("series");

  return (
    <div className="series">
      {(() => {
        switch (seriesState.status) {
          case "FAIL":
            return (
              <InfoBox
                type="error"
                message={t(
                  seriesState.error?.message ?? "common.somethingwrong"
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
                <Button
                  variant="text"
                  color="secondary"
                  onClick={navigateToStudies}
                >
                  <ChevronLeft /> {t("radiology.series.backToStudies")}
                </Button>
                {study?.title && (
                  <p className="series__studyTitle">
                    {study.title} {study.date && " | " + study.date}
                  </p>
                )}
                {previewState.hasFailed && (
                  <InfoBox
                    type="error"
                    message={t(
                      previewState.error?.message ?? "common.somethingwrong"
                    )}
                  />
                )}
                <Table
                  rowData={formatDataToDisplay(seriesState.data ?? [])}
                  dateFields={dateFields}
                  tableHeader={header}
                  labelData={label}
                  columnsOrder={order}
                  rowsPerPage={5}
                  isCollapsabile={true}
                  renderCustomActions={(row) => (
                    <div className="series__actions">
                      <Tooltip title={t("radiology.series.viewInOrthanc")}>
                        <IconButton onClick={handleViewSeries(row)}>
                          <OpenInNew />
                        </IconButton>
                      </Tooltip>
                    </div>
                  )}
                  filterColumns={filters}
                  rawData={(seriesState.data ?? []).map((series) => ({
                    id: series.id ?? "",
                    title: series.series?.seriesDescription ?? "",
                    lastUpdate: series.lastUpdate
                      ? moment(series.lastUpdate)?.toISOString()
                      : "",
                  }))}
                  manualFilter={false}
                  rowKey="id"
                  customRenderDetails={(row) => (
                    <Instances
                      onPreview={handlePreview}
                      data={row.instancesData}
                    />
                  )}
                />

                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={previewState.isLoading}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>
                <Preview open={openPreview} onClose={handleClosePreview} />
              </>
            );

          case "SUCCESS_EMPTY":
            return (
              <>
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
