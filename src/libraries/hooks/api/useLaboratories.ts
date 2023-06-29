import moment from "moment";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LabWithRowsDTO, PageInfoDTO } from "../../../generated";
import { searchLabs } from "../../../state/laboratories/actions";
import { TAPIResponseStatus } from "../../../state/types";
import { IState } from "../../../types";

export const useLaboratories = () => {
  const dispatch = useDispatch();
  const [size, setSize] = useState(10);
  const [page, setPage] = useState(0);
  const [range, setRange] = useState(
    [moment().add(-5, "day"), moment()].map((e) => e.toISOString())
  );
  const { pageInfo, data, status, error } = useSelector<
    IState,
    {
      pageInfo?: PageInfoDTO;
      data: LabWithRowsDTO[];
      status: TAPIResponseStatus;
      error?: any;
    }
  >((state) => {
    const admissionState = state.laboratories.searchLabs;
    const pageInfo = admissionState.data?.pageInfo;
    const data = admissionState.data?.data ?? [];
    const status = admissionState?.status ?? "IDLE";
    const error = admissionState.error;
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
