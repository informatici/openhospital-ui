import { Button, CircularProgress } from "@material-ui/core";
import { Add, Cancel } from "@material-ui/icons";
import React, {
  FC,
  Fragment,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory, useRouteMatch } from "react-router";
import { IState } from "../../../types";
import InfoBox from "../infoBox/InfoBox";
import { initialFields, initialFilter, initialFilterFields } from "./consts";
import { ExamFilterForm } from "./filter/ExamFilterForm";
import "./styles.scss";
import { ExamTable } from "./table/ExamTable";
import checkIcon from "../../../assets/check-icon.png";
import { useEffect } from "react";
import { TFilterValues } from "../billTable/types";
import {
  getFromFields,
  updateFilterFields,
  updateLabFields,
} from "../../../libraries/formDataHandling/functions";
import {
  deleteLab,
  deleteLabReset,
  getLabWithRowsByCode,
  searchLabs,
} from "../../../state/laboratories/actions";
import { getExams } from "../../../state/exams/actions";
import { CustomDialog } from "../customDialog/CustomDialog";
import { ILaboratoriesState } from "../../../state/laboratories/types";
import { LaboratoryForPrintDTO } from "../../../generated";
import ExamForm from "./examForm/ExamForm";
import ConfirmationDialog from "../confirmationDialog/ConfirmationDialog";
import { getPatientThunk } from "../../../state/patients/actions";
import isEmpty from "lodash.isempty";
import { PATHS } from "../../../consts";

export const Exams: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { path, url } = useRouteMatch();
  const history = useHistory();

  const [filter, setFilter] = useState(initialFilter as TFilterValues);

  const [showForm, setShowForm] = useState(false);

  const [deletedObjCode, setDeletedObjCode] = useState("");
  const [creationMode, setCreationMode] = useState(true);

  const labWithRows = useSelector(
    (state: IState) => state.laboratories.getLabWithRowsByCode.data
  );

  const labToEdit = labWithRows?.laboratoryDTO;

  const data = useSelector(
    (state: IState) => state.laboratories.searchLabs.data
  );

  const fields = useMemo(
    () => updateFilterFields(initialFilterFields, filter),
    [filter]
  );
  const labStore = useSelector<IState, ILaboratoriesState>(
    (state: IState) => state.laboratories
  );

  useEffect(() => {
    if (!isEmpty(filter.patientCode)) {
      dispatch(getPatientThunk(filter.patientCode?.toString()));
    }
    dispatch(searchLabs(filter));
  }, [filter]);

  const onSubmit = (values: TFilterValues) => {
    setFilter(values);
  };

  const handleReset = useCallback(() => {
    setShowForm(false);
    history.replace(url);
  }, [dispatch]);

  const onEdit = (row: LaboratoryForPrintDTO) => {
    setCreationMode(false);
    dispatch(getPatientThunk(row.patientCode?.toString() ?? ""));
    dispatch(getLabWithRowsByCode(row.code));
    setShowForm(true);
    history.replace(`${path}/${row.code}/edit`);
  };
  const onDelete = (code: number | undefined) => {
    setDeletedObjCode(`${code}` ?? "");
    dispatch(deleteLab(code));
  };

  const patient = useSelector(
    (state: IState) => state.patients.selectedPatient.data
  );

  const open = useMemo(() => {
    return creationMode
      ? showForm
      : showForm &&
          labWithRows?.laboratoryDTO?.code !== undefined &&
          patient?.code !== undefined;
  }, [showForm, creationMode, labToEdit]);

  useEffect(() => {
    if (!showForm) {
      dispatch(searchLabs(filter));
    }
  }, [showForm]);

  const formFields = useMemo(() => {
    return creationMode
      ? initialFields
      : updateLabFields(initialFields, labToEdit ?? {});
  }, [creationMode, labToEdit]);

  const errorMessage = useSelector(
    (state: IState) => state.laboratories.searchLabs.error?.message
  );
  let status = useSelector(
    (state: IState) => state.laboratories.searchLabs.status
  );

  useEffect(() => {
    dispatch(searchLabs(getFromFields(fields, "value")));
    dispatch(getExams());
  }, []);

  const ExamContent = useMemo(() => {
    return (
      <>
        <div className="lab__header">
          <div className="lab__title">{t("nav.laboratory")}</div>
          <div className="lab__actions">
            <Button
              onClick={() => {
                setCreationMode(true);
                setShowForm(true);
                history.replace(`${url}/new`);
              }}
              type="button"
              variant="contained"
              color="primary"
            >
              <Add fontSize="small" />
              <span className="new__button__label">{t("lab.newlab")}</span>
            </Button>
          </div>
        </div>
        {status === "LOADING" && (
          <CircularProgress
            style={{ marginLeft: "50%", position: "relative" }}
          />
        )}
        {status !== "LOADING" && (
          <>
            <ExamFilterForm onSubmit={onSubmit} fields={fields} />
            {status === "SUCCESS_EMPTY" && (
              <InfoBox type="warning" message={t("common.emptydata")} />
            )}
            {status === "FAIL" && (
              <InfoBox type="error" message={errorMessage} />
            )}
            {status === "SUCCESS" && (
              <ExamTable
                data={data ?? []}
                handleDelete={onDelete}
                handleEdit={onEdit}
              />
            )}
            {labStore.deleteLab.status === "LOADING" && (
              <CircularProgress
                style={{ marginLeft: "50%", position: "relative" }}
              />
            )}
            <ConfirmationDialog
              isOpen={labStore.deleteLab.status === "SUCCESS"}
              title={t("lab.deleted")}
              icon={checkIcon}
              info={t("common.deletesuccess", { code: deletedObjCode })}
              primaryButtonLabel={t("common.ok")}
              handlePrimaryButtonClick={() => {
                dispatch(deleteLabReset());
                dispatch(searchLabs(filter));
              }}
              handleSecondaryButtonClick={() => {}}
            />
          </>
        )}
      </>
    );
  }, [status, fields, data]);

  const LaboratoryEditContent = useMemo(() => {
    return (
      <>
        <div className="lab__header">
          <div className="lab__title">{t("nav.laboratory")}</div>
          <div className="lab__actions">
            <Button
              onClick={() => {
                history.replace(url);
              }}
              type="button"
              variant="contained"
              color="primary"
            >
              <Cancel fontSize="small" />
              {t("common.discard")}
            </Button>
          </div>
        </div>
        {open && (
          <ExamForm
            fields={formFields}
            handleReset={handleReset}
            creationMode={creationMode}
            labWithRowsToEdit={labWithRows ?? {}}
          />
        )}
      </>
    );
  }, [creationMode, formFields, handleReset, open]);

  return (
    <Fragment>
      <div className="lab_labs">
        <Switch>
          <Route path={`${path}`} exact>
            {ExamContent}
          </Route>
          <Route path={`${path}/new`}>{LaboratoryEditContent}</Route>
          <Route path={`${path}/:id/edit`}>{LaboratoryEditContent}</Route>
        </Switch>
      </div>
    </Fragment>
  );
};
