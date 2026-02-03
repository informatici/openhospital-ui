import { useAppDispatch } from "libraries/hooks/redux";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { PATHS } from "../../../../../../consts";
import { VaccineTypeDTO } from "../../../../../../generated";
import { setTypeMode } from "../../../../../../state/types/config";
import {
  deleteVaccineType,
  deleteVaccineTypeReset,
  getVaccineTypes,
} from "../../../../../../state/types/vaccines";
import Button from "../../../../button/Button";
import "./styles.scss";
import VaccineTypesTable from "./vaccineTypesTable";

const VaccineTypes = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getVaccineTypes());
    dispatch(setTypeMode("manage"));

    return () => {
      dispatch(deleteVaccineTypeReset());
    };
  }, [dispatch]);

  const handleEdit = (row: VaccineTypeDTO) => {
    navigate(PATHS.admin_vaccines_types_edit.replace(":code", row.code!), {
      state: row,
    });
  };

  const handleDelete = (row: VaccineTypeDTO) => {
    dispatch(deleteVaccineType(row.code ?? ""));
  };

  const { t } = useTranslation();
  return (
    <>
      <h3 data-cy="sub-activity-title">{t("vaccineTypes.title")}</h3>

      <div className="vaccineTypes" data-cy="vaccine-types-table">
        <VaccineTypesTable
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
              dataCy="add-vaccine-type"
            >
              {t("vaccineTypes.addVaccineType")}
            </Button>
          }
        />
      </div>
    </>
  );
};

export default VaccineTypes;
