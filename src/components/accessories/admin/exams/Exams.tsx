import React from "react";
import { useDispatch } from "react-redux";

import { deleteExam } from "../../../../state/exams/actions";
import { ExamDTO } from "../../../../generated";
import classes from "./Exams.module.scss";

import ExamsTable from "./examsTable";

export const Exams = () => {
  const dispatch = useDispatch();

  const handleDelete = (row: ExamDTO) => {
    dispatch(deleteExam(row.code!));
  };

  return (
    <div className={classes.exams}>
      <ExamsTable onDelete={handleDelete} />
    </div>
  );
};
