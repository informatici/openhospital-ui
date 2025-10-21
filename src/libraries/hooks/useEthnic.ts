import { useCallback, useMemo } from "react";

export function useEthnic(ethnics: Array<string> | undefined) {
  const ethnicList = ["idactha", "nogot", "ife", "fon", "peulh", "adja"];
  const ethnicsMerged = ethnicList
    ?.concat(ethnics ?? [])
    .filter((item, index, self) => self.indexOf(item) === index);
  const options = useMemo(
    () =>
      ethnicsMerged?.map((item) => {
        const option = {
          value: item,
          label: item,
        };

        return option;
      }),
    [ethnicsMerged]
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
