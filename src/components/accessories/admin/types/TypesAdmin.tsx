import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import AutocompleteField from "../../autocompleteField/AutocompleteField";
import "./styles.scss";
import { Outlet, useLocation, useNavigate } from "react-router";
import { PATHS } from "../../../../consts";
import { useSelector } from "react-redux";
import { IState } from "../../../../types";
import { TypeMode } from "../../../../state/types/config";

type TypeOption = {
  label: string;
  routePath: string | null;
};

const TypesAdmin = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const defaultTypeOption: TypeOption = { label: "", routePath: null };
  const [selectedOption, setSelectedOption] =
    useState<TypeOption>(defaultTypeOption);
  const mode = useSelector<IState, TypeMode>(
    (state) => state.types.config.mode
  );

  const typeOptions: TypeOption[] = [
    defaultTypeOption,
    { label: t("types.vaccines"), routePath: "vaccines" },
  ];

  useEffect(() => {
    if (
      location.pathname !== PATHS.admin_types_base &&
      location.pathname !== PATHS.admin_types_base + "/"
    ) {
      const typeFromUrl = typeOptions.find(
        (typeOption) =>
          typeOption.routePath !== null &&
          typeOption.routePath.includes(
            location.pathname.substring((PATHS.admin_types_base + "/").length)
          )
      );

      if (typeFromUrl) {
        setSelectedOption(typeFromUrl);
      } else {
        setSelectedOption(defaultTypeOption);
      }
    }
  }, [location]);

  const handleTypeChange = (e: any, type: TypeOption | null) => {
    if (type?.routePath) {
      navigate(PATHS.admin_types_base + "/" + type.routePath);
    } else {
      navigate(PATHS.admin_types_base);
    }
  };

  const renderOption = (option: TypeOption) => {
    return <span>{option.label}</span>;
  };

  return (
    <>
      {mode === "manage" && (
        <div className="selectTypeControl">
          <AutocompleteField
            fieldName="selectedType"
            fieldValue={selectedOption?.label}
            label={t("types.selectAType")}
            onChange={handleTypeChange}
            renderOption={renderOption}
            options={typeOptions}
            errorText={""}
            isValid={false}
            onBlur={() => {}}
          />
        </div>
      )}

      <div className="typeContent">
        <Outlet />
      </div>
    </>
  );
};

export default TypesAdmin;
