import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "libraries/hooks/redux";
import { useNavigate } from "react-router";
import {
  deleteVaccineType,
  deleteVaccineTypeReset,
  getVaccineTypes,
} from "../../../../../../state/types/vaccines";
import { VaccineTypeDTO } from "../../../../../../generated";
import { PATHS } from "../../../../../../consts";
import VaccineTypesTable from "./vaccineTypesTable";
import Button from "../../../../button/Button";
import "./styles.scss";
import { setTypeMode } from "../../../../../../state/types/config";

const VaccineTypes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
