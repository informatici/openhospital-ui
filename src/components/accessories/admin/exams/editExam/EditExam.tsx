import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, useLocation, useParams } from "react-router";
import { PATHS } from "../../../../../consts";
import { ExamDTO } from "../../../../../generated";
import { getExamRows, updateExam } from "../../../../../state/exams";
import ExamForm from "../examForm/ExamForm";
import { getInitialFields } from "../examForm/consts";

export const EditExam = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { state }: { state: ExamDTO | undefined } = useLocation();
  const { id } = useParams();
  const update = useAppSelector((state) => state.exams.examUpdate);

  const examRows: string[] | undefined = useAppSelector((state) =>
    state.exams.examRowsByExamCode.data?.map((row) => row.description!)
  );

  useEffect(() => {
    if (id) {
      dispatch(getExamRows(id));
    }
  }, [dispatch, id]);

  const handleSubmit = ({
    rows,
    ...examDTO
  }: ExamDTO & { rows: string[] | undefined }) => {
    dispatch(
      updateExam({
        code: examDTO.code!!,
        examWithRowsDTO: { exam: examDTO, rows },
      })
    );
  };

  if (state?.code !== id) {
    return <Navigate to={PATHS.admin_exams} />;
  }

  return (
    <ExamForm
      creationMode={false}
      onSubmit={handleSubmit}
      isLoading={!!update.isLoading}
      resetButtonLabel={t("common.cancel")}
      submitButtonLabel={t("exam.updateExam")}
      fields={getInitialFields(state, examRows)}
    />
  );
};
