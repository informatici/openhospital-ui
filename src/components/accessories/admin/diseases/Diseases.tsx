import { ToggleButton, ToggleButtonGroup } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import { isEmpty } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { PATHS } from "../../../../consts";
import { DiseaseDTO } from "../../../../generated";
import { getAllDiseases } from "../../../../state/diseases";
import { getDiseaseTypes } from "../../../../state/types/diseases";
import Button from "../../button/Button";
import classes from "./Diseases.module.scss";
import DiseaseTable from "./diseaseTable";

export const Diseases = () => {
  const [view, setView] = useState<"enabled" | "disabled" | "all">("all");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const showFilter = useAppSelector(
    (state) =>
      (state.diseases.allDiseases.data?.filter(
        (item) => !(item.opdInclude || item.ipdOutInclude || item.opdInclude)
      )?.length ?? 0) > 0
  );

  useEffect(() => {
    dispatch(getAllDiseases());
    dispatch(getDiseaseTypes());
  }, [dispatch]);

  const handleEdit = (row: DiseaseDTO) => {
    navigate(PATHS.admin_diseases_edit.replace(":id", row.code!), {
      state: row,
    });
  };

  const handleViewChange = useCallback(
    (event: any, value: any) => {
      if (!isEmpty(value)) {
        setView(value);
      }
    },
    [view]
  );

  const predicate = useCallback(
    (disease: DiseaseDTO) => {
      const enabled =
        disease.ipdInInclude || disease.ipdOutInclude || disease.opdInclude;
      switch (view) {
        case "enabled":
          return enabled;
        case "disabled":
          return !enabled;
        default:
          return true;
      }
    },
    [view]
  );

  return (
    <div className={classes.diseases} data-cy="diseases-table">
      <DiseaseTable
        onEdit={handleEdit}
        filterPredicate={predicate}
        headerActions={
          showFilter ? (
            <div className={classes.header}>
              <ToggleButtonGroup
                className={classes.options}
                value={view}
                exclusive
                onChange={handleViewChange}
              >
                {["enabled", "disabled", "all"].map((value) => (
                  <ToggleButton key={value} value={value} data-cy={value}>
                    <span>{t(`disease.${value}`)}</span>
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
              <Button
                onClick={() => {
                  navigate(PATHS.admin_diseases_new);
                }}
                dataCy="add-new-disease"
                type="button"
                variant="contained"
                color="primary"
              >
                {t("disease.addDisease")}
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => {
                navigate(PATHS.admin_diseases_new);
              }}
              dataCy="add-new-disease"
              type="button"
              variant="contained"
              color="primary"
            >
              {t("disease.addDisease")}
            </Button>
          )
        }
      />
    </div>
  );
};
