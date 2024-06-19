import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { getAgeTypes } from "../../../../../../state/types/ages/actions";
import { AgeTypeDTO } from "../../../../../../generated";
import { PATHS } from "../../../../../../consts";
import "./styles.scss";
import { setTypeMode } from "../../../../../../state/types/config";
import AgeTypesTable from "./ageTypesTable/AgeTypesTable";

const AgeTypes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAgeTypes());
    dispatch(setTypeMode("manage"));
  }, [dispatch]);

  const handleEdit = (row: AgeTypeDTO) => {
    navigate(PATHS.admin_deliveries_types_edit.replace(":code", row.code!), {
      state: row,
    });
  };

  const { t } = useTranslation();
  return (
    <>
      <h3>{t("ageTypes.title")}</h3>

      <div className="ageTypes">
        <AgeTypesTable onEdit={handleEdit} />
      </div>
    </>
  );
};

export default AgeTypes;
