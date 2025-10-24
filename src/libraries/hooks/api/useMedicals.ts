import { useCallback, useMemo } from "react";
import { useAppSelector } from "../redux";

export function useMedicals() {
  const medicals = useAppSelector(
    (state) => state.medicals.medicalsOrderByName.data ?? []
  );

  const options = useMemo(
    () =>
      medicals.map((medical) => ({
        label: medical.description ?? "",
        value: medical.code ?? "",
      })),
    [medicals]
  );

  const selectMedical = useCallback(
    (code?: string) => medicals.find((medical) => medical.code === code),
    [medicals]
  );

  return { medicals, options, selectMedical };
}
