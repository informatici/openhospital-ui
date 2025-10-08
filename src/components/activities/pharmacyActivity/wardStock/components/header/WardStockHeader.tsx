import { MedicalServices } from "@mui/icons-material";
import Button from "components/accessories/button/Button";
import { WardDTO } from "generated";
import { useAppSelector } from "libraries/hooks/redux";
import React, { useCallback, useEffect, useReducer } from "react";
import { useTranslation } from "react-i18next";
import { getInitialState, reducer, updateFilter } from "../../state";
import { TWardStockFIlter } from "../../types";
import "./styles.scss";

const types = ["outcoming", "incoming"] as const;
const actions = ["report", "excel"];

type WardStockHeaderProps = {
  onFilterChange?: (filter: TWardStockFIlter) => void;
};

export function WardStockHeader({ onFilterChange }: WardStockHeaderProps) {
  const { t } = useTranslation();

  const wards = useAppSelector(
    (state) => state.wards.allWards.data?.filter((ward) => ward.pharmacy) ?? []
  );

  const [state, dispatch] = useReducer(reducer, getInitialState());

  const handleWardSelection = useCallback(
    (ward: WardDTO) => () => {
      dispatch(updateFilter({ ...state.filter, ward }));
    },
    [dispatch, state.filter]
  );

  const handleTypeSelection = useCallback(
    (type: "outcoming" | "incoming") => () => {
      dispatch(
        updateFilter({
          ...state.filter,
          type: state.filter.type === type ? undefined : type,
        })
      );
    },
    [dispatch, state.filter]
  );

  const handleToggleDrugs = useCallback(() => {
    dispatch(updateFilter({ ...state.filter, drugs: !state.filter.drugs }));
  }, [dispatch, state.filter]);

  useEffect(() => {
    if (!state.filter.ward && wards.length) {
      dispatch(updateFilter({ ...state.filter, ward: wards[0] }));
    }
  }, [wards, state.filter, dispatch]);

  useEffect(() => {
    onFilterChange?.(state.filter);
  }, [state.filter, onFilterChange]);

  return (
    <div className="ward-stock-header">
      <div className="ward-stock-wards">
        {wards.map((ward) => (
          <Button
            key={ward.code}
            color={
              state.filter.ward?.code === ward.code ? "primary" : "inherit"
            }
            variant={"contained"}
            className="cta-button"
            onClick={handleWardSelection(ward)}
          >
            <MedicalServices />
            {ward.description}
          </Button>
        ))}
      </div>
      <div className="divider"></div>
      {state.filter.ward && (
        <span className="subtitle">{state.filter.ward.description}</span>
      )}
      <div className="ward-stock-actions">
        {types.map((type) => (
          <Button
            key={type}
            className={`${type}-button`}
            dataCy={type}
            type="button"
            color={state.filter.type === type ? "primary" : "inherit"}
            variant={state.filter.type === type ? "contained" : "outlined"}
            onClick={handleTypeSelection(type)}
          >
            {t(`pharmacy.stock.actions.${type}`)}
          </Button>
        ))}
        <Button
          className={`drugs-button`}
          dataCy={"drugs"}
          type="button"
          color={state.filter.drugs ? "primary" : "inherit"}
          variant={state.filter.drugs ? "contained" : "outlined"}
          onClick={handleToggleDrugs}
        >
          {t("pharmacy.stock.actions.drugs")}
        </Button>
        <div className="separator"></div>
        {actions.map((action) => (
          <Button
            key={action}
            className={`${action}-button`}
            dataCy={action}
            type="button"
            variant={"outlined"}
            color="inherit"
          >
            {t(`pharmacy.stock.actions.${action}`)}
          </Button>
        ))}
      </div>
    </div>
  );
}
