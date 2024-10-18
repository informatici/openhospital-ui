import React from "react";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import { ExamDTO } from "../../../../../generated";
import { createExam } from "../../../../../state/exams";
import { ExamForm, getInitialFields } from "../examForm";

export const NewExam = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const create = useAppSelector((state) => state.exams.examCreate);

  const handleSubmit = ({
    rows,
    ...examDTO
  }: ExamDTO & { rows: string[] | undefined }) => {
    dispatch(createExam({ examWithRowsDTO: { exam: examDTO, rows } }));
  };

  return (
    <ExamForm
      creationMode
      onSubmit={handleSubmit}
      isLoading={!!create.isLoading}
      resetButtonLabel={t("common.cancel")}
      submitButtonLabel={t("supplier.saveSupplier")}
      fields={getInitialFields(undefined, undefined)}
    />
  );
};
