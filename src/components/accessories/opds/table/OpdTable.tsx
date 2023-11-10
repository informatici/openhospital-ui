import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { OpdDTO } from "../../../../generated";
import { CustomModal } from "../../customModal/CustomModal";
import SkeletonLoader from "../../skeletonLoader/SkeletonLoader";
import Table from "../../table/Table";
import { IOpdTableProps } from "./types";
import "./styles.scss";
import { renderDate } from "../../../../libraries/formatUtils/dataFormatting";

export const OpdTable: FC<IOpdTableProps> = ({ data }) => {
  const { t } = useTranslation();
  const header = [
    "id",
    "date",
    "ward",
    "patientCode",
    "patientName",
    "sex",
    "age",
    "disease",
    "newPatient",
  ];
  const dateFields = ["date"];
  const label = {
    id: t("opd.code"),
    date: t("opd.date"),
    patientCode: t("opd.patientcode"),
    patientName: t("opd.patient"),
    sex: t("opd.sex"),
    newPatient: t("opd.status"),
    diseaseType: t("opd.diseasetype"),
    disease: t("opd.disease"),
    disease2: t("opd.disease2"),
    disease3: t("opd.disease3"),
    note: t("opd.note"),
    referralFrom: t("opd.referralfrom"),
    referralTo: t("opd.referralto"),
    nextVisitDate: t("opd.nextvisitdate"),
    age: t("opd.age"),
    ward: t("opd.ward"),
  };
  const order = [
    "id",
    "date",
    "ward",
    "patientCode",
    "patientName",
    "age",
    "disease",
  ];
  const [opd, setOpd] = useState({} as OpdDTO);

  const formatDataToDisplay = (data: OpdDTO[]) => {
    let results: any = [];
    if (data)
      results = data.map((e) => {
        return {
          id: e.code ?? "",
          date: renderDate(e.date ?? ""),
          nextVisitDate: renderDate(e.nextVisitDate ?? ""),
          patientCode: e.patientCode ?? "",
          patientName: e.patientName ?? "",
          sex: e.sex ?? "",
          age: e.age?.toString() ?? "",
          disease: e.disease?.description ?? "",
          disease2: e.disease2?.description ?? "",
          disease3: e.disease3?.description ?? "",
          referralFrom: e.referralFrom ?? "",
          referralTo: e.referralTo ?? "",
          ward: e.ward?.description ?? "",
          newPatient:
            e.newPatient === "R"
              ? t("opd.reattendance")
              : t("opd.newattendance"),
          note: e.note ?? "",
        };
      });
    return results;
  };

  const formattedData: any[] = formatDataToDisplay(data);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="opds__table">
      <Table
        rowData={formattedData}
        dateFields={dateFields}
        tableHeader={header}
        labelData={label}
        columnsOrder={order}
        rowsPerPage={5}
        detailColSpan={10}
        isCollapsabile={true}
      />
      <CustomModal
        open={open}
        onClose={handleClose}
        title={t("opd.details")}
        description={t("opd.details")}
        content={<SkeletonLoader />}
      />
    </div>
  );
};
