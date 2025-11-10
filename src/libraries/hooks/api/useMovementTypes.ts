import { useCallback, useEffect, useMemo } from "react";
import { getMovementTypes } from "state/pharmacy";
import { useAppDispatch, useAppSelector } from "../redux";

export function useMovementTypes() {
  const dispatch = useAppDispatch();
  const movementTypes = useAppSelector(
    (state) => state.pharmacy.movementTypes.data ?? []
  );

  const options = useMemo(
    () =>
      movementTypes.map((movementType) => ({
        label: movementType.description ?? "",
        value: movementType.code ?? "",
      })),
    [movementTypes]
  );

  const selectMovementType = useCallback(
    (code?: string) =>
      movementTypes.find((movementType) => movementType.code === code),
    [movementTypes]
  );

  useEffect(() => {
    dispatch(getMovementTypes());
  }, [dispatch]);

  return { movementTypes, options, selectMovementType };
}
