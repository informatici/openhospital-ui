import { useAppDispatch } from "libraries/hooks/redux";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { getAgeTypes } from "state/types/ageTypes";
import { setTypeMode } from "../../../../../../state/types/config";
import Button from "../../../../button/Button";
import AgeTypesTable from "./ageTypesTable";
import "./styles.scss";

const AgeTypes = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAgeTypes());
    dispatch(setTypeMode("manage"));
  }, [dispatch]);

  const { t } = useTranslation();

  return (
    <>
      <h3 data-cy="sub-activity-title">{t("ageTypes.title")}</h3>

      <div className="ageTypes" data-cy="age-types-table">
        <AgeTypesTable
          headerActions={
            <Button
              onClick={() => {
                navigate("./edit");
              }}
              type="button"
              variant="contained"
              color="primary"
              dataCy="edit-age-types"
            >
              {t("ageTypes.editAgeTypes")}
            </Button>
          }
        />
      </div>
    </>
  );
};

export default AgeTypes;
