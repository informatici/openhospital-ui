import { MedicalDTO } from "generated";
import { useCallback, useMemo } from "react";
import { useAppSelector } from "../redux";

export type MedicalPredicate = (medical: MedicalDTO) => boolean;

export function useMedicals(perdicate?: MedicalPredicate) {
  const medicals = useAppSelector((state) =>
    (state.medicals.medicalsOrderByName.data ?? []).filter(
      (item) => perdicate?.(item) ?? true
    )
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
    (code?: number) => medicals.find((medical) => medical.code === code),
    [medicals]
  );

  return { medicals, options, selectMedical };
}
