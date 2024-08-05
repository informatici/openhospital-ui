import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "libraries/hooks/redux";
import { useNavigate } from "react-router";
import {
  deleteAdmissionType,
  deleteAdmissionTypeReset,
  getAdmissionTypes,
} from "../../../../../../state/types/admissions";
import { AdmissionTypeDTO } from "../../../../../../generated";
import { PATHS } from "../../../../../../consts";
import AdmissionTypesTable from "./admissionTypesTable";
import Button from "../../../../button/Button";
import "./styles.scss";
import { setTypeMode } from "../../../../../../state/types/config";

const AdmissionTypes = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAdmissionTypes());
    dispatch(setTypeMode("manage"));

    return () => {
      dispatch(deleteAdmissionTypeReset());
    };
  }, [dispatch]);

  const handleEdit = (row: AdmissionTypeDTO) => {
    navigate(PATHS.admin_admissions_types_edit.replace(":code", row.code!), {
      state: row,
    });
  };

  const handleDelete = (row: AdmissionTypeDTO) => {
    dispatch(deleteAdmissionType(row.code ?? ""));
  };

  const { t } = useTranslation();
  return (
    <>
      <h3 data-cy="sub-activity-title">{t("admissionTypes.title")}</h3>

      <div className="admissionTypes" data-cy="admission-types-table">
        <AdmissionTypesTable
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
              dataCy="add-admission-type"
            >
              {t("admissionTypes.addAdmissionType")}
            </Button>
          }
        />
      </div>
    </>
  );
};

export default AdmissionTypes;
