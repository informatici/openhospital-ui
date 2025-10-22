import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

export function useEthnic(ethnics: Array<string> | undefined) {
  const { t } = useTranslation();
  const ethnicList = ["idactha", "nogot", "ife", "fon", "peulh", "adja"];
  const ethnicsMerged = ethnicList
    ?.concat(ethnics ?? [])
    .filter((item, index, self) => self.indexOf(item) === index);
  const options = useMemo(
    () =>
      ethnicsMerged?.map((item) => {
        const option = {
          value: item,
          label: t(`${item}`),
        };
        if (option.label.includes("")) {
          option.label = item;
        }

        return option;
      }),
    [ethnicsMerged, t]
  );

  const formatValues = useCallback(
    (values?: string[]) => {
      return (
        values?.map(
          (item) =>
            options?.find((option) => option.value === item)?.label ?? item
        ) ?? []
      );
    },
    [options]
  );

  return { options, formatValues };
}
