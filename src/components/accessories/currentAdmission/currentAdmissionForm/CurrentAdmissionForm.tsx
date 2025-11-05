import { Autocomplete } from "components/accessories/autocomplete";
import CheckboxField from "components/accessories/checkboxField/CheckboxField";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import { useTransportation } from "libraries/hooks/useTransporation";
import { Permission } from "libraries/permissionUtils/Permission";
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
import {
  getTransportations,
  updateAdmissionReset,
} from "../../../../state/admissions";
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

  const [isAlertReceivedChecked, setIsIronSupplementChecked] = useState(false);

  const [isReferenceSheetChecked, setIsFolicAcidSupplementChecked] =
    useState(false);

  const [isQualifiedAgentChecked, setIsVitASupplementChecked] = useState(false);

  const transportationsOptions = useAppSelector(
    (state: IState) => state.admissions.getTransportations.data
  );

  const { options: transportationOptions } = useTransportation(
    transportationsOptions
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
      formattedValues.alertReceived = isAlertReceivedChecked ? true : false;
      formattedValues.referenceSheet = isReferenceSheetChecked ? true : false;
      formattedValues.qualifiedAgent = isQualifiedAgentChecked ? true : false;
      formattedValues.transportation = formik.values.transportation;
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

  useEffect(() => {
    setIsIronSupplementChecked(
      formik.values.alertReceived === "true" ? true : false
    );
    setIsFolicAcidSupplementChecked(
      formik.values.referenceSheet === "true" ? true : false
    );
    setIsVitASupplementChecked(
      formik.values.qualifiedAgent === "true" ? true : false
    );
    dispatch(getTransportations());
  }, [
    formik.values.alertReceived,
    formik.values.referenceSheet,
    formik.values.qualifiedAgent,
    dispatch,
  ]);

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

  const handleAlertReceivedChecked = () => {
    setIsIronSupplementChecked(!isAlertReceivedChecked);
  };

  const handleReferenceSheetChecked = () => {
    setIsFolicAcidSupplementChecked(!isReferenceSheetChecked);
  };

  const handleQualifiedAgentChecked = () => {
    setIsVitASupplementChecked(!isQualifiedAgentChecked);
  };

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
              format="dd/MM/yyyy HH:mm"
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
            <Autocomplete
              id="transportation"
              freeSolo
              value={formik.values.transportation}
              options={transportationOptions ?? []}
              onChange={(_, value) => {
                formik.setFieldValue("transportation", value);
              }}
              label={t("admission.transportation")}
              placeholder={t("admission.transportation")}
            />
          </div>
          <div className="row start-sm center-xs">
            <div className="currentAdmissionForm__supplementRow">
              <div className="currentAdmissionForm__item">
                <CheckboxField
                  fieldName="alertReceived"
                  label={t("patient.alertReceived")}
                  checked={isAlertReceivedChecked}
                  onChange={handleAlertReceivedChecked}
                />
              </div>
              <div className="currentAdmissionForm__item">
                <CheckboxField
                  fieldName="referenceSheet"
                  label={t("patient.referenceSheet")}
                  checked={isReferenceSheetChecked}
                  onChange={handleReferenceSheetChecked}
                />
              </div>
              <div className="currentAdmissionForm__item">
                <CheckboxField
                  fieldName="qualifiedAgent"
                  label={t("patient.qualifiedAgent")}
                  checked={isQualifiedAgentChecked}
                  onChange={handleQualifiedAgentChecked}
                />
              </div>
            </div>
          </div>
          <Permission require="admissions.fullaccess">
            <>
              <div className="fullWidth currentAdmissionForm__item">
                <TextField
                  field={formik.getFieldProps("entryReason")}
                  theme="regular"
                  label={t("admission.entryReason")}
                  multiline={true}
                  type="text"
                  isValid={isValid("entryReason")}
                  errorText={getErrorText("entryReason")}
                  onBlur={formik.handleBlur}
                  rows={1}
                  disabled={isLoading}
                  maxLength={2000}
                />
              </div>
              <div className="fullWidth currentAdmissionForm__item">
                <TextField
                  field={formik.getFieldProps("anamnesis")}
                  theme="regular"
                  label={t("admission.anamnesis")}
                  multiline={true}
                  type="text"
                  isValid={isValid("anamnesis")}
                  errorText={getErrorText("anamnesis")}
                  onBlur={formik.handleBlur}
                  rows={5}
                  disabled={isLoading}
                  maxLength={2000}
                />
              </div>
              <div className="fullWidth currentAdmissionForm__item">
                <TextField
                  field={formik.getFieldProps("preTreatment")}
                  theme="regular"
                  label={t("admission.preTreatment")}
                  multiline={true}
                  type="text"
                  isValid={isValid("preTreatment")}
                  errorText={getErrorText("preTreatment")}
                  onBlur={formik.handleBlur}
                  rows={3}
                  disabled={isLoading}
                  maxLength={2000}
                />
              </div>
              <div className="fullWidth currentAdmissionForm__item">
                <TextField
                  field={formik.getFieldProps("preAssessment")}
                  theme="regular"
                  label={t("admission.preAssessment")}
                  multiline={true}
                  type="text"
                  isValid={isValid("preAssessment")}
                  errorText={getErrorText("preAssessment")}
                  onBlur={formik.handleBlur}
                  rows={3}
                  disabled={isLoading}
                  maxLength={2000}
                />
              </div>
              <div className="fullWidth currentAdmissionForm__item">
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
            </>
          </Permission>
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
