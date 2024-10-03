import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useParams } from "react-router";
import { PATHS } from "../../../../../consts";
import { SupplierDTO } from "../../../../../generated";
import { updateSupplier } from "../../../../../state/suppliers";
import SupplierForm from "../supplierForm/SupplierForm";
import { getInitialFields } from "../supplierForm/consts";

export const EditSupplier = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { state }: { state: SupplierDTO | undefined } = useLocation();
  const { id } = useParams();
  const update = useAppSelector((state) => state.suppliers.update);
  const navigate = useNavigate();

  const handleSubmit = (value: SupplierDTO) => {
    dispatch(updateSupplier(value));
  };

  useEffect(() => {
    if (state?.supId !== Number(id)) {
      navigate(PATHS.admin_suppliers);
    }
  }, [id, navigate, state]);

  return (
    <SupplierForm
      creationMode={false}
      onSubmit={handleSubmit}
      isLoading={!!update.isLoading}
      resetButtonLabel={t("common.cancel")}
      submitButtonLabel={t("supplier.updateSupplier")}
      fields={getInitialFields(state)}
    />
  );
};
