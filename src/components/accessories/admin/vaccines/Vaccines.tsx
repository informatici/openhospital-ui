import React, { useEffect } from "react";

import VaccinesTable from "./vaccinesTable";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  deleteVaccine,
  deleteVaccineReset,
  getVaccines,
} from "../../../../state/vaccines";
import { getVaccineTypes } from "../../../../state/types/vaccines";
import { VaccineDTO } from "../../../../generated";
import { PATHS } from "../../../../consts";
import Button from "../../button/Button";

export const Vaccines = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getVaccines());
    dispatch(getVaccineTypes());

    return () => {
      dispatch(deleteVaccineReset());
    };
  }, [dispatch]);

  const handleEdit = (row: VaccineDTO) => {
    navigate(PATHS.admin_vaccines_edit.replace(":code", row.code!), {
      state: row,
    });
  };

  const handleDelete = (row: VaccineDTO) => {
    dispatch(deleteVaccine(row.code ?? ""));
  };

  return (
    <div data-cy="vaccines-table">
      <VaccinesTable
        onEdit={handleEdit}
        onDelete={handleDelete}
        headerActions={
          <Button
            onClick={() => {
              navigate(PATHS.admin_vaccines_new);
            }}
            type="button"
            variant="contained"
            color="primary"
            dataCy="add-new-vaccine"
          >
            {t("vaccine.addVaccine")}
          </Button>
        }
      />
    </div>
  );
};
