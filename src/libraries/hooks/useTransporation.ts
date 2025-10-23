import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

export function useTransportation(ethnics: Array<string> | undefined) {
  const { t } = useTranslation();
  const transportationList = ["Ambulance", "Moto", "Taxi"];
  const transportationsMerged = transportationList
    ?.concat(ethnics ?? [])
    .filter((item, index, self) => self.indexOf(item) === index);
  const options = useMemo(
    () =>
      transportationsMerged?.map((item) => {
        const option = {
          value: item,
          label: t(`${item}`),
        };
        if (option.label.includes("")) {
          option.label = item;
        }

        return option;
      }),
    [transportationsMerged, t]
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
