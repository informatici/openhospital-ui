import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import { useEffect } from "react";
import { getPendingBills } from "../../../../state/bills";
import { IState } from "../../../../types";

export const usePendingBills = (patientCode: number) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(
    (state: IState) => state.bills.getPendingBills.status ?? "IDLE"
  );
  const data = useAppSelector(
    (state: IState) => state.bills.getPendingBills?.data ?? []
  );
  useEffect(() => {
    dispatch(getPendingBills(patientCode));
  }, [dispatch, patientCode]);
  return { data, status };
};
