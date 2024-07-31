import { useEffect } from "react";
import { useDispatch, useSelector } from "libraries/hooks/redux";
import { FullBillDTO } from "../../../../generated";
import { getPendingBills } from "../../../../state/bills";
import { IState } from "../../../../types";

export const usePendingBills = (patientCode: number) => {
  const dispatch = useDispatch();
  const status = useSelector<IState, string>(
    (state: IState) => state.bills.getPendingBills.status ?? "IDLE"
  );
  const data = useSelector<IState, FullBillDTO[]>(
    (state: IState) => state.bills.getPendingBills?.data ?? []
  );
  useEffect(() => {
    dispatch(getPendingBills(patientCode));
  }, [dispatch, patientCode]);
  return { data, status };
};
