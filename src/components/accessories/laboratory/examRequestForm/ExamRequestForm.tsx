import { Button } from "@mui/material";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import { get, has } from "lodash";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { object, string } from "yup";
import checkIcon from "../../../../assets/check-icon.png";
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
import {
  createLabRequest,
  createLabRequestReset,
} from "../../../../state/laboratories";
import { IState } from "../../../../types";
import AutocompleteField from "../../autocompleteField/AutocompleteField";
import ConfirmationDialog from "../../confirmationDialog/ConfirmationDialog";
import InfoBox from "../../infoBox/InfoBox";
import PatientPicker from "../../patientPicker/PatientPicker";
import { ExamTransitionState } from "../examForm/type";
import "./styles.scss";
import { ExamRequestProps } from "./types";

const ExamRequestForm: FC<ExamRequestProps> = ({
  fields,
  patient,
  handleSuccess,
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [patientData, setPatientData] = useState({} as PatientDTO);
  const exams = useAppSelector((state: IState) => state.exams.examList.data);
  const infoBoxRef = useRef<HTMLDivElement>(null);
  const selectedPatient = useAppSelector(
    (state: IState) => state.patients.selectedPatient.data
  );
  const initialValues = getFromFields(fields, "value");
  const validationSchema = object({
    exam: string().required(t("common.required")),
    patientId: string().when("patient", {
      is: patient,
      then: string().required(t("common.required")),
      otherwise: string(),
    }),
  });
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

  const examList = useAppSelector((state: IState) => state.exams.examList.data);

  const labStore = useAppSelector((state: IState) => state.laboratories);

  const createLabRequestStatus = useAppSelector(
    (state: IState) => state.laboratories.createLabRequest.status
  );

  const [shouldResetForm, setShouldResetForm] = useState(false);
  const [activityTransitionState, setActivityTransitionState] =
    useState<ExamTransitionState>("IDLE");

  useEffect(() => {
    dispatch(createLabRequestReset());
  }, [dispatch]);

  useEffect(() => {
    if (activityTransitionState === "TO_RESET") {
      if (handleSuccess) handleSuccess(false);
      dispatch(createLabRequestReset());
      setShouldResetForm(true);
    }
  }, [dispatch, activityTransitionState, handleSuccess]);

  const onClose = () => {
    if (handleSuccess) handleSuccess(true);
    setActivityTransitionState("TO_RESET");
  };

  const errorMessage = useAppSelector(
    (state) =>
      labStore.createLabRequest.error?.message || t("common.somethingwrong")
  ) as string;

  const onSubmit = (lab: LaboratoryDTO) => {
    setShouldResetForm(false);
    if (!patient) patient = patientData;
    lab.patientCode = patient?.code;
    lab.exam = exams?.find((item) => item.code === lab.exam);
    lab.patName = patient?.firstName + " " + patient?.secondName;
    lab.sex = patient?.sex;
    lab.age = patient?.age;
    lab.labDate = parseDate(lab.labDate ?? new Date().toISOString());
    lab.registrationDate = parseDate(lab.registrationDate ?? "");
    lab.inOutPatient = patientData?.status
      ? patientData.status === "O"
        ? LaboratoryDTOInOutPatientEnum.O
        : LaboratoryDTOInOutPatientEnum.I
      : LaboratoryDTOInOutPatientEnum.O;
    lab.material = "Undefined";
    lab.result = "";
    lab.status = LaboratoryDTOStatusEnum.Draft;

    dispatch(createLabRequest(lab));
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const formattedValues = formatAllFieldValues(fields, values);
      onSubmit(formattedValues);
    },
  });

  const resetFormCallback = useCallback(() => {
    setShouldResetForm(false);
    dispatch(createLabRequestReset());
    setActivityTransitionState("IDLE");
  }, [dispatch]);

  const { setFieldValue, handleBlur, resetForm } = formik;

  useEffect(() => {
    if (shouldResetForm) {
      resetForm();
      resetFormCallback();
    }
  }, [shouldResetForm, resetForm, resetFormCallback]);

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
        } else {
          setFieldValue(fieldName, value?.code ?? "");
          setPatientData(value as PatientDTO);
        }
      },
    [setFieldValue, handleBlur]
  );

  const examsLoading = useAppSelector(
    (state: IState) => state.exams.examList.status === "LOADING"
  );

  const isLoading = createLabRequestStatus === "LOADING";

  return (
    <>
      <div className="patientExamRequestForm">
        <h5 className="">{t("lab.examrequest")}</h5>

        <form
          className="patientExamRequestForm__form"
          onSubmit={formik.handleSubmit}
        >
          <div className="row start-sm center-xs">
            {!patient && (
              <div className="patientExamRequestForm__item col-5">
                <PatientPicker
                  theme={"regular"}
                  fieldName="patientId"
                  initialValue={selectedPatient}
                  fieldValue={formik.values.patientId}
                  label={t("opd.patient")}
                  isValid={isValid("patientId")}
                  errorText={getErrorText("patientId")}
                  onBlur={onBlurCallback("patientId")}
                  enableFocus={false}
                />
              </div>
            )}

            <div className="patientExamRequestForm__item col-5">
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

            <div className="patientExamRequestForm__item col-2">
              <div className="submit_button">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isLoading}
                >
                  {/* <ControlPoint style={{ marginRight: "5px" }} /> */}
                  {t("lab.examrequestbtn")}
                </Button>
              </div>
            </div>

            {createLabRequestStatus === "FAIL" && (
              <div ref={infoBoxRef} className="info-box-container">
                <InfoBox type="error" message={errorMessage} />
              </div>
            )}
            <ConfirmationDialog
              isOpen={createLabRequestStatus === "SUCCESS"}
              title={t("lab.examrequest")}
              icon={checkIcon}
              info={t("lab.examrequestcreated")}
              primaryButtonLabel="Ok"
              handlePrimaryButtonClick={onClose}
              handleSecondaryButtonClick={() => ({})}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default ExamRequestForm;
