import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import {
  deletePregnantTreatmentType,
  deletePregnantTreatmentTypeReset,
  getPregnantTreatmentTypes,
} from "../../../../../../state/types/pregnantTreatment";
import { PregnantTreatmentTypeDTO } from "../../../../../../generated";
import { PATHS } from "../../../../../../consts";
import PregnantTreatmentTableType from "./pregnantTreatmentTableType";
import Button from "../../../../button/Button";
import "./styles.scss";
import { setTypeMode } from "../../../../../../state/types/config";

const PregnantTreatmentType = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPregnantTreatmentTypes());
    dispatch(setTypeMode("manage"));

    return () => {
      dispatch(deletePregnantTreatmentTypeReset());
    };
  }, [dispatch]);

  const handleEdit = (row: PregnantTreatmentTypeDTO) => {
    navigate(
      PATHS.admin_pregnant_treatment_types_edit.replace(":code", row.code!),
      {
        state: row,
      }
    );
  };

  const handleDelete = (row: PregnantTreatmentTypeDTO) => {
    dispatch(deletePregnantTreatmentType(row.code ?? ""));
  };

  const { t } = useTranslation();
  return (
    <>
      <h3>{t("pregnantTreatmentTypes.title")}</h3>

      <div className="pregnantTreatmentTypes">
        <PregnantTreatmentTableType
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
              {t("pregnantTreatmentTypes.addPregnantTreatmentType")}
            </Button>
          }
        />
      </div>
    </>
  );
};

export default PregnantTreatmentType;
