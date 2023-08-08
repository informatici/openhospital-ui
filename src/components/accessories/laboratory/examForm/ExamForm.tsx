import { useFormik } from "formik";
import get from "lodash.get";
import has from "lodash.has";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { object, string } from "yup";
import warningIcon from "../../../../assets/warning-icon.png";
import {
  ExamDTO,
  LaboratoryDTO,
  LaboratoryDTOInOutPatientEnum,
  LaboratoryDTOStatusEnum,
  PatientDTO,
} from "../../../../generated";
import {
  formatAllFieldValues,
  getFromFields,
  parseDate,
} from "../../../../libraries/formDataHandling/functions";
import { getExamRows, getExams } from "../../../../state/exams/actions";
import { IState } from "../../../../types";
import AutocompleteField from "../../autocompleteField/AutocompleteField";
import ConfirmationDialog from "../../confirmationDialog/ConfirmationDialog";
import DateField from "../../dateField/DateField";
import Button from "../../button/Button";
import TextField from "../../textField/TextField";
import checkIcon from "../../../../assets/check-icon.png";
import "./styles.scss";
import moment from "moment";
import { renderDate } from "../../../../libraries/formatUtils/dataFormatting";
import PatientPicker from "../../patientPicker/PatientPicker";
import { ExamProps, ExamTransitionState } from "./type";
import { scrollToElement } from "../../../../libraries/uiUtils/scrollToElement";
import {
  createLabReset,
  updateLabReset,
  deleteLabReset,
  updateLab,
  createLab,
  getMaterials,
} from "../../../../state/laboratories/actions";
import { ILaboratoriesState } from "../../../../state/laboratories/types";
import ExamRowTable from "../../patientExams/examRowTable/ExamRowTable";
import InfoBox from "../../infoBox/InfoBox";
import { useNavigate } from "react-router";
import { PATHS } from "../../../../consts";

