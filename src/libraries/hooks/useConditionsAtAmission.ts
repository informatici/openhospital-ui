import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

export function useConditionsAtAmission() {
  const { t } = useTranslation();
  const options = useMemo(
    () =>
      [
        "airway_obstruction",
        "respiratory_distress",
        "shock",
        "convulsion",
        "coma",
        "dehydration",
        "hypoglycemia",
      ].map((item) => {
        const option = {
          value: item,
          label: t(`admission.conditionAtAdmission.${item}`),
        };
        if (option.label.includes("admission.conditionAtAdmission.")) {
          option.label = item;
        }

        return option;
      }),
    [t]
  );

  const formatValues = useCallback(
    (values?: string[]) => {
      return (
        values?.map(
          (item) =>
            options.find((option) => option.value === item)?.label ?? item
        ) ?? []
      );
    },
    [options]
  );

  return { options, formatValues };
}
