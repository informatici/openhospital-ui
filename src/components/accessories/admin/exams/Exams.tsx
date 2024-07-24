import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

import { PATHS } from "../../../../consts";
import { deleteExam } from "../../../../state/exams/actions";
import { ExamDTO } from "../../../../generated";
import classes from "./Exams.module.scss";

import Button from "../../button/Button";
import ExamsTable from "./examsTable";

export const Exams = () => {
  const dispatch = useDispatch();
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
    <div className={classes.exams}>
      <ExamsTable
        headerActions={
          <Button
            onClick={() => {
              navigate(PATHS.admin_exams_new);
            }}
            type="button"
            variant="contained"
            color="primary"
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
