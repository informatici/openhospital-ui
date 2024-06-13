import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import {
  deleteDiseaseType,
  deleteDiseaseTypeReset,
  getDiseaseTypes,
} from "../../../../../../state/types/diseases/actions";
import { DiseaseTypeDTO } from "../../../../../../generated";
import { PATHS } from "../../../../../../consts";
import DiseaseTypesTable from "./diseaseTypesTable";
import Button from "../../../../button/Button";
import "./styles.scss";
import { setTypeMode } from "../../../../../../state/types/config";

const DiseaseTypes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      <h3>{t("diseaseTypes.title")}</h3>

      <div className="diseaseTypes">
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
