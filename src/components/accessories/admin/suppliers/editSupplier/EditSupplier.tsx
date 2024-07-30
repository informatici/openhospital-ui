import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { SupplierDTO } from "../../../../../generated";
import { ApiResponse } from "../../../../../state/types";
import { IState } from "../../../../../types";
import { useLocation, useNavigate, useParams } from "react-router";
import { PATHS } from "../../../../../consts";
import SupplierForm from "../supplierForm/SupplierForm";
import { getInitialFields } from "../supplierForm/consts";
import { updateSupplier } from "../../../../../state/suppliers";

export const EditSupplier = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { state }: { state: SupplierDTO | undefined } = useLocation();
  const { id } = useParams();
  const update = useSelector<IState, ApiResponse<SupplierDTO>>(
    (state) => state.suppliers.update
  );
  const navigate = useNavigate();

  const handleSubmit = (value: SupplierDTO) => {
    dispatch(updateSupplier(value));
  };

  useEffect(() => {
    if (state?.supId !== Number(id)) {
      navigate(PATHS.admin_suppliers);
    }
  }, [id, state]);

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
