import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
  useMemo,
} from "react";
import { useFormik } from "formik";
import {
  formatAllFieldValues,
  getFromFields,
} from "../../../../libraries/formDataHandling/functions";
import DateField from "../../dateField/DateField";
import { object, string } from "yup";
import ConfirmationDialog from "../../confirmationDialog/ConfirmationDialog";
import Button from "../../button/Button";
import warningIcon from "../../../../assets/warning-icon.png";
import TextField from "../../textField/TextField";
import has from "lodash.has";
import get from "lodash.get";
import "./styles.scss";
import { useTranslation } from "react-i18next";
import { TProps } from "./types";
import { IState } from "../../../../types";
import { useDispatch, useSelector } from "react-redux";
import AutocompleteField from "../../autocompleteField/AutocompleteField";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import {
  DiseaseDTO,
  OpdWithOperationRowDTO,
  OperationRowDTO,
  WardDTO,
} from "../../../../generated";
import moment from "moment";
import { renderDate } from "../../../../libraries/formatUtils/dataFormatting";
import CheckboxField from "../../checkboxField/CheckboxField";
import { isEmpty } from "lodash";
import AddIcon from "@material-ui/icons/Add";
import FileIcon from "@material-ui/icons/Label";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { CustomDialog } from "../../customDialog/CustomDialog";
import ContentCutIcon from "../../icons/content-cut";
import OperationRowForm from "../../patientOperation/operationForm/OperationRowForm";
import {
  createOperationRowReset,
  deleteOperationRow,
  deleteOperationRowReset,
  getOperations,
  updateOperationRowReset,
} from "../../../../state/operations/actions";
import { IOperationState } from "../../../../state/operations/types";
import checkIcon from "../../../../assets/check-icon.png";
import { opRowFields } from "../../patientOperation/opRowFields";
import InfoBox from "../../infoBox/InfoBox";
import { Add, Edit } from "@material-ui/icons";
import { getWards } from "../../../../state/ward/actions";

