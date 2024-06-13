import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./styles.scss";
import { Outlet, useLocation, useNavigate } from "react-router";
import { PATHS } from "../../../../consts";
import { useSelector } from "react-redux";
import { IState } from "../../../../types";
import { TypeMode } from "../../../../state/types/config";
import SelectField from "../../selectField/SelectField";

type TypeOption = {
  label: string;
  value: string;
};

const TypesAdmin = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const defaultTypeOption: TypeOption = { label: "", value: "" };
  const [selectedOption, setSelectedOption] =
    useState<TypeOption>(defaultTypeOption);
  const mode = useSelector<IState, TypeMode>(
    (state) => state.types.config.mode
  );

  const typeOptions: TypeOption[] = [
    defaultTypeOption,
    { label: t("types.vaccines"), value: "vaccines" },
    { label: t("types.operations"), value: "operations" },
    { label: t("types.diseases"), value: "diseases" },
    { label: t("types.admissions"), value: "admissions" },
    { label: t("types.discharges"), value: "discharges" },
  ];

  useEffect(() => {
    if (
      location.pathname !== PATHS.admin_types_base &&
      location.pathname !== PATHS.admin_types_base + "/"
    ) {
      const typeFromUrl = typeOptions.find(
        (typeOption) =>
          typeOption.value !== null &&
          typeOption.value.includes(
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

  const handleTypeChange = (value: string) => {
    if (value?.length > 0) {
      navigate(PATHS.admin_types_base + "/" + value);
    } else {
      navigate(PATHS.admin_types_base);
    }
  };

  return (
    <>
      {mode === "manage" && (
        <div className="selectTypeControl">
          <SelectField
            fieldName="selectedType"
            fieldValue={selectedOption?.value}
            label={t("types.selectAType")}
            onChange={handleTypeChange}
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
