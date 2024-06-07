import React from "react";

import SuppliersTable from "./suppliersTable";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { SupplierDTO } from "../../../../generated";
import { PATHS } from "../../../../consts";
import Button from "../../button/Button";

export const Suppliers = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleEdit = (row: SupplierDTO) => {
    navigate(PATHS.admin_suppliers_edit.replace(":id", `${row.supId}`), {
      state: row,
    });
  };

  return (
    <SuppliersTable
      onEdit={handleEdit}
      headerActions={
        <Button
          onClick={() => {
            navigate(PATHS.admin_suppliers_new);
          }}
          type="button"
          variant="contained"
          color="primary"
        >
          {t("supplier.addSupplier")}
        </Button>
      }
    />
  );
};
