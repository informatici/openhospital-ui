import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

export function useCommune(communes: Array<string> | undefined) {
  const { t } = useTranslation();
  const communesList = ["dassa", "glazoue", "savalou"];
  const communesMerged = communesList
    ?.concat(communes ?? [])
    .filter((item, index, self) => self.indexOf(item) === index);
  const options = useMemo(
    () =>
      communesMerged?.map((item) => {
        const option = {
          value: item,
          label: t(`${item}`),
        };
        if (option.label.includes("")) {
          option.label = item;
        }

        return option;
      }),
    [communesMerged, t]
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