const ExamForm: FC<ExamProps> = ({
  fields,
  creationMode,
  labWithRowsToEdit,
  handleReset,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentExamCode, setCurrentExamCode] = useState("");
  const [currentExamProcedure, setCurrentExamProcedure] = useState("");

  const infoBoxRef = useRef<HTMLDivElement>(null);
  const [shouldResetForm, setShouldResetForm] = useState(false);
  const [activityTransitionState, setActivityTransitionState] =
    useState<ExamTransitionState>("IDLE");

  const [patientData, setPatientData] = useState({} as PatientDTO);
  const labToEdit = labWithRowsToEdit.laboratoryDTO ?? {};
  const labToEditRows = labWithRowsToEdit.laboratoryRowList ?? [];

  useEffect(() => {
    dispatch(getExams());
    dispatch(getMaterials());
    dispatch(createLabReset());
    dispatch(updateLabReset());
    dispatch(deleteLabReset());
  }, [dispatch]);

  useEffect(() => {
    if (activityTransitionState === "TO_RESET") {
      dispatch(createLabReset());
      dispatch(updateLabReset());
      dispatch(deleteLabReset());
      setShouldResetForm(true);
      handleReset();
    }
  }, [dispatch, activityTransitionState]);

  const patient = useSelector(
    (state: IState) => state.patients.selectedPatient.data
  );

  const labStore = useSelector<IState, ILaboratoriesState>(
    (state: IState) => state.laboratories
  );
  const errorMessage = useSelector<IState>(
    (state) =>
      labStore.createLab.error?.message ||
      labStore.updateLab.error?.message ||
      labStore.deleteLab.error?.message ||
      t("common.somethingwrong")
  ) as string;

  const exams = useSelector((state: IState) => state.exams.examList.data);

  const onSubmit = (lab: LaboratoryDTO, rows: string[]) => {
    setShouldResetForm(false);
    lab.patientCode = patientData?.code;
    lab.exam = exams?.find((item) => item.code === lab.exam);
    lab.patName = patientData?.firstName + " " + patientData?.secondName;
    lab.sex = patientData?.sex;
    lab.age = patientData?.age;
    lab.labDate = parseDate(lab.labDate ?? "");
    lab.registrationDate = parseDate(lab.registrationDate ?? "");
    lab.inOutPatient = patientData?.status
      ? patientData.status === "O"
        ? LaboratoryDTOInOutPatientEnum.O
        : LaboratoryDTOInOutPatientEnum.I
      : LaboratoryDTOInOutPatientEnum.O;
    if (!creationMode && labToEdit.code) {
      lab.code = labToEdit.code;
      lab.lock = labToEdit.lock;
    }
    const labWithRowsDTO = {
      laboratoryDTO: lab,
      laboratoryRowList: rows,
    };

    if (rowsData.length > 0 || (lab.result && lab.result.length > 0)) {
      lab.status = LaboratoryDTOStatusEnum.Done;
    } else {
      lab.status = LaboratoryDTOStatusEnum.Open;
    }

    if (!creationMode && labToEdit.code) {
      dispatch(updateLab(labToEdit.code, labWithRowsDTO));
    } else {
      dispatch(createLab(labWithRowsDTO));
    }
  };

  const resetFormCallback = () => {
    setShouldResetForm(false);
    dispatch(createLabReset());
    dispatch(updateLabReset());
    setActivityTransitionState("IDLE");
    scrollToElement(null);
  };

  const rowTableHeaders: Array<{
    label: string;
    align: "left" | "right" | "center" | "justify";
  }> = [
    { label: t("lab.resultrow"), align: "left" },
    { label: t("lab.value"), align: "right" },
  ];

  const validationSchema = object({
    labDate: string()
      .required(t("common.required"))
      .test({
        name: "labDate",
        message: t("common.invaliddate"),
        test: function (value) {
          return moment(value).isValid();
        },
      }),
    exam: string().required(t("common.required")),
    material: string().required(t("common.required")),
    result: string(),
    note: string().test({
      name: "maxLength",
      message: t("common.maxlengthexceeded", { maxLength: 255 }),
      test: function (value) {
        if (!value) return true;
        return value.length <= 255;
      },
    }),
  });

  const initialValues = getFromFields(fields, "value");
  const [rowsData, setRowsData] = useState([...labToEditRows]);

  const examOptionsSelector = (exams: ExamDTO[] | undefined) => {
    if (exams) {
      return exams.map((item) => {
        return {
          value: item.code ?? "",
          label:
            (item.description &&
              item.description?.length > 30 &&
              item.description.slice(0, 30) + "...") ||
            (item.description ?? ""),
        };
      });
    } else return [];
  };

  const materialsOptionsSelector = (materials: string[] | undefined) => {
    if (materials) {
      return materials.map((item) => {
        let label = item ? t(item) : "";
        return {
          value: item ?? "",
          label:
            (label.length > 30 && label.slice(0, 30) + "...") || (label ?? ""),
        };
      });
    } else return [];
  };

  const examList = useSelector((state: IState) => state.exams.examList.data);
  const materialsList = useSelector(
    (state: IState) => state.laboratories.materials.data
  );

  const examRowOptionsSelector = (state: IState) => {
    if (state.exams.examRowsByExamCode.data) {
      return state.exams.examRowsByExamCode.data.map((item) => {
        return {
          value: item.description ?? "",
          label: item.description ?? "",
        };
      });
    } else return [];
  };

  const examRows = useSelector((state: IState) =>
    examRowOptionsSelector(state)
  );

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const formattedValues = formatAllFieldValues(fields, values);
      onSubmit(
        formattedValues,
        Object.values(rowsData).filter((item) => item)
      );
      setRowsData([]);
    },
  });

  const { setFieldValue, resetForm, handleBlur } = formik;

  const dateFieldHandleOnChange = useCallback(
    (fieldName: string) => (value: any) => {
      setFieldValue(fieldName, value);
      formik.setFieldTouched(fieldName);
    },
    [setFieldValue]
  );
  useEffect(() => {
    if (initialValues["exam"] !== "") {
      setCurrentExamCode(initialValues["exam"]);
    }
  }, [initialValues]);

  useEffect(() => {
    if (currentExamCode) {
      dispatch(getExamRows(currentExamCode));
    }
    if (currentExamCode && examList) {
      setCurrentExamProcedure(
        examList
          ?.find((item) => item.code === currentExamCode)
          ?.procedure?.toString() ?? ""
      );
    }
  }, [examList, currentExamCode, dispatch]);

  const isValid = (fieldName: string): boolean => {
    return has(formik.touched, fieldName) && has(formik.errors, fieldName);
  };

  const getErrorText = (fieldName: string): string => {
    return has(formik.touched, fieldName)
      ? (get(formik.errors, fieldName) as string)
      : "";
  };

  const onBlurCallback = useCallback(
    (fieldName: string) =>
      (
        e: React.FocusEvent<HTMLInputElement>,
        value: PatientDTO | string | undefined
      ) => {
        handleBlur(e);
        if (typeof value === "string") {
          setFieldValue(fieldName, value);
          if (fieldName === "exam") {
            setCurrentExamCode(value);
          }

          // Clear rowsData variable for exam status validation
          if (fieldName === "result") {
            setRowsData([]);
          }
        } else {
          setFieldValue(fieldName, value?.code ?? "");
          setPatientData(value as PatientDTO);
        }
      },
    [setFieldValue, handleBlur]
  );

  const onBlurCallbackForTableRow = useCallback(
    () => (value: string) => {
      setRowsData((rowObjs: string[]) => {
        if (!rowObjs.includes(value)) {
          rowObjs.push(value);
        } else rowObjs = rowObjs.filter((e) => e !== value);
        return rowObjs;
      });
    },
    []
  );

  const [openResetConfirmation, setOpenResetConfirmation] = useState(false);

  const handleResetConfirmation = () => {
    setOpenResetConfirmation(false);
    formik.resetForm();
    resetFormCallback();
    setCurrentExamProcedure("");
    setCurrentExamCode("");
  };

  useEffect(() => {
    if (shouldResetForm) {
      resetForm();
      resetFormCallback();
      setCurrentExamProcedure("");
      setCurrentExamCode("");
    }
  }, [shouldResetForm, resetForm, resetFormCallback]);

  const examRowsLaoding = useSelector(
    (state: IState) => state.exams.examRowsByExamCode.status === "LOADING"
  );

  const examsLoading = useSelector(
    (state: IState) => state.exams.examList.status === "LOADING"
  );

  const materialsLoading = useSelector(
    (state: IState) => state.laboratories.materials.status === "LOADING"
  );

  const isLoading =
    labStore.createLab.status === "LOADING" ||
    labStore.updateLab.status === "LOADING";

  const isOpen =
    labStore.createLab.status === "SUCCESS" ||
    labStore.updateLab.status === "SUCCESS";

  return (
    <>
      <div className="patientExamForm">
        <h5 className="formInsertMode">
          {creationMode
            ? t("lab.newlab") + " thanks"
            : t("lab.editlab") + ": " + renderDate(formik.values.labDate)}
        </h5>
        <form className="patientExamForm__form" onSubmit={formik.handleSubmit}>
          <div className="row start-sm center-xs">
            <div className="fullWidth patientExamForm__item">
              <PatientPicker
                theme={"regular"}
                fieldName="patientCode"
                initialValue={patient}
                fieldValue={formik.values.patientCode}
                label={t("opd.patient")}
                isValid={isValid("patientCode")}
                errorText={getErrorText("patientCode")}
                onBlur={onBlurCallback("patientCode")}
              />
            </div>
            <div className="patientExamForm__item">
              <DateField
                fieldName="date"
                fieldValue={formik.values.labDate}
                disableFuture={false}
                theme="regular"
                format="dd/MM/yyyy"
                isValid={isValid("labDate")}
                errorText={getErrorText("labDate")}
                label={t("lab.date")}
                onChange={dateFieldHandleOnChange("labDate")}
                disabled={false}
              />
            </div>
            <div className="patientExamForm__item">
              <AutocompleteField
                fieldName="material"
                fieldValue={formik.values.material}
                label={t("lab.material")}
                isValid={isValid("material")}
                errorText={getErrorText("material")}
                onBlur={onBlurCallback("material")}
                isLoading={materialsLoading}
                options={materialsOptionsSelector(materialsList)}
                disabled={isLoading}
              />
            </div>
            <div className="patientExamForm__item fullWidth">
              <AutocompleteField
                fieldName="exam"
                fieldValue={formik.values.exam}
                label={t("lab.exam")}
                isValid={isValid("exam")}
                errorText={getErrorText("exam")}
                onBlur={onBlurCallback("exam")}
                options={examOptionsSelector(examList)}
                isLoading={examsLoading}
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="row start-sm center-xs bottom-sm">
            <div className="fullWidth patientExamForm__item">
              {currentExamProcedure === "3" && (
                <TextField
                  multiline={true}
                  field={formik.getFieldProps("result")}
                  theme="regular"
                  label={t("lab.result")}
                  isValid={isValid("result")}
                  errorText={getErrorText("result")}
                  onBlur={formik.handleBlur}
                  type="text"
                  disabled={isLoading}
                />
              )}
              {currentExamProcedure === "2" && (
                <ExamRowTable
                  title={t("lab.resultstitle")}
                  headerData={rowTableHeaders}
                  onBlur={onBlurCallbackForTableRow()}
                  rows={examRows}
                  disabled={isLoading}
                />
              )}
              {currentExamProcedure === "1" && (
                <AutocompleteField
                  fieldName="result"
                  fieldValue={formik.values.result}
                  label={t("lab.result")}
                  isValid={isValid("result")}
                  errorText={getErrorText("result")}
                  onBlur={onBlurCallback("result")}
                  options={examRows}
                  isLoading={examRowsLaoding}
                  disabled={currentExamCode === "" || isLoading}
                />
              )}
            </div>
          </div>
          <div className="row start-sm center-xs bottom-sm">
            <div className="fullWidth patientExamForm__item">
              <TextField
                multiline={true}
                field={formik.getFieldProps("note")}
                theme="regular"
                label={t("lab.note")}
                isValid={isValid("note")}
                errorText={getErrorText("note")}
                onBlur={formik.handleBlur}
                type="text"
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="patientExamForm__buttonSet">
            <div className="submit_button">
              <Button type="submit" variant="contained" disabled={isLoading}>
                {creationMode ? t("common.save") : t("common.update")}
              </Button>
            </div>
            <div className="reset_button">
              <Button
                type="reset"
                variant="text"
                disabled={isLoading}
                onClick={() => setOpenResetConfirmation(true)}
              >
                {t("common.reset")}
              </Button>
            </div>
          </div>
          <ConfirmationDialog
            isOpen={openResetConfirmation}
            title={t("common.reset").toUpperCase()}
            info={t("common.resetform")}
            icon={warningIcon}
            primaryButtonLabel={t("common.reset")}
            secondaryButtonLabel={t("common.discard")}
            handlePrimaryButtonClick={handleResetConfirmation}
            handleSecondaryButtonClick={() => setOpenResetConfirmation(false)}
          />
        </form>
      </div>
      {(labStore.createLab.status === "FAIL" ||
        labStore.updateLab.status === "FAIL" ||
        labStore.deleteLab.status === "FAIL") && (
        <div ref={infoBoxRef} className="info-box-container">
          <InfoBox type="error" message={errorMessage} />
        </div>
      )}
      <ConfirmationDialog
        isOpen={isOpen}
        title={creationMode ? t("lab.created") : t("lab.updated")}
        icon={checkIcon}
        info={
          creationMode
            ? t("lab.createsuccess")
            : t("lab.updatesuccess", { code: labToEdit.code })
        }
        primaryButtonLabel="Ok"
        handlePrimaryButtonClick={() => {
          setActivityTransitionState("TO_RESET");
          navigate(PATHS.laboratory);
        }}
        handleSecondaryButtonClick={() => ({})}
      />
    </>
  );
};

export default ExamForm;
