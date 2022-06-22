import { Button, CircularProgress } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import React, { FC, Fragment, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { IState } from "../../../types";
import InfoBox from "../infoBox/InfoBox";
import { initialFilterFields } from "./consts";
import { OpdFilterForm } from "./filter/OpdFilterForm";
import "./styles.scss";
import { OpdTable } from "./table/OpdTable";
import { getDiseasesOpd } from "../../../state/diseases/actions";
import { getDiseaseTypes } from "../../../state/diseaseTypes/actions";
import { useEffect } from "react";
import {
  getOpds,
  getOpdsReset,
  searchOpds,
  searchOpdsReset,
} from "../../../state/opds/actions";
import isEmpty from "lodash.isempty";
import { TFilterValues } from "../billTable/types";

export const Opds: FC = () => {
  const fields = initialFilterFields;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  const [filter, setFilter] = useState({} as TFilterValues);

  const data = useSelector((state: IState) => state.opds.searchOpds.data);

  useEffect(() => {
    dispatch(searchOpds(filter));
  }, [filter]);

  const onSubmit = (values: TFilterValues) => {
    setFilter(values);
  };

  const errorMessage = useSelector(
    (state: IState) => state.opds.searchOpds.error
  );
  let status = useSelector((state: IState) => state.opds.searchOpds.status);

  useEffect(() => {
    dispatch(searchOpds(fields));
    dispatch(getDiseasesOpd());
    dispatch(getDiseaseTypes());
  }, []);

  return (
    <Fragment>
      <div className="opd_opds">
        <div className="opd__header">
          <div className="opd__title">{t("nav.visits")}</div>
          <div className="opd__actions">
            <Button
              onClick={() => history.push("/search")}
              type="button"
              variant="contained"
            >
              <Add fontSize="small" />
              <span className="new__button__label">{t("opd.newopd")}</span>
            </Button>
          </div>
        </div>

        {(() => {
          switch (status) {
            case "FAIL":
              return <InfoBox type="error" message={errorMessage} />;

            case "LOADING":
              return (
                <CircularProgress
                  style={{ marginLeft: "50%", position: "relative" }}
                />
              );

            case "SUCCESS_EMPTY":
              return <InfoBox type="warning" message={t("common.emptydata")} />;

            case "SUCCESS":
              return (
                <>
                  <OpdFilterForm onSubmit={onSubmit} fields={fields} />
                  <OpdTable data={data ?? []} />
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
