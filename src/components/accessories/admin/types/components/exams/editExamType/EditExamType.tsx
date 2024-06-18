import { useTranslation } from "react-i18next";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useParams } from "react-router";
import { ExamTypeDTO } from "../../../../../../../generated";
import { IState } from "../../../../../../../types";
import { ApiResponse } from "../../../../../../../state/types";
import { PATHS } from "../../../../../../../consts";
import { getInitialFields } from "../examTypesForm/consts";
import ExamTypeForm from "../examTypesForm/ExamTypeForm";
import { setTypeMode } from "../../../../../../../state/types/config";
import "./styles.scss";
import { updateExamType } from "../../../../../../../state/types/exams/actions";

export const EditExamType = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { state }: { state: ExamTypeDTO | undefined } = useLocation();
  const { code } = useParams<{ code: string }>();
  const update = useSelector<IState, ApiResponse<ExamTypeDTO>>(
    (state) => state.types.exams.update
  );

  const handleSubmit = (value: ExamTypeDTO) => {
    if (code) {
      dispatch(updateExamType(value, code));
    }
  };

  useEffect(() => {
    dispatch(setTypeMode("edit"));
  }, [dispatch]);

  if (state?.code !== code) {
    return <Navigate to={PATHS.admin_exams_types} />;
  }

  return (
    <div className="editExamType">
      <h3 className="title">{t("examTypes.editExamType")}</h3>
      <ExamTypeForm
        creationMode={false}
        onSubmit={handleSubmit}
        isLoading={!!update.isLoading}
        resetButtonLabel={t("common.cancel")}
        submitButtonLabel={t("examTypes.updateExamType")}
        fields={getInitialFields(state)}
      />
    </div>
  );
};
