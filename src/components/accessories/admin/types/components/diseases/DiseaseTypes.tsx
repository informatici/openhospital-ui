import { useAppDispatch } from "libraries/hooks/redux";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { PATHS } from "../../../../../../consts";
import { DiseaseTypeDTO } from "../../../../../../generated";
import { setTypeMode } from "../../../../../../state/types/config";
import {
  deleteDiseaseType,
  deleteDiseaseTypeReset,
  getDiseaseTypes,
} from "../../../../../../state/types/diseases";
import Button from "../../../../button/Button";
import DiseaseTypesTable from "./diseaseTypesTable";
import "./styles.scss";

const DiseaseTypes = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getDiseaseTypes());
    dispatch(setTypeMode("manage"));

    return () => {
      dispatch(deleteDiseaseTypeReset());
    };
  }, [dispatch]);

  const handleEdit = (row: DiseaseTypeDTO) => {
    navigate(PATHS.admin_diseases_types_edit.replace(":code", row.code!), {
      state: row,
    });
  };

  const handleDelete = (row: DiseaseTypeDTO) => {
    dispatch(deleteDiseaseType(row.code ?? ""));
  };

  const { t } = useTranslation();
  return (
    <>
      <h3 data-cy="sub-activity-title">{t("diseaseTypes.title")}</h3>

      <div className="diseaseTypes" data-cy="disease-types-table">
        <DiseaseTypesTable
          onEdit={handleEdit}
          onDelete={handleDelete}
          headerActions={
            <Button
              onClick={() => {
                navigate("./new");
              }}
              type="button"
              variant="contained"
              color="primary"
              dataCy="add-disease-type"
            >
              {t("diseaseTypes.addDiseaseType")}
            </Button>
          }
        />
      </div>
    </>
  );
};

export default DiseaseTypes;
