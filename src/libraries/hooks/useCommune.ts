import { useCallback, useMemo } from "react";

export function useCommune(communes: Array<string> | undefined) {
  const communesList = ["dassa", "glazoue", "savalou"];
  const communesMerged = communesList
    ?.concat(communes ?? [])
    .filter((item, index, self) => self.indexOf(item) === index);
  const options = useMemo(
    () =>
      communesMerged?.map((item) => {
        const option = {
          value: item,
          label: item,
        };
        if (option.label.includes("patient.commune.")) {
          option.label = item;
        }

        return option;
      }),
    [communesMerged]
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
