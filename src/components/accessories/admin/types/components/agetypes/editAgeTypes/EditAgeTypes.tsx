import { CircularProgress } from "@mui/material";
import InfoBox from "components/accessories/infoBox/InfoBox";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getAgeTypes, updateAgeTypes } from "state/types/ageTypes";
import { setTypeMode } from "state/types/config";
import { AgeTypeDTO } from "../../../../../../../generated";
import AgeTypesForm from "../ageTypesForm/AgeTypesForm";
import { getInitialFields } from "../ageTypesForm/consts";
import "./styles.scss";

export const EditAgeTypes = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const update = useAppSelector((state) => state.types.ageTypes.update);
  const ageTypesState = useAppSelector((state) => state.types.ageTypes.getAll);
  const mode = useAppSelector((state) => state.types.config.mode);

  const handleSubmit = (ageTypes: AgeTypeDTO[]) => {
    const raws = ageTypesState.data;

    const payload = ageTypes.map((ageType) => {
      const raw = raws?.find((item) => item.code === ageType.code);
      ageType.lock = raw?.lock ?? 0;
      return ageType;
    });

    dispatch(updateAgeTypes(payload));
  };

  useEffect(() => {
    dispatch(getAgeTypes());
  }, [dispatch]);

  useEffect(() => {
    if (mode !== "edit") {
      dispatch(setTypeMode("edit"));
    }
  }, [mode, dispatch]);

  return (
    <div className="editAgeTypes">
      <h3 data-cy="sub-activity-title" className="title">
        {t("ageTypes.editAgeTypes")}
      </h3>
      {ageTypesState.isLoading && <CircularProgress className="loader" />}
      {ageTypesState.hasFailed && (
        <div className="fullWidth">
          <InfoBox
            type="error"
            message={ageTypesState.error?.error || ageTypesState.error?.message}
          />
        </div>
      )}
      {ageTypesState.hasSucceeded && !!ageTypesState.data && (
        <AgeTypesForm
          onSubmit={handleSubmit}
          isLoading={!!update.isLoading}
          resetButtonLabel={t("common.cancel")}
          submitButtonLabel={t("ageTypes.updateAgeType")}
          rows={getInitialFields(ageTypesState.data ?? [])}
        />
      )}
    </div>
  );
};
