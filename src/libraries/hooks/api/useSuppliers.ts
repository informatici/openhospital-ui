import { SupplierDTO } from "generated";
import { useCallback, useMemo } from "react";
import { useAppSelector } from "../redux";

export type SupplierPredicate = (supplier: SupplierDTO) => boolean;

export function useSuppliers(perdicate?: SupplierPredicate) {
  const suppliers = useAppSelector((state) =>
    (state.suppliers.supplierList.data ?? []).filter(
      (item) => perdicate?.(item) ?? true
    )
  );

  const options = useMemo(
    () =>
      suppliers.map((supplier) => ({
        label: supplier.supName ?? "",
        value: supplier.supId ?? "",
      })),
    [suppliers]
  );

  const selectSupplier = useCallback(
    (code?: number) => suppliers.find((supplier) => supplier.supId === code),
    [suppliers]
  );

  return { suppliers, options, selectSupplier };
}
