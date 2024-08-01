import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./styles.scss";
import { Outlet, useLocation, useNavigate } from "react-router";
import { PATHS } from "../../../../consts";
import { useSelector } from "libraries/hooks/redux";
import { IState } from "../../../../types";
import { TypeMode } from "../../../../state/types/config";
import SelectField from "../../selectField/SelectField";
import { sortBy } from "lodash";

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
  const mode = useSelector((state) => state.types.config.mode);

  const typeOptions: TypeOption[] = sortBy(
    [
      defaultTypeOption,
      { label: t("types.exams"), value: "exams" },
      { label: t("types.vaccines"), value: "vaccines" },
      { label: t("types.operations"), value: "operations" },
      { label: t("types.diseases"), value: "diseases" },
      { label: t("types.deliveries"), value: "deliveries" },
      { label: t("types.admissions"), value: "admissions" },
      { label: t("types.deliveryResultType"), value: "deliveryresulttypes" },
      { label: t("types.discharges"), value: "discharges" },
      { label: t("types.medicals"), value: "medicals" },
      { label: t("types.pregnantTreatment"), value: "pregnanttreatmenttypes" },
    ],
    (type) => type.label
  );

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
