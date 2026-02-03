import { useAppDispatch } from "libraries/hooks/redux";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { PATHS } from "../../../../../../consts";
import { PregnantTreatmentTypeDTO } from "../../../../../../generated";
import { setTypeMode } from "../../../../../../state/types/config";
import {
  deletePregnantTreatmentType,
  deletePregnantTreatmentTypeReset,
  getPregnantTreatmentTypes,
} from "../../../../../../state/types/pregnantTreatment";
import Button from "../../../../button/Button";
import PregnantTreatmentTableType from "./pregnantTreatmentTableType";
import "./styles.scss";

const PregnantTreatmentType = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
      <h3 data-cy="sub-activity-title">{t("pregnantTreatmentTypes.title")}</h3>

      <div
        className="pregnantTreatmentTypes"
        data-cy="pregnanttreatment-types-table"
      >
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
              dataCy="add-pregnanttreatment-type"
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
