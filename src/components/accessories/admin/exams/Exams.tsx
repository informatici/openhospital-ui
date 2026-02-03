import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import { PATHS } from "../../../../consts";
import { ExamDTO } from "../../../../generated";
import { deleteExam } from "../../../../state/exams";
import classes from "./Exams.module.scss";

import { useAppDispatch } from "libraries/hooks/redux";
import Button from "../../button/Button";
import ExamsTable from "./examsTable";

export const Exams = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleDelete = (row: ExamDTO) => {
    dispatch(deleteExam(row.code!));
  };
  const handleEdit = (row: ExamDTO) => {
    navigate(PATHS.admin_exams_edit.replace(":id", `${row.code}`), {
      state: row,
    });
  };

  return (
    <div className={classes.exams} data-cy="exams-table">
      <ExamsTable
        headerActions={
          <Button
            onClick={() => {
              navigate(PATHS.admin_exams_new);
            }}
            type="button"
            variant="contained"
            color="primary"
            dataCy="add-new-exam"
          >
            {t("exam.addExam")}
          </Button>
        }
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
};
