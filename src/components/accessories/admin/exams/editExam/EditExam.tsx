import { useTranslation } from "react-i18next";
import ExamForm from "../examForm/ExamForm";
import React from "react";
import { getInitialFields } from "../examForm/consts";
import { ExamDTO } from "../../../../../generated";
import { ApiResponse } from "../../../../../state/types";
import { updateExam } from "../../../../../state/exams";
import { IState } from "../../../../../types";
import { Navigate, useLocation, useParams } from "react-router";
import { PATHS } from "../../../../../consts";
import { useDispatch, useSelector } from "libraries/hooks/redux";

export const EditExam = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { state }: { state: ExamDTO | undefined } = useLocation();
  const { id } = useParams();
  const update = useSelector((state) => state.operations.update);

  const handleSubmit = (examDTO: ExamDTO) => {
    dispatch(updateExam({ code: examDTO.code!!, examDTO }));
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
      fields={getInitialFields(state)}
    />
  );
};
