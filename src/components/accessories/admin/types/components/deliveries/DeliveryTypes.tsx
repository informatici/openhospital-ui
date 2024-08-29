import { useAppDispatch } from "libraries/hooks/redux";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { PATHS } from "../../../../../../consts";
import { DeliveryTypeDTO } from "../../../../../../generated";
import { setTypeMode } from "../../../../../../state/types/config";
import {
  deleteDeliveryType,
  deleteDeliveryTypeReset,
  getDeliveryTypes,
} from "../../../../../../state/types/deliveries";
import Button from "../../../../button/Button";
import DeliveryTypesTable from "./deliveryTypesTable";
import "./styles.scss";

const DeliveryTypes = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getDeliveryTypes());
    dispatch(setTypeMode("manage"));

    return () => {
      dispatch(deleteDeliveryTypeReset());
    };
  }, [dispatch]);

  const handleEdit = (row: DeliveryTypeDTO) => {
    navigate(PATHS.admin_deliveries_types_edit.replace(":code", row.code!), {
      state: row,
    });
  };

  const handleDelete = (row: DeliveryTypeDTO) => {
    dispatch(deleteDeliveryType(row.code ?? ""));
  };

  const { t } = useTranslation();
  return (
    <>
      <h3 data-cy="sub-delivery-title">{t("deliveryTypes.title")}</h3>

      <div className="deliveryTypes" data-cy="delivery-types-table">
        <DeliveryTypesTable
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
              dataCy="add-delivery-type"
            >
              {t("deliveryTypes.addDeliveryType")}
            </Button>
          }
        />
      </div>
    </>
  );
};

export default DeliveryTypes;
