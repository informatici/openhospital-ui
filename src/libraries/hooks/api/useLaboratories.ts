import moment from "moment";
import { useEffect, useState } from "react";
import { useAppSelector } from "libraries/hooks/redux";
import { LabWithRowsDTO, PageInfoDTO } from "../../../generated";
import { TAPIResponseStatus } from "../../../state/types";
import { IState } from "../../../types";

export const useLaboratories = () => {
  const [size, setSize] = useState(10);
  const [page, setPage] = useState(0);
  const [range, setRange] = useState(
    [moment().add(-5, "day"), moment()].map((e) => e.toISOString())
  );
  const { pageInfo, data, status, error } = useAppSelector((state) => {
    const laboratoryState = state.laboratories.searchLabs;
    const pageInfo = laboratoryState.data?.pageInfo;
    const data = laboratoryState.data?.data ?? [];
    const status = laboratoryState?.status ?? "IDLE";
    const error = laboratoryState.error;
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
