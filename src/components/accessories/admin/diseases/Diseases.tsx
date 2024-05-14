import React, { useEffect } from "react";
import classes from "./Diseases.module.scss";
import { useDispatch } from "react-redux";
import { DiseaseDTO } from "../../../../generated";
import DiseaseTable from "./diseaseTable";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { PATHS } from "../../../../consts";
import { getAllDiseases } from "../../../../state/diseases/actions";

export const Diseases = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getAllDiseases());
  }, [dispatch]);

  const handleEdit = (row: DiseaseDTO) => {
    navigate(PATHS.diseases_edit.replace("#id", row.code!), { state: row });
  };

  return (
    <div className={classes.diseases}>
      <div className={classes.actions}></div>
      <DiseaseTable onEdit={handleEdit} />
    </div>
  );
};
