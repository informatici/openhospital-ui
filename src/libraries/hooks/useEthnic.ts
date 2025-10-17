import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

export function useEthnic() {
  const { t } = useTranslation();
  const options = useMemo(
    () =>
      ["idactha", "nogot", "ife", "fon", "peulh", "adja"].map((item) => {
        const option = {
          value: item,
          label: t(`patient.ethnic.${item}`),
        };
        if (option.label.includes("patient.ethnic.")) {
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
