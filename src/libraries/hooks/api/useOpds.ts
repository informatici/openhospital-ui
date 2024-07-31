import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "libraries/hooks/redux";
import { OpdDTO, PageInfoDTO } from "../../../generated";
import { TAPIResponseStatus } from "../../../state/types";
import { IState } from "../../../types";

export const useOpds = () => {
  const [size, setSize] = useState(10);
  const [page, setPage] = useState(0);
  const [range, setRange] = useState(
    [moment().add(-5, "day"), moment()].map((e) => e.toISOString())
  );
  const { pageInfo, data, status, error } = useSelector<
    IState,
    {
      pageInfo?: PageInfoDTO;
      data: OpdDTO[];
      status: TAPIResponseStatus;
      error?: any;
    }
  >((state) => {
    const opdState = state.opds.searchOpds;
    const pageInfo = opdState.data?.pageInfo;
    const data = opdState.data?.data ?? [];
    const status = opdState.status ?? "IDLE";
    const error = opdState.error;
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
