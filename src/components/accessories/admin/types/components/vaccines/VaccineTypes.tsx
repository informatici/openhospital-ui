import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import {
  deleteVaccineType,
  getVaccineTypes,
} from "../../../../../../state/vaccineTypes/actions";
import { VaccineTypeDTO } from "../../../../../../generated";
import { PATHS } from "../../../../../../consts";
import VaccineTypesTable from "./vaccineTypesTable";
import Button from "../../../../button/Button";

const VaccineTypes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVaccineTypes());
  }, [dispatch]);

  const handleEdit = (row: VaccineTypeDTO) => {
    navigate(PATHS.vaccinesTypes_edit.replace(":code", row.code!), {
      state: row,
    });
  };

  const handleDelete = (row: VaccineTypeDTO) => {
    dispatch(deleteVaccineType(row.code ?? ""));
  };

  const { t } = useTranslation();
  return (
    <>
      <h3>{t("vaccineTypes.title")}</h3>

      <div style={{ marginTop: "50px" }}>
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
