import { useTranslation } from "react-i18next";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import { IState } from "../../../../../../../types";
import { ApiResponse } from "../../../../../../../state/types";
import { ExamTypeDTO } from "../../../../../../../generated";
import { createExamType } from "../../../../../../../state/types/exams";
import ExamTypeForm from "../examTypesForm/ExamTypeForm";
import { getInitialFields } from "../examTypesForm/consts";
import { setTypeMode } from "../../../../../../../state/types/config";
import "./styles.scss";

export const NewExamType = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const create = useAppSelector((state) => state.types.exams.create);

  useEffect(() => {
    dispatch(setTypeMode("edit"));
  });

  const handleSubmit = (value: ExamTypeDTO) => {
    dispatch(createExamType(value));
  };

  return (
    <div className="newExamType">
      <h3 data-cy="sub-activity-title" className="title">
        {t("examTypes.addExamType")}
      </h3>
      <ExamTypeForm
        creationMode
        onSubmit={handleSubmit}
        isLoading={!!create.isLoading}
        resetButtonLabel={t("common.cancel")}
        submitButtonLabel={t("examTypes.saveExamTypes")}
        fields={getInitialFields(undefined)}
      />
    </div>
  );
};
