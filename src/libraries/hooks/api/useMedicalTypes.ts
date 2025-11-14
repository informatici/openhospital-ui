import { useCallback, useMemo } from "react";
import { useAppSelector } from "../redux";

export function useMedicalTypes() {
  const medicalTypes = useAppSelector(
    (state) => state.pharmacy.getMedicalTypes.data ?? []
  );

  const options = useMemo(
    () =>
      medicalTypes.map((medicalType) => ({
        label: medicalType.description ?? "",
        value: medicalType.code ?? "",
      })),
    [medicalTypes]
  );

  const selectMedicalType = useCallback(
    (code?: string) =>
      medicalTypes.find((medicalType) => medicalType.code === code),
    [medicalTypes]
  );

  return { medicalTypes, options, selectMedicalType };
}
