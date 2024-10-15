import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import { useEffect } from "react";
import { OperationDTO } from "../../../../generated";
import { getExams } from "../../../../state/exams";
import { getMedicals } from "../../../../state/medicals";

export const useItems = () => {
  const dispatch = useAppDispatch();
  const medicals = useAppSelector(
    (state) => state.medicals.medicalsOrderByName.data || []
  );

  const exams = useAppSelector((state) => state.exams.examList.data || []);

  const surgeries: OperationDTO[] = [];
  useEffect(() => {
    dispatch(getMedicals());
    dispatch(getExams());
  }, [dispatch]);

  return {
    medicals,
    exams,
    surgeries,
    dispatch,
  };
};
