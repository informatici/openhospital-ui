import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "libraries/hooks/redux";
import { useNavigate } from "react-router";
import {
  deleteDeliveryResultType,
  deleteDeliveryResultTypeReset,
  getDeliveryResultTypes,
} from "../../../../../../state/types/deliveryResults";
import { PATHS } from "../../../../../../consts";
import Button from "../../../../button/Button";
import "./styles.scss";
import { setTypeMode } from "../../../../../../state/types/config";
import DeliveryResultTypeTable from "./deliveryResultTypeTable";
import { DeliveryResultTypeDTO } from "../../../../../../generated";

const DelevyResultType = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDeliveryResultTypes());
    dispatch(setTypeMode("manage"));

    return () => {
      dispatch(deleteDeliveryResultTypeReset());
    };
  }, [dispatch]);

  const handleEdit = (row: DeliveryResultTypeDTO) => {
    navigate(
      PATHS.admin_delivery_result_types_edit.replace(":code", row.code!),
      {
        state: row,
      }
    );
  };

  const handleDelete = (row: DeliveryResultTypeDTO) => {
    dispatch(deleteDeliveryResultType(row.code ?? ""));
  };

  const { t } = useTranslation();
  return (
    <>
      <h3>{t("deliveryResultType.title")}</h3>

      <div className="deliveryResultTypes">
        <DeliveryResultTypeTable
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
              {t("deliveryResultType.addDeliveryResultType")}
            </Button>
          }
        />
      </div>
    </>
  );
};

export default DelevyResultType;
