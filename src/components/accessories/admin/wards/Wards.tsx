import React, { useEffect } from "react";
import classes from "./Wards.module.scss";
import { useDispatch } from "react-redux";
import { deleteWard, deleteWardReset, getWards } from "../../../../state/ward";
import { WardDTO } from "../../../../generated";
import WardTable from "./wardTable";
import Button from "../../button/Button";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { PATHS } from "../../../../consts";

export const Wards = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getWards());

    return () => {
      dispatch(deleteWardReset());
    };
  }, [dispatch]);

  const handleEdit = (row: WardDTO) => {
    navigate(PATHS.admin_wards_edit.replace(":id", row.code!), { state: row });
  };

  const handleDelete = (row: WardDTO) => {
    dispatch(deleteWard(row.code ?? ""));
  };

  return (
    <div className={classes.wards} data-cy="wards-table">
      <WardTable
        onEdit={handleEdit}
        onDelete={handleDelete}
        headerActions={
          <Button
            onClick={() => {
              navigate(PATHS.admin_wards_new);
            }}
            type="button"
            variant="contained"
            color="primary"
            dataCy="add-new-ward"
          >
            {t("ward.addWard")}
          </Button>
        }
      />
    </div>
  );
};
