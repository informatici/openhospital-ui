import { useFormik } from "formik";
import { get, has } from "lodash";
import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { object, string } from "yup";
import warningIcon from "../../../../../assets/warning-icon.png";
import {
  formatAllFieldValues,
  getFromFields,
} from "../../../../../libraries/formDataHandling/functions";
import checkIcon from "../../../../../assets/check-icon.png";
import Button from "../../../button/Button";
import ConfirmationDialog from "../../../confirmationDialog/ConfirmationDialog";
import TextField from "../../../textField/TextField";
import "./styles.scss";
import { IDiseaseProps } from "./types";
import CheckboxField from "../../../checkboxField/CheckboxField";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../../../../types";
import InfoBox from "../../../infoBox/InfoBox";
import { useNavigate } from "react-router";
import { IDiseaseState } from "../../../../../state/diseases/types";
import { PATHS } from "../../../../../consts";
import {
  createDiseaseReset,
  updateDiseaseReset,
} from "../../../../../state/diseases/actions";
import AutocompleteField from "../../../autocompleteField/AutocompleteField";
import { getDiseaseTypes } from "../../../../../state/types/diseases";

const DiseaseForm: FC<IDiseaseProps> = ({
  fields,
  onSubmit,
  creationMode,
  submitButtonLabel,
  resetButtonLabel,
  isLoading,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const infoBoxRef = useRef<HTMLDivElement>(null);
  const [openResetConfirmation, setOpenResetConfirmation] = useState(false);

  const diseaseStore = useSelector<IState, IDiseaseState>(
    (state) => state.diseases
  );

  const diseasesTypeState = useSelector(
    (state: IState) => state.types.diseases.getAll
  );

  const diseasesTypeOptions = useMemo(
    () =>
      diseasesTypeState.data?.map((item) => ({
        value: item.code,
        label: item.description,
      })) ?? [],
    [diseasesTypeState.data]
  );

  const errorMessage = useMemo(
    () =>
      (creationMode
        ? diseaseStore.create.error?.message
        : diseaseStore.update.error?.message) ?? t("common.somethingwrong"),
    [
      creationMode,
      t,
      diseaseStore.create.error?.message,
      diseaseStore.update.error?.message,
    ]
  );

  const initialValues = getFromFields(fields, "value");

  const validationSchema = object({
    code: string().required(t("common.required")),
    description: string().required(t("common.required")),
    diseaseType: string().required(t("common.required")),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const formattedValues = formatAllFieldValues(fields, values);
      formattedValues.diseaseType = diseasesTypeState.data?.find(
        (item) => item.code === values.diseaseType
      );
      onSubmit(formattedValues as any);
    },
  });

  const { setFieldValue, handleBlur } = formik;

  const isValid = (fieldName: string): boolean => {
    return has(formik.touched, fieldName) && has(formik.errors, fieldName);
  };

  const getErrorText = (fieldName: string): string => {
    return has(formik.touched, fieldName)
      ? (get(formik.errors, fieldName) as string)
      : "";
  };

  const handleResetConfirmation = () => {
    setOpenResetConfirmation(false);
    navigate(-1);
  };

  const handleCheckboxChange = useCallback(
    (fieldName: string) => (value: boolean) => {
      setFieldValue(fieldName, value ? "true" : "false");
    },
    [setFieldValue]
  );

  const onBlurCallback = useCallback(
    (fieldName: string) =>
      (e: React.FocusEvent<HTMLDivElement>, value: string) => {
        handleBlur(e);
        setFieldValue(fieldName, value);
      },
    [handleBlur, setFieldValue]
  );

  const cleanUp = useCallback(() => {
    if (creationMode) {
      dispatch(createDiseaseReset());
    } else {
      dispatch(updateDiseaseReset());
    }
  }, [creationMode, dispatch]);

  useEffect(() => {
    dispatch(getDiseaseTypes());
  }, [dispatch]);

  useEffect(() => {
    return cleanUp;
  }, [cleanUp]);

  return (
    <div className="diseaseForm">
      <form className="diseaseForm__form" onSubmit={formik.handleSubmit}>
        <div className="row start-sm center-xs">
          <div className="diseaseForm__item">
            <TextField
              field={formik.getFieldProps("code")}
              theme="regular"
              label={t("disease.code")}
              isValid={isValid("code")}
              errorText={getErrorText("code")}
              onBlur={formik.handleBlur}
              type="text"
              disabled={isLoading || !creationMode}
            />
          </div>
          <div className="diseaseForm__item">
            <AutocompleteField
              fieldName="diseaseType"
              fieldValue={formik.values.diseaseType}
              label={t("disease.diseaseType")}
              isValid={isValid("diseaseType")}
              errorText={getErrorText("diseaseType")}
              onBlur={onBlurCallback("diseaseType")}
              options={diseasesTypeOptions}
              loading={diseasesTypeState.status === "LOADING"}
              disabled={isLoading}
            />
          </div>
          <div className="diseaseForm__item">
            <TextField
              field={formik.getFieldProps("description")}
              theme="regular"
              label={t("disease.name")}
              isValid={isValid("description")}
              errorText={getErrorText("description")}
              onBlur={formik.handleBlur}
              type="text"
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="row start-sm center-xs">
          <div className="diseaseForm__item">
            <CheckboxField
              fieldName={"opdInclude"}
              checked={formik.values.opdInclude === "true"}
              label={t("disease.opdInclude")}
              onChange={handleCheckboxChange("opdInclude")}
            />
          </div>
          <div className="diseaseForm__item">
            <CheckboxField
              fieldName={"ipdInInclude"}
              checked={formik.values.ipdInInclude === "true"}
              label={t("disease.ipdInInclude")}
              onChange={handleCheckboxChange("ipdInInclude")}
            />
          </div>
          <div className="diseaseForm__item">
            <CheckboxField
              fieldName={"ipdOutInclude"}
              checked={formik.values.ipdOutInclude === "true"}
              label={t("disease.ipdOutInclude")}
              onChange={handleCheckboxChange("ipdOutInclude")}
            />
          </div>
        </div>

        <div className="diseaseForm__buttonSet">
          <div className="submit_button">
            <Button type="submit" variant="contained" disabled={isLoading}>
              {submitButtonLabel}
            </Button>
          </div>
          <div className="reset_button">
            <Button
              type="reset"
              variant="text"
              disabled={isLoading}
              onClick={() => setOpenResetConfirmation(true)}
            >
              {resetButtonLabel}
            </Button>
          </div>
        </div>
        <ConfirmationDialog
          isOpen={openResetConfirmation}
          title={resetButtonLabel.toUpperCase()}
          info={t("common.resetform")}
          icon={warningIcon}
          primaryButtonLabel={t("common.ok")}
          secondaryButtonLabel={t("common.discard")}
          handlePrimaryButtonClick={handleResetConfirmation}
          handleSecondaryButtonClick={() => setOpenResetConfirmation(false)}
        />
        {(creationMode
          ? diseaseStore.create.status === "FAIL"
          : diseaseStore.update.status === "FAIL") && (
          <div ref={infoBoxRef} className="info-box-container">
            <InfoBox type="error" message={errorMessage} />
          </div>
        )}
        <ConfirmationDialog
          isOpen={
            !!(creationMode
              ? diseaseStore.create.hasSucceeded
              : diseaseStore.update.hasSucceeded)
          }
          title={creationMode ? t("disease.created") : t("disease.updated")}
          icon={checkIcon}
          info={
            creationMode
              ? t("disease.createSuccess")
              : t("disease.updateSuccess", { code: formik.values.code })
          }
          primaryButtonLabel="Ok"
          handlePrimaryButtonClick={() => {
            navigate(PATHS.admin_diseases);
          }}
          handleSecondaryButtonClick={() => ({})}
        />
      </form>
    </div>
  );
};

export default DiseaseForm;
