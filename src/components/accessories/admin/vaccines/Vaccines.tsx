import React, { useEffect } from "react";

import { useAppDispatch } from "libraries/hooks/redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { PATHS } from "../../../../consts";
import { VaccineDTO } from "../../../../generated";
import { getVaccineTypes } from "../../../../state/types/vaccines";
import {
  deleteVaccine,
  deleteVaccineReset,
  getVaccines,
} from "../../../../state/vaccines";
import Button from "../../button/Button";
import VaccinesTable from "./vaccinesTable";

export const Vaccines = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
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
