import { PagePatientDTO } from "generated";
import moment from "moment";
import { useEffect, useState } from "react";
import { ApiResponse } from "state/types";
import { useAppSelector } from "../redux";

export const usePatients = () => {
  const [size, setSize] = useState(10);
  const [page, setPage] = useState(0);
  const [range, setRange] = useState(
    [moment().add(-5, "day"), moment()].map((e) => e.toISOString())
  );
  const { pageInfo, data, status, error } = useAppSelector((state) => {
    const patientState = state.patients
      .searchResults as ApiResponse<PagePatientDTO>;
    const pageInfo = patientState.data?.pageInfo;
    const data = patientState.data?.data ?? [];
    const status = patientState?.status ?? "IDLE";
    const error = patientState.error;
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
