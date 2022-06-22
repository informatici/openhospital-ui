import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { OpdDTO } from "../../../../generated";
import { CustomModal } from "../../customModal/CustomModal";
import SkeletonLoader from "../../skeletonLoader/SkeletonLoader";
import Table from "../../table/Table";
import { IOpdTableProps } from "./types";
import "./styles.scss";
import { renderDate } from "../../../../libraries/formatUtils/dataFormatting";

export const OpdTable: FC<IOpdTableProps> = ({ data }) => {
  const { t } = useTranslation();
  const header = ["id", "visitDate", "patientCode", "disease"];
  const dateFields = ["visitDate"];
  const label = {
    id: t("opd.code"),
    visitDate: t("opd.date"),
    patientCode: t("opd.patientcode"),
    newPatient: t("opd.newpatient"),
    diseaseType: t("opd.diseasetype"),
    disease: t("opd.disease"),
    disease2: t("opd.disease2"),
    disease3: t("opd.disease3"),
    note: t("opd.note"),
    referralFrom: t("opd.referralfrom"),
    referralTo: t("opd.referralto"),
    nextVisitDate: t("opd.nextvisitdate"),
    age: t("opd.age"),
  };
  const order = ["date", "patientCode", "patient", "disease"];
  const [opd, setOpd] = useState({} as OpdDTO);
  const history = useHistory();

  const formatDataToDisplay = (data: OpdDTO[]) => {
    let results: any = [];
    if (data)
      results = data.map((e) => {
        return {
          id: e.code ?? "",
          visitDate: renderDate(e.visitDate ?? ""),
          nextVisitDate: renderDate(e.nextVisitDate ?? ""),
          patientCode: e.patientCode ?? "",
          patient: "",
          disease: e.disease?.description ?? "",
          disease2: e.disease2?.description ?? "",
          disease3: e.disease3?.description ?? "",
          referralFrom: e.referralFrom ?? "",
          referralTo: e.referralTo ?? "",
          newPatient:
            e.newPatient === "R"
              ? t("opd.reattendance")
              : t("opd.newadmittance"),
          note: e.note ?? "",
        };
      });
    return results;
  };

  const formattedData: any[] = formatDataToDisplay(data);

  const [open, setOpen] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleView = (row: any) => {
    const opdToEdit = data.find((item) => item?.code === row.code) ?? {};
    setOpd(opdToEdit);
    handleOpen();
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
        isCollapsabile={true}
        onView={handleView}
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
