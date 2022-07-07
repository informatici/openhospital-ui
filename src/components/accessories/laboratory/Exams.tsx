import { Button, CircularProgress } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import React, { FC, Fragment, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { IState } from "../../../types";
import InfoBox from "../infoBox/InfoBox";
import { initialFilterFields } from "./consts";
import { ExamFilterForm } from "./filter/ExamFilterForm";
import "./styles.scss";
import { ExamTable } from "./table/ExamTable";
import { getDiseaseTypes } from "../../../state/diseaseTypes/actions";
import { useEffect } from "react";
import { TFilterValues } from "../billTable/types";
import { getFromFields } from "../../../libraries/formDataHandling/functions";
import {
  getLabsByPatientId,
  searchLabs,
} from "../../../state/laboratories/actions";
import { getExams } from "../../../state/exams/actions";

export const Exams: FC = () => {
  const fields = initialFilterFields;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  const [filter, setFilter] = useState({} as TFilterValues);

  const data = useSelector(
    (state: IState) => state.laboratories.searchLabs.data
  );

  useEffect(() => {
    dispatch(searchLabs(filter));
  }, [filter]);

  const onSubmit = (values: TFilterValues) => {
    setFilter(values);
  };

  const errorMessage = useSelector(
    (state: IState) => state.laboratories.searchLabs.error?.message
  );
  let status = useSelector(
    (state: IState) => state.laboratories.searchLabs.status
  );

  useEffect(() => {
    dispatch(searchLabs(getFromFields(fields, "value")));
    dispatch(getExams());
  }, []);

  return (
    <Fragment>
      <div className="lab_labs">
        <div className="lab__header">
          <div className="lab__title">{t("nav.laboratory")}</div>
          <div className="lab__actions">
            <Button
              onClick={() => history.push("/new")}
              type="button"
              variant="contained"
            >
              <Add fontSize="small" />
              <span className="new__button__label">{t("lab.newlab")}</span>
            </Button>
          </div>
        </div>

        {(() => {
          switch (status) {
            case "FAIL":
              return (
                <>
                  <ExamFilterForm onSubmit={onSubmit} fields={fields} />
                  <InfoBox type="error" message={errorMessage} />
                </>
              );

            case "LOADING":
              return (
                <CircularProgress
                  style={{ marginLeft: "50%", position: "relative" }}
                />
              );

            case "SUCCESS_EMPTY":
              return (
                <>
                  <ExamFilterForm onSubmit={onSubmit} fields={fields} />
                  <InfoBox type="warning" message={t("common.emptydata")} />
                </>
              );

            case "SUCCESS":
              return (
                <>
                  <ExamFilterForm onSubmit={onSubmit} fields={fields} />
                  <ExamTable data={data ?? []} />
                </>
              );
          }
        })()}
      </div>
    </Fragment>
  );
};
function usState(arg0: TFilterValues): [any, any] {
  throw new Error("Function not implemented.");
}
