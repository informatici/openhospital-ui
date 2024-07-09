import React, { useEffect } from "react";
import classes from "./Diseases.module.scss";
import { useDispatch } from "react-redux";
import { DiseaseDTO } from "../../../../generated";
import DiseaseTable from "./diseaseTable";
import { useNavigate } from "react-router";
import { PATHS } from "../../../../consts";
import { getAllDiseases } from "../../../../state/diseases/actions";
import Button from "../../button/Button";
import { useTranslation } from "react-i18next";
import { getDiseaseTypes } from "../../../../state/types/diseases";

export const Diseases = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getAllDiseases());
    dispatch(getDiseaseTypes());
  }, [dispatch]);

  const handleEdit = (row: DiseaseDTO) => {
    navigate(PATHS.admin_diseases_edit.replace(":id", row.code!), {
      state: row,
    });
  };

  return (
    <div className={classes.diseases} data-cy="diseases-table">
      <DiseaseTable
        onEdit={handleEdit}
        headerActions={
          <Button
            onClick={() => {
              navigate(PATHS.admin_diseases_new);
            }}
            dataCy="add-new-disease"
            type="button"
            variant="contained"
            color="primary"
          >
            {t("disease.addDisease")}
          </Button>
        }
      />
    </div>
  );
};
