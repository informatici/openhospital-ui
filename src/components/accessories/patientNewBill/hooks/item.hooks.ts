import { argv } from "process";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MedicalDTO, ExamDTO, OperationDTO } from "../../../../generated";
import { getExams } from "../../../../state/exams/actions";
import { getMedicals } from "../../../../state/medicals/actions";
import { IState } from "../../../../types";

export const useItems = () => {
  const dispatch = useDispatch();
  const medicals = useSelector<IState, MedicalDTO[]>(
    (state) => state.medicals.medicalsOrderByName.data || []
  );

  const exams = useSelector<IState, ExamDTO[]>(
    (state) => state.exams.examList.data || []
  );

  const surgeries: OperationDTO[] = [
    { code: "srg1", description: "Surgery 1" },
    { code: "srg2", description: "Surgery 2" },
  ];
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
