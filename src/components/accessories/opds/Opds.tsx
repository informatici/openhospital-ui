import { Button, CircularProgress } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import React, { FC, Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import InfoBox from "../infoBox/InfoBox";
import { initialFilterFields } from "./consts";
import { OpdFilterForm } from "./filter/OpdFilterForm";
import "./styles.scss";
import { OpdTable } from "./table/OpdTable";
import { getDiseasesOpd } from "../../../state/diseases/actions";
import { getDiseaseTypes } from "../../../state/diseaseTypes/actions";
import { useEffect } from "react";
import { searchOpds } from "../../../state/opds/actions";
import { getFromFields } from "../../../libraries/formDataHandling/functions";
import { Permission } from "../../../libraries/permissionUtils/Permission";
import { useOpds } from "../../../libraries/hooks/api/useOpds";
import { TFilterValues } from "./filter/types";
import Pagination from "../pagination/Pagination";
import { getWards } from "../../../state/ward/actions";

export const Opds: FC = () => {
  const fields = initialFilterFields;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [filter, setFilter] = useState({} as TFilterValues);

  const { data, status, error, page, pageInfo, handlePageChange } = useOpds();

  useEffect(() => {
    dispatch(searchOpds({ ...filter, paged: true }));
  }, [filter]);

  useEffect(() => {
    setFilter((previous) => ({ ...previous, page: page }));
  }, [page]);

  const onSubmit = (values: TFilterValues) => {
    setFilter({ ...values, page: 0, size: filter.size });
  };

  const onPageChange = (e: any, page: number) => handlePageChange(e, page - 1);

  const errorMessage = error || t("common.somethingwrong");

  useEffect(() => {
    dispatch(
      searchOpds({
        ...getFromFields(fields, "value"),
        page: 0,
        size: 80,
        paged: true,
      })
    );
    dispatch(getDiseasesOpd());
    dispatch(getDiseaseTypes());
    dispatch(getWards());
  }, []);

  return (
    <Fragment>
      <div className="opd_opds">
        <div className="opd__header">
          <div className="opd__title">{t("nav.visits")}</div>
        </div>
        {(() => {
          switch (status) {
            case "FAIL":
              return (
                <Permission require="opd.read">
                  <OpdFilterForm onSubmit={onSubmit} fields={fields} />
                  <InfoBox type="error" message={errorMessage} />
                </Permission>
              );

            case "LOADING":
              return (
                <CircularProgress
                  style={{ marginLeft: "50%", position: "relative" }}
                />
              );

            case "SUCCESS_EMPTY":
              return (
                <Permission require="opd.read">
                  <OpdFilterForm onSubmit={onSubmit} fields={fields} />
                  <InfoBox type="info" message={t("common.emptydata")} />
                </Permission>
              );

            case "SUCCESS":
              return (
                <Permission require="opd.read">
                  <OpdFilterForm onSubmit={onSubmit} fields={fields} />
                  <OpdTable data={data ?? []} />
                  <Pagination
                    page={(pageInfo?.page ?? 0) + 1}
                    count={pageInfo?.totalPages}
                    onChange={onPageChange}
                  />
                </Permission>
              );
          }
        })()}
      </div>
    </Fragment>
  );
};
