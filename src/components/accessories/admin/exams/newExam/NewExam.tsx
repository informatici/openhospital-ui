import { useTranslation } from "react-i18next";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { ExamDTO } from "../../../../../generated";
import { ExamForm, getInitialFields } from "../examForm";
import { IState } from "../../../../../types";
import { ApiResponse } from "../../../../../state/types";
import { createExam } from "../../../../../state/exams/actions";

export const NewExam = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const create = useSelector<IState, ApiResponse<ExamDTO>>(
    (state) => state.exams.examCreate
  );

  const handleSubmit = (value: ExamDTO) => {
    dispatch(createExam(value));
  };

  return (
    <ExamForm
      creationMode
      onSubmit={handleSubmit}
      isLoading={!!create.isLoading}
      resetButtonLabel={t("common.cancel")}
      submitButtonLabel={t("supplier.saveSupplier")}
      fields={getInitialFields(undefined)}
    />
  );
};
