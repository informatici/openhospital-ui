import { CircularProgress } from "@mui/material";
import React, { FC, Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import InfoBox from "../infoBox/InfoBox";
import { initialFilter, initialFilterFields } from "./consts";
import { OpdFilterForm } from "./filter/OpdFilterForm";
import "./styles.scss";
import { OpdTable } from "./table/OpdTable";
import { getDiseasesOpd } from "../../../state/diseases";
import { useEffect } from "react";
import { searchOpds } from "../../../state/opds";
import { Permission } from "../../../libraries/permissionUtils/Permission";
import { useOpds } from "../../../libraries/hooks/api/useOpds";
import { TFilterValues } from "./filter/types";
import Pagination from "../pagination/Pagination";
import { getWards } from "../../../state/ward";
import { getDiseaseTypes } from "../../../state/types/diseases";

export const Opds: FC = () => {
  const fields = initialFilterFields;
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [filter, setFilter] = useState(initialFilter as TFilterValues);

  const { data, status, error, page, pageInfo, handlePageChange } = useOpds();

  useEffect(() => {
    dispatch(searchOpds({ ...filter, paged: false }));
  }, [filter]);

  useEffect(() => {
    setFilter((previous) => ({ ...previous, page: page }));
  }, [page]);

  const onSubmit = (values: TFilterValues) => {
    setFilter({ ...values, page: 0, size: filter.size });
  };

  const handleResetFilter = () => {
    setFilter(initialFilter as TFilterValues);
  };

  const onPageChange = (e: any, page: number) => handlePageChange(e, page - 1);

  const errorMessage = error || t("common.somethingwrong");

  useEffect(() => {
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
                <Permission require="opds.read">
                  <OpdFilterForm
                    onSubmit={onSubmit}
                    fields={fields}
                    handleResetFilter={handleResetFilter}
                  />
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
                <Permission require="opds.read">
                  <OpdFilterForm
                    onSubmit={onSubmit}
                    fields={fields}
                    handleResetFilter={handleResetFilter}
                  />
                  <InfoBox type="info" message={t("common.emptydata")} />
                </Permission>
              );

            case "SUCCESS":
              return (
                <Permission require="opds.read">
                  <OpdFilterForm
                    onSubmit={onSubmit}
                    fields={fields}
                    handleResetFilter={handleResetFilter}
                  />
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
