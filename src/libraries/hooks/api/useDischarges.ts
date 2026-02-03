import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import moment from "moment";
import { useEffect, useState } from "react";
import { getDischarges } from "../../../state/admissions";

export const useDisharges = () => {
  const dispatch = useAppDispatch();
  const [size, setSize] = useState(10);
  const [page, setPage] = useState(0);
  const [range, setRange] = useState(
    [moment().add(-5, "day"), moment()].map((e) => e.toISOString())
  );
  const { pageInfo, data, status, error } = useAppSelector((state) => {
    const dischargeState = state.admissions.getDischarges;
    const pageInfo = dischargeState.data?.pageInfo;
    const data = dischargeState.data?.data ?? [];
    const status = dischargeState?.status ?? "IDLE";
    const error = dischargeState.error;
    return { pageInfo, data, status, error };
  });

  const handleSizeChange = (value: number) => {
    setSize(value);
  };
  const handleRangeChange = (value: string[]) => {
    setRange(value);
  };

  const handlePageChange = (event: unknown, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    setPage(0);
  }, [size, range]);

  useEffect(() => {
    dispatch(getDischarges({ dischargerange: range, page, size }));
  }, [dispatch, page, range, size]);

  return {
    pageInfo,
    data,
    status,
    error,
    size,
    page,
    range,
    handlePageChange,
    handleSizeChange,
    handleRangeChange,
  };
};
