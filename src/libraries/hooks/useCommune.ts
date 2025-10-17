import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

export function useCommune() {
  const { t } = useTranslation();
  const options = useMemo(
    () =>
      ["dassa", "glazoue", "savalou"].map((item) => {
        const option = {
          value: item,
          label: t(`patient.commune.${item}`),
        };
        if (option.label.includes("patient.commune.")) {
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
