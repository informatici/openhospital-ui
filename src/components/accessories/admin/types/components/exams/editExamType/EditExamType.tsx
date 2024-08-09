import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, useLocation, useParams } from "react-router";
import { PATHS } from "../../../../../../../consts";
import { ExamTypeDTO } from "../../../../../../../generated";
import { setTypeMode } from "../../../../../../../state/types/config";
import { updateExamType } from "../../../../../../../state/types/exams";
import { getInitialFields } from "../examTypesForm/consts";
import ExamTypeForm from "../examTypesForm/ExamTypeForm";
import "./styles.scss";

export const EditExamType = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { state }: { state: ExamTypeDTO | undefined } = useLocation();
  const { code } = useParams<{ code: string }>();
  const update = useAppSelector((state) => state.types.exams.update);

  const handleSubmit = (examTypeDTO: ExamTypeDTO) => {
    if (code) {
      dispatch(updateExamType({ code, examTypeDTO }));
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
      <h3 data-cy="sub-activity-title" className="title">
        {t("examTypes.editExamType")}
      </h3>
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