const PatientOPDForm: FunctionComponent<TProps> = ({
  fields,
  onSubmit,
  creationMode,
  submitButtonLabel,
  resetButtonLabel,
  isLoading,
  shouldResetForm,
  resetFormCallback,
  operationRowsToEdit,
}) => {
  const { t } = useTranslation();
  const [operationCreationMode, setOperationCreationMode] = useState(true);
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState<boolean>(true);

  const validationSchema = object({
    date: string()
      .required(t("common.required"))
      .test({
        name: "date",
        message: t("common.invaliddate"),
        test: function (value) {
          return moment(value).isValid();
        },
      }),
    ward: string().required(t("common.required")),
    disease: string().required(t("common.required")),
    disease2: string().test({
      name: "disease2",
      message: t("opd.validatedisease"),
      test: function (value) {
        return !value || (this.parent.disease && value !== this.parent.disease);
      },
    }),
    disease3: string().test({
      name: "disease3",
      message: t("opd.validatedisease"),
      test: function (value) {
        return (
          !value ||
          (this.parent.disease &&
            this.parent.disease2 &&
            value !== this.parent.disease &&
            value !== this.parent.disease2)
        );
      },
    }),
  });

  const initialValues = getFromFields(fields, "value");

  const diseases = useSelector<IState, DiseaseDTO[]>(
    (state: IState) => state.diseases.diseasesOpd.data ?? []
  );

  const wards = useSelector<IState, WardDTO[]>(
    (state: IState) => state.wards.allWards.data ?? []
  );

  const username = useSelector(
    (state: IState) => state.main.authentication.data?.username
  );
  const [operationRows, setOperationRows] = useState([] as OperationRowDTO[]);

  useEffect(() => {
    setOperationRows((state) =>
      operationRowsToEdit ? [...operationRowsToEdit] : state
    );
  }, [operationRowsToEdit]);

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const formattedValues = formatAllFieldValues(fields, values);
      const opdToSave: any = {
        ...formattedValues,
        referralFrom: isEmpty(formattedValues.referralFrom)
          ? undefined
          : formattedValues.referralFrom,
        referralTo: isEmpty(formattedValues.referralTo)
          ? undefined
          : formattedValues.referralTo,
        date: formattedValues.date,
        ward: wards.find((e) => e.code === formik.values.ward),
        disease: diseases.find((e) => e.code === formik.values.disease),
        disease2: diseases.find((e) => e.code === formik.values.disease2),
        disease3: diseases.find((e) => e.code === formik.values.disease3),
      };
      const combinedValues = {
        opdDTO: opdToSave,
        operationRows,
      } as OpdWithOperationRowDTO;
      onSubmit(combinedValues);
    },
  });

  const [showModal, setShowModal] = useState(false);

  const { setFieldValue, resetForm, handleBlur } = formik;

  const dateFieldHandleOnChange = useCallback(
    (fieldName: string) => (value: any) => {
      setFieldValue(fieldName, value);
      formik.setFieldTouched(fieldName);
    },
    [setFieldValue]
  );

  const diseasesOptionsSelector = (state: IState) => {
    return state.diseases.diseasesOpd.data
      ? state.diseases.diseasesOpd.data.map((item) => {
          return {
            value: item.code ?? "",
            label: item.description ?? "",
          };
        })
      : [];
  };

  const diseasesOptions = useSelector<
    IState,
    { value: string; label: string }[]
  >((state: IState) => diseasesOptionsSelector(state));

  const wardsOptionsSelector = (state: IState) => {
    return state.wards.allWards.data
      ? state.wards.allWards.data
          .filter((ward) => ward.opd)
          .map((item) => {
            return {
              value: item.code ?? "",
              label: item.description ?? "",
            };
          })
      : [];
  };
  const wardsOptions = useSelector<IState, { value: string; label: string }[]>(
    (state: IState) => wardsOptionsSelector(state)
  );

  const isValid = (fieldName: string): boolean => {
    return has(formik.touched, fieldName) && has(formik.errors, fieldName);
  };

  const getErrorText = (fieldName: string): string => {
    return has(formik.touched, fieldName)
      ? (get(formik.errors, fieldName) as string)
      : "";
  };

  const [openResetConfirmation, setOpenResetConfirmation] = useState(false);

  const handleResetConfirmation = () => {
    setOpenResetConfirmation(false);
    resetForm();
    resetFormCallback();
  };

  useEffect(() => {
    dispatch(getOperations());
    dispatch(getWards());
  }, [dispatch]);

  const onBlurCallback = useCallback(
    (fieldName: string) =>
      (e: React.FocusEvent<HTMLDivElement>, value: string) => {
        handleBlur(e);
        setFieldValue(fieldName, value);
      },
    [setFieldValue, handleBlur]
  );

  const handleCheckboxChange = useCallback(
    (fieldName: string) => (value: boolean) => {
      setFieldValue(fieldName, value ? "R" : "");
    },
    [setFieldValue]
  );

  const onOperationCreated = () => {
    setShowModal(false);
  };

  const onAddOperation = () => {
    setOperationCreationMode(true);
    setShowModal(true);
  };

  const [openDeleteOperationConfirmation, setOpenDeleteOperationConfirmation] =
    useState(false);
  const [deletedObjCode, setDeletedObjCode] = useState(-1);
  const [isChecked, setIsChecked] = useState(false);
  const handleAddChecboxChange = (event: any) => {
    setIsChecked(event.target.checked);
  };
  const handleRemoveOperationRow = (value: OperationRowDTO) => () => {
    if (value.id && value.id !== 0) {
      //The operation row has to be removed from api
      setDeletedObjCode(value.id);
      setOpenDeleteOperationConfirmation(true);
    } else {
      const ops = [...operationRows];
      const idx = operationRows.findIndex((item) => item.id === deletedObjCode);
      ops.splice(idx, 1);
      setOperationRows(() => [...ops]);
    }
  };
  const [addOperationLoading, setAddOperationLoading] = useState(false);
  const [shouldResetOperationForm, setShouldResetOperationForm] =
    useState(false);
  const [opRowToEdit, setOpRowToEdit] = useState({} as OperationRowDTO);
  const [indexToEdit, setIndexToEdit] = useState(-1);

  const resetOperationFormCallback = () => {
    setShouldResetOperationForm(false);
    setOperationCreationMode(true);
    dispatch(createOperationRowReset());
    dispatch(updateOperationRowReset());
    dispatch(deleteOperationRowReset());
  };

  const handleAddOperationRow = (values: OperationRowDTO) => {
    setAddOperationLoading(true);
    let opRow: OperationRowDTO = values;
    opRow.prescriber = username ?? "";
    setTimeout(() => {
      if (operationCreationMode) {
        opRow.id = 0;
        setOperationRows((state) => [
          ...state,
          { ...opRow, opResult: "unknown" },
        ]);
      } else {
        if (indexToEdit > -1) operationRows[indexToEdit] = opRow;
      }
      if (!isChecked) {
        setShowModal(false);
      } else setShouldResetOperationForm(true);
      setAddOperationLoading(false);
    }, 500);
  };

  const operationStore = useSelector<IState, IOperationState>(
    (state: IState) => state.operations
  );

  const operationsRowFields = useMemo(() => {
    return opRowFields(
      operationCreationMode
        ? {
            opDate: formik.values?.date,
            prescriber: "",
            opResult: "",
          }
        : opRowToEdit
    );
  }, [operationCreationMode, opRowToEdit]);

  const handleUpdateOperationRow =
    (value: OperationRowDTO, index: number) => () => {
      setOpRowToEdit(value);
      setIndexToEdit(index);
      setOperationCreationMode(false);
      setShowModal(true);
    };

  const errorMessage = useSelector<IState>(
    (state) =>
      state.operations.deleteOperationRow.error?.message ||
      t("common.somethingwrong")
  ) as string;

  const changeStatus = useSelector<IState, string | undefined>((state) => {
    return state.operations.deleteOperationRow.status;
  });

  useEffect(() => {
    if (shouldResetForm) {
      resetForm();
      resetFormCallback();
    }
  }, [shouldResetForm, resetForm, resetFormCallback]);

  useEffect(() => {
    if (changeStatus === "SUCCESS") {
      const ops = [...operationRows];
      const idx = ops.findIndex((item) => item.id === deletedObjCode);
      if (idx > -1) ops.splice(idx, 1);
      setOperationRows(() => [...ops]);
    }
  }, [changeStatus]);

  return (
    <>
      <div className="patientOpdForm">
        <Accordion expanded={expanded}>
          <AccordionSummary onClick={() => setExpanded(!expanded)}>
            {creationMode ? (
              <>
                <Add fontSize="small" />
                {t("opd.newopd")}
              </>
            ) : (
              <>
                <Edit fontSize="small" />
                {t("opd.editopd") + ": " + renderDate(formik.values.date)}
              </>
            )}
          </AccordionSummary>
          <AccordionDetails>
            <form
              className="patientOpdForm__form"
              onSubmit={formik.handleSubmit}
            >
              <div className="row start-sm center-xs">
                <div className="patientOpdForm__item">
                  <FormControl component="fieldset">
                    <FormLabel component="legend">
                      {t("opd.newpatient")}
                    </FormLabel>
                    <RadioGroup
                      aria-label="newpatient"
                      name="newpatient"
                      value={formik.values["newPatient"]}
                      onChange={(event) => {
                        formik.setFieldValue("newPatient", event.target.value);
                      }}
                    >
                      <FormControlLabel
                        value="R"
                        control={<Radio />}
                        label={t("opd.reattendance")}
                        checked={formik.values["newPatient"] === "R"}
                      />
                      <FormControlLabel
                        value="N"
                        control={<Radio />}
                        label={t("opd.newattendance")}
                        checked={formik.values["newPatient"] === "N"}
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
              </div>
              <div className="row start-sm center-xs">
                <div className="patientOpdForm__item fullWidth">
                  <div className="checkboxes">
                    <CheckboxField
                      fieldName={"referralFrom"}
                      checked={formik.values.referralFrom === "R"}
                      label={t("opd.referralfrom")}
                      onChange={handleCheckboxChange("referralFrom")}
                    />
                    <CheckboxField
                      fieldName={"referralTo"}
                      checked={formik.values.referralTo === "R"}
                      label={t("opd.referralto")}
                      onChange={handleCheckboxChange("referralTo")}
                    />
                  </div>
                </div>
              </div>
              <div className="row start-sm center-xs">
                <div className="patientOpdForm__item">
                  <DateField
                    fieldName="date"
                    fieldValue={formik.values.date}
                    disableFuture={true}
                    theme="regular"
                    format="dd/MM/yyyy"
                    isValid={isValid("date")}
                    errorText={getErrorText("date")}
                    label={t("opd.dateopd")}
                    onChange={dateFieldHandleOnChange("date")}
                    disabled={isLoading}
                  />
                </div>
                <div className="patientOpdForm__item">
                  <AutocompleteField
                    fieldName="ward"
                    fieldValue={formik.values.ward}
                    label={t("visit.ward")}
                    isValid={isValid("ward")}
                    errorText={getErrorText("ward")}
                    onBlur={onBlurCallback("ward")}
                    options={wardsOptions}
                    disabled={isLoading}
                  />
                </div>
              </div>
              <div className="row start-sm center-xs">
                <div className="patientOpdForm__item fullWidth">
                  <TextField
                    field={formik.getFieldProps("note")}
                    multiline={true}
                    theme="regular"
                    label={t("opd.note")}
                    isValid={isValid("note")}
                    errorText={getErrorText("note")}
                    onBlur={formik.handleBlur}
                    type="string"
                    disabled={isLoading}
                    maxLength={65535}
                  />
                </div>
              </div>
              <div className="row start-sm center-xs">
                <div className="patientOpdForm__item fullWidth">
                  <AutocompleteField
                    fieldName="disease"
                    fieldValue={formik.values.disease}
                    label={t("opd.disease1")}
                    isValid={isValid("disease")}
                    errorText={getErrorText("disease")}
                    onBlur={onBlurCallback("disease")}
                    options={diseasesOptions}
                    disabled={isLoading}
                  />
                </div>
              </div>
              <div className="row start-sm center-xs">
                <div className="patientOpdForm__item fullWidth">
                  <AutocompleteField
                    fieldName="disease2"
                    fieldValue={formik.values.disease2}
                    label={t("opd.disease2")}
                    isValid={isValid("disease2")}
                    errorText={getErrorText("disease2")}
                    onBlur={onBlurCallback("disease2")}
                    options={diseasesOptions}
                    disabled={isLoading}
                  />
                </div>
              </div>
              <div className="row start-sm center-xs">
                <div className="patientOpdForm__item fullWidth">
                  <AutocompleteField
                    fieldName="disease3"
                    fieldValue={formik.values.disease3}
                    label={t("opd.disease3")}
                    isValid={isValid("disease3")}
                    errorText={getErrorText("disease3")}
                    onBlur={onBlurCallback("disease3")}
                    options={diseasesOptions}
                    disabled={isLoading}
                  />
                </div>
              </div>
              <div className="row start-sm center-xs">
                <div className="patientOpdForm__item fullWidth">
                  <TextField
                    field={formik.getFieldProps("prescription")}
                    multiline={true}
                    theme="regular"
                    label={t("opd.prescription")}
                    isValid={isValid("prescription")}
                    errorText={getErrorText("prescription")}
                    onBlur={formik.handleBlur}
                    type="string"
                    disabled={isLoading}
                    maxLength={255}
                  />
                </div>
              </div>
              <div className="row start-sm center-xs">
                <div className="patientOpdForm__item fullWidth">
                  <details open>
                    <summary>
                      {" "}
                      <ContentCutIcon
                        fontSize="small"
                        className="operation_icon"
                      />{" "}
                      Patient Operations
                    </summary>
                    <List dense={true} className="opd_operations">
                      {operationRows.map((value, index: number) => (
                        <ListItem key={index}>
                          <ListItemIcon>
                            <FileIcon color="secondary" />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              value.operation?.code +
                              " " +
                              value.operation?.description
                            }
                            secondary={renderDate(value.opDate!)}
                          />
                          <ListItemSecondaryAction>
                            <IconButton
                              onClick={handleRemoveOperationRow(value)}
                              edge="end"
                              aria-label="delete"
                            >
                              <DeleteIcon color="primary" />
                            </IconButton>
                            <IconButton
                              onClick={handleUpdateOperationRow(value, index)}
                              edge="end"
                              aria-label="update"
                            >
                              <EditIcon color="secondary" />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      ))}
                      {changeStatus === "FAIL" && (
                        <div className="info-box-container">
                          <InfoBox type="error" message={errorMessage} />
                        </div>
                      )}
                      {operationRows.length <= 0 && (
                        <span className="empty_operation_rows">
                          {t("operation.noitemaddedyet")}
                        </span>
                      )}
                    </List>
                  </details>
                </div>
              </div>
              <div className="patientOpdForm__buttonSet">
                <div className="visits_button">
                  <div className="submit_button">
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={isLoading}
                    >
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
                <div className="add_button">
                  <Button
                    type="button"
                    onClick={() => onAddOperation()}
                    disabled={false}
                  >
                    {" "}
                    <AddIcon fontSize="small" />
                    {t("button.addoperation")}
                  </Button>
                </div>
              </div>
              <ConfirmationDialog
                isOpen={openResetConfirmation}
                title={resetButtonLabel.toUpperCase()}
                info={t("common.resetform")}
                icon={warningIcon}
                primaryButtonLabel={resetButtonLabel}
                secondaryButtonLabel={t("common.discard")}
                handlePrimaryButtonClick={handleResetConfirmation}
                handleSecondaryButtonClick={() =>
                  setOpenResetConfirmation(false)
                }
              />
              <ConfirmationDialog
                isOpen={openDeleteOperationConfirmation}
                title={t("common.delete").toUpperCase()}
                info={t("operation.deletionwarning", {
                  code: operationRows.find((item) => item.id === deletedObjCode)
                    ?.operation?.description,
                })}
                icon={warningIcon}
                primaryButtonLabel={t("common.delete")}
                secondaryButtonLabel={t("common.discard")}
                handlePrimaryButtonClick={() => {
                  dispatch(deleteOperationRow(deletedObjCode));
                  setOpenDeleteOperationConfirmation(false);
                }}
                handleSecondaryButtonClick={() => {
                  setOpenDeleteOperationConfirmation(false);
                }}
              />
            </form>
          </AccordionDetails>
        </Accordion>
      </div>
      <CustomDialog
        title={t("opd.addoperation")}
        description={t("opd.addoperationdesc")}
        open={showModal}
        onClose={onOperationCreated}
        content={
          <>
            <OperationRowForm
              fields={operationsRowFields}
              onSubmit={handleAddOperationRow}
              creationMode={operationCreationMode}
              submitButtonLabel={
                operationCreationMode ? t("common.save") : t("common.update")
              }
              resetButtonLabel={t("common.reset")}
              shouldResetForm={shouldResetOperationForm}
              resetFormCallback={resetOperationFormCallback}
              isLoading={addOperationLoading}
              hideResultField={operationCreationMode}
            />
            <FormControlLabel
              control={
                <Checkbox
                  className="add_another_item"
                  checked={isChecked}
                  onChange={handleAddChecboxChange}
                  disabled={!operationCreationMode}
                />
              }
              label={t("common.addanotherrow")}
            />
            <ConfirmationDialog
              isOpen={operationStore.deleteOperationRow.status === "SUCCESS"}
              title={t("opretaionrow.deleted")}
              icon={checkIcon}
              info={t("common.deletesuccess", { code: deletedObjCode })}
              primaryButtonLabel={t("common.ok")}
              handlePrimaryButtonClick={() => {}}
              handleSecondaryButtonClick={() => {}}
            />
          </>
        }
      />
    </>
  );
};

export default PatientOPDForm;
