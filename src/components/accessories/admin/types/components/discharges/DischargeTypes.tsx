import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "libraries/hooks/redux";
import { useNavigate } from "react-router";
import {
  deleteDischargeType,
  deleteDischargeTypeReset,
  getDischargeTypes,
} from "../../../../../../state/types/discharges";
import { DischargeTypeDTO } from "../../../../../../generated";
import { PATHS } from "../../../../../../consts";
import DischargeTypesTable from "./dischargeTypesTable";
import Button from "../../../../button/Button";
import "./styles.scss";
import { setTypeMode } from "../../../../../../state/types/config";

const DischargeTypes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDischargeTypes());
    dispatch(setTypeMode("manage"));

    return () => {
      dispatch(deleteDischargeTypeReset());
    };
  }, [dispatch]);

  const handleEdit = (row: DischargeTypeDTO) => {
    navigate(PATHS.admin_discharges_types_edit.replace(":code", row.code!), {
      state: row,
    });
  };

  const handleDelete = (row: DischargeTypeDTO) => {
    dispatch(deleteDischargeType(row.code ?? ""));
  };

  const { t } = useTranslation();
  return (
    <>
      <h3 data-cy="sub-discharge-title">{t("dischargeTypes.title")}</h3>

      <div className="dischargeTypes" data-cy="discharge-types-table">
        <DischargeTypesTable
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
              dataCy="add-discharge-type"
            >
              {t("dischargeTypes.addDischargeType")}
            </Button>
          }
        />
      </div>
    </>
  );
};

export default DischargeTypes;
