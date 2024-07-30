import { argv } from "process";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MedicalDTO, ExamDTO, OperationDTO } from "../../../../generated";
import { getExams } from "../../../../state/exams";
import { getMedicals } from "../../../../state/medicals";
import { IState } from "../../../../types";

export const useItems = () => {
  const dispatch = useDispatch();
  const medicals = useSelector<IState, MedicalDTO[]>(
    (state) => state.medicals.medicalsOrderByName.data || []
  );

  const exams = useSelector<IState, ExamDTO[]>(
    (state) => state.exams.examList.data || []
  );

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
