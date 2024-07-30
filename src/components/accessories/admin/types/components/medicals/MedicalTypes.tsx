import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "@/libraries/hooks/redux";
import { useNavigate } from "react-router";
import {
  deleteMedicalType,
  deleteMedicalTypeReset,
  getMedicalTypes,
} from "../../../../../../state/types/medicals";
import { MedicalTypeDTO } from "../../../../../../generated";
import { PATHS } from "../../../../../../consts";
import Button from "../../../../button/Button";
import "./styles.scss";
import { setTypeMode } from "../../../../../../state/types/config";
import MedicalTypesTable from "./medicalTypesTable";

const MedicalTypes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMedicalTypes());
    dispatch(setTypeMode("manage"));

    return () => {
      dispatch(deleteMedicalTypeReset());
    };
  }, [dispatch]);

  const handleEdit = (row: MedicalTypeDTO) => {
    navigate(PATHS.admin_medicals_types_edit.replace(":code", row.code!), {
      state: row,
    });
  };

  const handleDelete = (row: MedicalTypeDTO) => {
    dispatch(deleteMedicalType(row.code ?? ""));
  };

  const { t } = useTranslation();
  return (
    <>
      <h3 data-cy="sub-medical-title">{t("medicalTypes.title")}</h3>

      <div className="medicalTypes" data-cy="medical-types-table">
        <MedicalTypesTable
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
              dataCy="add-medical-type"
            >
              {t("medicalTypes.addMedicalType")}
            </Button>
          }
        />
      </div>
    </>
  );
};

export default MedicalTypes;
