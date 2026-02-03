import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import { get, has } from "lodash";
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import checkIcon from "../../../../assets/check-icon.png";
import {
  AdmissionTypeDTO,
  DiseaseDTO,
  DiseaseTypeDTO,
  WardDTO,
} from "../../../../generated";
import {
  differenceInDays,
  formatAllFieldValues,
  getFromFields,
} from "../../../../libraries/formDataHandling/functions";
import { updateAdmissionReset } from "../../../../state/admissions";
import { getPatient } from "../../../../state/patients";
import { IState } from "../../../../types";
import AutocompleteField from "../../autocompleteField/AutocompleteField";
import Button from "../../button/Button";
import ConfirmationDialog from "../../confirmationDialog/ConfirmationDialog";
import DateField from "../../dateField/DateField";
import InfoBox from "../../infoBox/InfoBox";
import TextField from "../../textField/TextField";
import { initialFields } from "./consts";
import { IOwnProps, TActivityTransitionState } from "./types";

export const CurrentAdmissionForm: FunctionComponent<IOwnProps> = ({
  onDiscard,
  onSubmit,
  fields,
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [activityTransitionState, setActivityTransitionState] =
    useState<TActivityTransitionState>("IDLE");
  const patient = useAppSelector(
    (state) => state.patients.selectedPatient.data
  );
  const currentAdmission = useAppSelector(
    (state: IState) => state.admissions.currentAdmissionByPatientId.data
  );
  const status = useAppSelector(
    (state) => state.admissions.updateAdmission.status
  );

  const errorMessage = useAppSelector(
    (state) =>
      state.patients.updatePatient.error?.message || t("common.somethingwrong")
  );

  const diagnosisInList = useAppSelector(
    (state: IState) => state.diseases.diseasesIpdIn.data
  );

  const admissionTypes = useAppSelector(
    (state: IState) => state.types.admissions.getAll.data
  );
  const wards = useAppSelector((state: IState) => state.wards.allWards.data);
  const diagnosisInStatus = useAppSelector(
    (state: IState) => state.diseases.diseasesIpdIn.status
  );
  const wardStatus = useAppSelector(
    (state: IState) => state.wards.allWards.status
  );
  const admTypeStatus = useAppSelector(
    (state: IState) => state.types.admissions.getAll.status
  );

  const renderOptions = (
    data:
      | (
          | WardDTO
          | DiseaseDTO
          | AdmissionTypeDTO
          | DiseaseTypeDTO
          | DiseaseDTO
        )[]
      | undefined
  ) => {
    if (data) {
      return data.map((item) => {
        return {
          value: item.code?.toString() ?? "",
          label: item.description ?? "",
        };
      });
    } else return [];
  };

  const formik = useFormik({
    initialValues: getFromFields(fields, "value"),
    enableReinitialize: true,
    onSubmit: (values) => {
      const formattedValues = formatAllFieldValues(
        initialFields(currentAdmission),
        values
      );
      formattedValues.diseaseIn = diagnosisInList?.find(
        (item) => item.code === formattedValues.diseaseIn
      );
      formattedValues.admType = admissionTypes?.find(
        (item) => item.code === formattedValues.admType
      );
      formattedValues.type = formattedValues.admType?.code;
      formattedValues.ward = wards?.find(
        (item) => item.code === formattedValues.ward
      );
      onSubmit({
        ...currentAdmission,
        ...formattedValues,
      } as any);
    },
  });

  useEffect(() => {
    if (activityTransitionState === "TO_RESET") {
      dispatch(updateAdmissionReset());
      if (patient?.code) {
        dispatch(getPatient(patient?.code?.toString()));
      }
      onDiscard();
    }
  }, [dispatch, activityTransitionState, patient, onDiscard]);

  const { setFieldValue, handleBlur } = formik;

  const isValid = (fieldName: string): boolean => {
    return has(formik.touched, fieldName) && has(formik.errors, fieldName);
  };

  const getErrorText = (fieldName: string): string => {
    return has(formik.touched, fieldName)
      ? (get(formik.errors, fieldName) as string)
      : "";
  };

  const dateFieldHandleOnChange = useCallback(
    (fieldName: string) => (value: any) => {
      setFieldValue(fieldName, value);
      formik.setFieldTouched(fieldName);
      const days = differenceInDays(
        new Date(formik.values.admDate),
        new Date(formik.values.disDate)
      ).toString();
      setFieldValue("bedDays", days);
    },
    [formik, setFieldValue]
  );

  const onBlurCallback = useCallback(
    (fieldName: string) =>
      (e: React.FocusEvent<HTMLDivElement>, value: string) => {
        handleBlur(e);
        setFieldValue(fieldName, value);
      },
    [setFieldValue, handleBlur]
  );

  const isLoading = status === "LOADING";

  return (
    <>
      <form className="currentAdmissionForm" onSubmit={formik.handleSubmit}>
        <div className="row start-sm center-xs">
          <div className="currentAdmissionForm__item">
            <AutocompleteField
              fieldName="ward"
              fieldValue={formik.values.ward}
              label={t("admission.ward")}
              isValid={isValid("ward")}
              errorText={getErrorText("ward")}
              onBlur={onBlurCallback("ward")}
              options={renderOptions(wards)}
              loading={wardStatus === "LOADING"}
              disabled={isLoading}
            />
          </div>
          <div className="currentAdmissionForm__item">
            <TextField
              field={formik.getFieldProps("fhu")}
              theme="regular"
              label={t("admission.fhu")}
              isValid={isValid("fhu")}
              errorText={getErrorText("fhu")}
              onBlur={formik.handleBlur}
              type="text"
              disabled={isLoading}
            />
          </div>
          <div className="currentAdmissionForm__item">
            <DateField
              fieldName="admDate"
              fieldValue={formik.values.admDate}
              disableFuture={true}
              theme="regular"
              format="dd/MM/yyyy"
              isValid={isValid("admDate")}
              errorText={getErrorText("admDate")}
              label={t("admission.admDate")}
              onChange={dateFieldHandleOnChange("admDate")}
              disabled={isLoading}
            />
          </div>
          <div className="currentAdmissionForm__item">
            <AutocompleteField
              fieldName="admType"
              fieldValue={formik.values.admType}
              label={t("admission.admType")}
              isValid={isValid("admType")}
              errorText={getErrorText("admType")}
              onBlur={onBlurCallback("admType")}
              options={renderOptions(admissionTypes)}
              loading={admTypeStatus === "LOADING"}
              disabled={isLoading}
            />
          </div>
          <div className="currentAdmissionForm__item">
            <AutocompleteField
              fieldName="diseaseIn"
              fieldValue={formik.values.diseaseIn}
              label={t("admission.diseaseIn")}
              isValid={isValid("diseaseIn")}
              errorText={getErrorText("diseaseIn")}
              onBlur={onBlurCallback("diseaseIn")}
              options={renderOptions(diagnosisInList)}
              loading={diagnosisInStatus === "LOADING"}
              disabled={isLoading}
            />
          </div>
          <div className="fullWidth currentAdmissionForm__item">
            <TextField
              field={formik.getFieldProps("note")}
              theme="regular"
              label={t("admission.note")}
              multiline={true}
              type="text"
              isValid={isValid("note")}
              errorText={getErrorText("note")}
              onBlur={formik.handleBlur}
              rows={5}
              disabled={isLoading}
            />
          </div>
        </div>
        <div className="currentAdmissionForm__buttonSet">
          <div className="submit_button">
            <Button type="submit" variant="contained" disabled={isLoading}>
              {t("patient.savechanges")}
            </Button>
          </div>
          <div className="reset_button">
            <Button
              variant="text"
              disabled={isLoading}
              onClick={onDiscard}
              type={undefined}
            >
              {t("patient.discardchanges")}
            </Button>
          </div>
        </div>
      </form>
      {status === "FAIL" && (
        <div>
          <InfoBox type="error" message={errorMessage} />
        </div>
      )}
      <ConfirmationDialog
        isOpen={status === "SUCCESS"}
        title={t("patient.dataupdated")}
        icon={checkIcon}
        info={t("patient.dataupdatedsuccessfully")}
        primaryButtonLabel={t("common.ok")}
        handlePrimaryButtonClick={() => setActivityTransitionState("TO_RESET")}
        handleSecondaryButtonClick={() => {}}
      />
    </>
  );
};
