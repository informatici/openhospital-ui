import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import {
  deleteExamType,
  deleteExamTypeReset,
  getExamTypes,
} from "../../../../../../state/types/exams/actions";
import { ExamTypeDTO } from "../../../../../../generated";
import { PATHS } from "../../../../../../consts";
import ExamTypesTable from "./examTypesTable";
import Button from "../../../../button/Button";
import "./styles.scss";
import { setTypeMode } from "../../../../../../state/types/config";

const ExamTypes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getExamTypes());
    dispatch(setTypeMode("manage"));

    return () => {
      dispatch(deleteExamTypeReset());
    };
  }, [dispatch]);

  const handleEdit = (row: ExamTypeDTO) => {
    navigate(PATHS.admin_exams_types_edit.replace(":code", row.code!), {
      state: row,
    });
  };

  const handleDelete = (row: ExamTypeDTO) => {
    dispatch(deleteExamType(row.code ?? ""));
  };

  const { t } = useTranslation();
  return (
    <>
      <h3>{t("examTypes.title")}</h3>

      <div className="examTypes">
        <ExamTypesTable
          onEdit={handleEdit}
          onDelete={handleDelete}
          headerActions={
            <Button
              onClick={() => {
                navigate("./new");
              }}
              type="button"
              variant="contained"
              color="primary"
            >
              {t("examTypes.addExamType")}
            </Button>
          }
        />
      </div>
    </>
  );
};

export default ExamTypes;
