import React, { FunctionComponent } from "react";
import Table from "../../../table/Table";
import { useTranslation } from "react-i18next";
import InfoBox from "../../../infoBox/InfoBox";
import { CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../../../../types";
import { WardDTO } from "../../../../../generated";
import { usePermission } from "../../../../../libraries/permissionUtils/usePermission";
import { IApiResponse } from "../../../../../state/types";
import { CheckOutlined } from "@material-ui/icons";
import classes from "./WardTable.module.scss";

interface IOwnProps {
  onEdit: (row: any) => void;
}

export const WardTable: FunctionComponent<IOwnProps> = ({ onEdit }) => {
  const { t } = useTranslation();
  const canUpdate = usePermission("wards.update");

  const header = [
    "code",
    "description",
    "beds",
    "nurs",
    "docs",
    "opd",
    "pharmacy",
    "male",
    "female",
  ];

  const label = {
    code: t("ward.code"),
    description: t("ward.description"),
    opd: t("ward.opd"),
    male: t("ward.male"),
    female: t("ward.female"),
    pharmacy: t("ward.pharmacy"),
    beds: t("ward.beds"),
    nurs: t("ward.nurs"),
    docs: t("ward.docs"),
    email: t("ward.email"),
    telephone: t("ward.telephone"),
    fax: t("ward.fax"),
    visitDuration: t("ward.visitDuration"),
  };
  const order = [
    "code",
    "description",
    "beds",
    "nurs",
    "docs",
    "opd",
    "pharmacy",
    "male",
    "female",
  ];

  const dispatch = useDispatch();

  const { data, status, error } = useSelector<IState, IApiResponse<WardDTO[]>>(
    (state) => state.wards.allWards
  );

  const handleEdit = (row: WardDTO) => {
    onEdit((data ?? []).find((item) => item.code === row?.code));
  };

  const formatDataToDisplay = (data: WardDTO[]) => {
    return data.map((item) => {
      return {
        code: item.code ?? "",
        description: item.description ?? "",
        beds: item.beds ?? "",
        nurs: item.nurs ?? "",
        docs: item.docs ?? "",
        opd: item.opd ? <CheckOutlined fontSize="small" /> : "",
        male: item.male ? <CheckOutlined fontSize="small" /> : "",
        female: item.female ? <CheckOutlined fontSize="small" /> : "",
        pharmacy: item.pharmacy ? <CheckOutlined fontSize="small" /> : "",
        email: item.email ?? "",
        telephone: item.telephone ?? "",
        fax: item.fax ?? "",
        visitDuration: item.visitDuration ?? "",
      };
    });
  };

  return (
    <div className={classes.table}>
      {(() => {
        switch (status) {
          case "FAIL":
            return <InfoBox type="error" message={error?.message} />;
          case "LOADING":
            return (
              <CircularProgress
                style={{ marginLeft: "50%", position: "relative" }}
              />
            );

          case "SUCCESS":
            return (
              <Table
                rowData={formatDataToDisplay(data ?? [])}
                tableHeader={header}
                labelData={label}
                columnsOrder={order}
                rowsPerPage={2}
                isCollapsabile={true}
                onEdit={canUpdate ? handleEdit : undefined}
                initialOrderBy="disDate"
                showEmptyCell={false}
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
