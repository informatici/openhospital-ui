import { useFormik } from "formik";
import get from "lodash.get";
import has from "lodash.has";
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { date, number, object, string } from "yup";
import {
  formatAllFieldValues,
  getFromFields,
  updateBillItemFields,
  updateBillPaymentFields,
} from "../../../libraries/formDataHandling/functions";
import warningIcon from "../../../assets/warning-icon.png";
import ConfirmationDialog from "../confirmationDialog/ConfirmationDialog";
import DateField from "../dateField/DateField";
import SelectField from "../selectField/SelectField";
import SmallButton from "../smallButton/SmallButton";
import TextButton from "../textButton/TextButton";
import TextField from "../textField/TextField";
import "./styles.scss";
import { BillItemType, TProps } from "./types";
import { useTranslation } from "react-i18next";
import { Tooltip } from "@material-ui/core";
import AutocompleteField from "../autocompleteField/AutocompleteField";
import { PaymentTable } from "../billTable/PaymentTable";
import Table from "../table/Table";
import { BillItemTable } from "../billTable/BillItemTable";
import {
  BillDTO,
  BillItemsDTO,
  BillPaymentsDTO,
  ExamDTO,
  FullBillDTO,
  MedicalDTO,
  PatientDTO,
} from "../../../generated";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../../types";
import { getExams } from "../../../state/exams/actions";
import { getMedicals } from "../../../state/medicals/actions";
import { searchPatient } from "../../../state/patients/actions";
import { getPriceLists, getPrices } from "../../../state/prices/actions";
import { PriceListDTO } from "../../../generated/models/PriceListDTO";
import { PriceDTO } from "../../../generated/models/PriceDTO";
import { totalmem } from "os";
import { scrollToElement } from "../../../libraries/uiUtils/scrollToElement";

const BillDataForm: FunctionComponent<TProps> = ({
  fields,
  itemFields,
  paymentFields,
  addItemButtonLabel,
  addPaymentButtonLabel,
  isLoading,
  itemToEdit,
  paymentToEdit,
  billItemsDTO,
  billPaymentsDTO,
  itemCreationMode,
  paymentCreationMode,
  setItemCreationMode,
  setPaymentCreationMode,
  setBillItemsDTO,
  setBillPaymentsDTO,
  handleItemEdit,
  handlePaymentEdit,
  onSubmit,
  submitButtonLabel,
  shouldResetForm,
}) => {
  const billItemRows: BillItemsDTO[] = [];
  const billPaymentRows: BillPaymentsDTO[] = [];
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const validationSchema = object({
    billDate: string().required(t("common.required")),
    patName: string().required(t("common.required")),
    listId: string().required(t("common.required")),
  });

  const itemValidationSchema = object({
    itemType: string().required(t("common.required")),
    itemId: string().required(t("common.required")),
    itemAmount: number()
      .required(t("common.required"))
      .min(0, t("common.positiveValue")),
    itemQuantity: number()
      .required(t("common.required"))
      .min(0, t("common.positiveValue")),
  });

  const paymentValidationSchema = object({
    paymentType: string().required(t("common.required")),
    date: date().required(t("common.required")),
    amount: number()
      .required(t("common.required"))
      .min(0, t("common.positiveValue")),
  });

  const initialValues = getFromFields(fields, "value");
  const itemInitialValues = getFromFields(itemFields, "value");
  const paymentInitialValues = getFromFields(paymentFields, "value");

  const billItemOptions = getFromFields(itemFields, "options");
  const paymentOptions = getFromFields(paymentFields, "options");
  const options = getFromFields(fields, "options");

  const [billTotal, setBillTotal] = useState(0);
  const [paymentTotal, setPaymentTotal] = useState(0);
  const [billDTO, setBillDTO] = useState<BillDTO>();
  const [fullBillDTO, setFullBillDTO] = useState<FullBillDTO>({
    billDTO: billDTO,
    billItemsDTO: billItemRows,
    billPaymentsDTO: billPaymentRows,
  });

  const [changeCount, setChangeCount] = useState(0);

  const handleDeleteItem = useCallback(
    (row: BillItemsDTO) => {
      let items = billItemsDTO;
      items = items.filter((item) => item.itemId != row.itemId);
      setBillItemsDTO(items);
      setChangeCount(changeCount + 1);
    },
    [billItemsDTO]
  );

  const computePaymentTotal = useCallback(() => {
    let total = billPaymentsDTO
      .map((e) => e?.amount ?? 0)
      .reduce(
        (previous, current) =>
          parseFloat(previous.toString()) + parseFloat(current.toString()),
        0
      );
    setPaymentTotal(total);
  }, [changeCount]);

  const computeBillTotal = useCallback(() => {
    let total = billItemsDTO
      .map((e) => (e.itemQuantity ?? 0) * (e?.itemAmount ?? 0))
      .reduce(
        (previous, current) =>
          parseFloat(previous.toString()) + parseFloat(current.toString()),
        0
      );
    setBillTotal(total);
  }, [changeCount]);

  const handleDeletePayment = useCallback(
    (row: BillItemsDTO) => {
      let payments = billPaymentsDTO;
      payments = payments.filter((payment) => payment.id != row.id);
      setBillPaymentsDTO(payments);
      setChangeCount(changeCount + 1);
    },
    [billPaymentsDTO]
  );

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      //const formattedValues = formatAllFieldValues({}, values);
      //onSubmit(formattedValues);
    },
  });

  const itemFormik = useFormik({
    initialValues: itemInitialValues,
    validationSchema: itemValidationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      let itemAmount = values.itemAmount;
      let itemDescription = values.itemDescription as string;
      let price: PriceDTO | undefined;
      let item: MedicalDTO | ExamDTO | undefined;
      let bItem: BillItemsDTO;
      let items = billItemsDTO;
      let itemId = values.itemId;
      if (values.itemType == "MED") {
        item = medicalList?.find((e) => e.code == values.itemId);
        if (item) {
          price = priceList?.find(
            (e) =>
              e.item == item?.code &&
              e?.group == "MED" &&
              e?.list?.id?.toString() == formik.values.listId
          );
        }
      } else if (values.itemType == "EXA") {
        item = examList?.find((e) => e.code == values.itemId);
        if (item) {
          price = priceList?.find(
            (e) => e.item == item?.code && e?.group == "EXA"
          );
        }
      } else if (values.itemType == "OP") {
        //TODO
      } else if (values.itemType == "CST") {
        itemId = (1000 + itemDescription.length + items.length).toString();
      }
      itemAmount = price ? price?.price : itemAmount;
      itemDescription = item ? item.description ?? "" : itemDescription;
      console.log(JSON.stringify(itemToEdit));
      console.log(JSON.stringify(items));
      if (!itemCreationMode) {
        items = items.filter((e) => e.itemId != itemToEdit.itemId);
      }
      items.push({
        itemAmount: itemAmount,
        itemDescription: itemDescription,
        itemDisplayCode: itemDescription.slice(0, 4),
        itemQuantity: values.itemQuantity,
        priceId: (price?.id ?? "").toString(),
        itemId: itemId,
      });
      setBillItemsDTO(items);
      setChangeCount(changeCount + 1);
      setItemCreationMode(true);
      itemFormik.resetForm();
      //const formattedValues = formatAllFieldValues({}, values);
      //onSubmit(formattedValues);
    },
  });

  const paymentFormik = useFormik({
    initialValues: paymentInitialValues,
    validationSchema: paymentValidationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      let payments = billPaymentsDTO;
      let maxIndex =
        payments
          .sort((a, b) => {
            return (
              parseFloat((a.id ?? 0).toString()) -
              parseFloat((b.id ?? 0).toString())
            );
          })
          .reverse()[0]?.id ?? -1;
      let paymentId = maxIndex + 1;
      if (!paymentCreationMode) {
        payments = payments.filter((e) => e.id != paymentToEdit.id);
      }
      payments?.push({
        amount: values.paymentType == "P" ? values.amount : -values.amount,
        date: values.date,
        id: paymentCreationMode ? paymentId : paymentToEdit.id,
      });
      setBillPaymentsDTO(payments);
      setChangeCount(changeCount + 1);
      setPaymentCreationMode(true);
      paymentFormik.resetForm();
      //const formattedValues = formatAllFieldValues({}, values);
      //onSubmit(formattedValues);
    },
  });

  const [currentPriceList, setCurrentPriceList] = useState<string>(
    formik.values.listId
  );

  const { setFieldValue, resetForm, handleBlur } = formik;

  const setItemFieldValue = itemFormik.setFieldValue;
  const resetItemForm = itemFormik.resetForm;
  const handleItemBlur = itemFormik.handleBlur;

  const setPaymentFieldValue = paymentFormik.setFieldValue;
  const resetPaymentForm = paymentFormik.resetForm;
  const handlePaymentBlur = paymentFormik.handleBlur;

  const getBillItemType = (itemId: string, pList: PriceDTO[]) => {
    let price = pList.find((e) => e.item == itemId);
    return price ? price.group ?? "" : "CST";
  };

  const getBillPaymentType = (amount: number) => {
    return amount >= 0 ? "P" : "R";
  };

  const isValid = (fieldName: string, f: typeof formik): boolean => {
    return has(f.touched, fieldName) && has(f.errors, fieldName);
  };

  const getErrorText = (fieldName: string, f: typeof formik): string => {
    return has(f.touched, fieldName)
      ? (get(f.errors, fieldName) as string)
      : "";
  };

  const dateFieldHandleOnChange = useCallback(
    (fieldName: string) => (value: any) => {
      setFieldValue(fieldName, value);
    },
    [setFieldValue]
  );

  const paymentDateFieldHandleOnChange = useCallback(
    (fieldName: string) => (value: any) => {
      setPaymentFieldValue(fieldName, value);
    },
    [setPaymentFieldValue]
  );

  const onBlurCallback = useCallback(
    (fieldName: string) =>
      (
        e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
        value: string
      ) => {
        handleBlur(e);
        setFieldValue(fieldName, value);
      },
    [setFieldValue, handleBlur]
  );

  const onListPriceBlurCallback = useCallback(
    (fieldName: string) =>
      (
        e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
        value: string
      ) => {
        handleBlur(e);
        setFieldValue(fieldName, value);
        setCurrentPriceList(value);
      },
    [setFieldValue, handleBlur]
  );

  const onItemBlurCallback = useCallback(
    (fieldName: string) =>
      (
        e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
        value: string
      ) => {
        handleItemBlur(e);
        setItemFieldValue(fieldName, value);
      },
    [setItemFieldValue, handleItemBlur]
  );

  const onPaymentBlurCallback = useCallback(
    (fieldName: string) =>
      (
        e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
        value: string
      ) => {
        handlePaymentBlur(e);
        setPaymentFieldValue(fieldName, value);
      },
    [setPaymentFieldValue, handlePaymentBlur]
  );

  useEffect(() => {
    dispatch(
      searchPatient({
        id: "",
        address: "",
        firstName: "",
        birthDate: "",
        secondName: "",
      })
    );
    dispatch(getExams());
    dispatch(getMedicals());
    dispatch(getPriceLists());
    dispatch(getPrices());
  }, [dispatch]);

  useEffect(() => {
    computeBillTotal();
  }, [computeBillTotal]);
  useEffect(() => {
    computePaymentTotal();
  }, [computePaymentTotal]);

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

  const patientOptionsSelector = (patients: PatientDTO[] | undefined) => {
    if (patients) {
      return patients.map((item) => {
        return {
          value: item.code ?? "",
          label: item.firstName + " " + item.secondName,
        };
      });
    } else return [];
  };

  const examList = useSelector((state: IState) => state.exams.examList.data);

  const priceList = useSelector((state: IState) => state.prices.getPrices.data);

  const patientList = useSelector(
    (state: IState) => state.patients.searchResults.data
  );

  const examOptions = useSelector((state: IState) =>
    examOptionsSelector(state.exams.examList.data)
  );
  const patientOptions = useSelector((state: IState) =>
    patientOptionsSelector(state.patients.searchResults.data)
  );

  const medicalOptionsSelector = (medicals: MedicalDTO[] | undefined) => {
    if (medicals) {
      return medicals.map((item) => {
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

  const medicalList = useSelector(
    (state: IState) => state.medicals.medicalsOrderByName.data
  );

  const medicalOptions = useSelector((state: IState) =>
    medicalOptionsSelector(state.medicals.medicalsOrderByName.data)
  );

  const priceListOptionsSelector = (priceList: PriceListDTO[] | undefined) => {
    if (priceList) {
      return priceList.map((item) => {
        return {
          value: item?.id?.toString() ?? "",
          label:
            (item.description &&
              item.description?.length > 30 &&
              item.description.slice(0, 30) + "...") ||
            (item.description ?? ""),
        };
      });
    } else return [];
  };

  const priceLList = useSelector(
    (state: IState) => state.prices.getPriceLists.data
  );

  const priceListOptions = useSelector((state: IState) =>
    priceListOptionsSelector(state.prices.getPriceLists.data)
  );

  const paymentTypeOptions = paymentOptions.paymentType;

  return (
    <form className="billDataForm">
      <div className="billDataForm__billForm">
        <div className="billDataForm_subtitle">{t("bill.bill")}</div>
        <div className="billDataForm__billForm_item">
          <DateField
            label={t("bill.date")}
            format="dd/MM/yyyy"
            fieldName="billDate"
            errorText={getErrorText("billDate", formik)}
            fieldValue={formik.values.billDate}
            isValid={isValid("billDate", formik)}
            onChange={dateFieldHandleOnChange("billDate")}
          />
          <AutocompleteField
            fieldName="listId"
            fieldValue={formik.values.listId}
            label={t("bill.pricelist")}
            isValid={isValid("listId", formik)}
            errorText={getErrorText("listId", formik)}
            onBlur={onListPriceBlurCallback("listId")}
            options={priceListOptions}
            isLoading={false}
          />
        </div>
        <div className="billDataForm__billForm_item">
          <AutocompleteField
            fieldName="patName"
            fieldValue={formik.values.patName}
            label={t("bill.patient")}
            isValid={isValid("patName", formik)}
            errorText={getErrorText("patName", formik)}
            onBlur={onBlurCallback("patName")}
            options={patientOptions}
            isLoading={false}
          />
        </div>
        <fieldset>
          <legend>{t("bill.additem")}</legend>
          <div className="billDataForm__billForm_item">
            <AutocompleteField
              fieldName="itemType"
              fieldValue={
                itemCreationMode
                  ? itemFormik.values.itemType
                  : getBillItemType(
                      itemFormik.values.itemId ?? "",
                      priceList ?? []
                    )
              }
              label={t("bill.itemtype")}
              isValid={isValid("itemType", itemFormik)}
              errorText={getErrorText("itemType", itemFormik)}
              onBlur={onItemBlurCallback("itemType")}
              options={billItemOptions.itemType ?? []}
              isLoading={false}
            />
            <TextField
              field={itemFormik.getFieldProps("itemQuantity")}
              theme="regular"
              label={t("bill.quantity")}
              isValid={isValid("itemQuantity", itemFormik)}
              errorText={getErrorText("itemQuantity", itemFormik)}
              onBlur={itemFormik.handleBlur}
            />
          </div>
          {itemFormik.values.itemType !== "CST" && (
            <div className="billDataForm__billForm_item">
              <AutocompleteField
                fieldName="itemId"
                fieldValue={itemFormik.values.itemId}
                label={t("bill.item")}
                isValid={isValid("itemId", itemFormik)}
                errorText={getErrorText("itemId", itemFormik)}
                onBlur={onItemBlurCallback("itemId")}
                options={
                  !itemCreationMode &&
                  getBillItemType(
                    itemFormik.values.itemId ?? "",
                    priceList ?? []
                  ) == "MED"
                    ? medicalOptions
                    : itemFormik.values.itemType == "EXA"
                    ? examOptions
                    : billItemOptions.itemId ||
                      itemFormik.values.itemType == "MED"
                    ? medicalOptions
                    : itemFormik.values.itemType == "EXA"
                    ? examOptions
                    : billItemOptions.itemId
                }
                isLoading={false}
              />
            </div>
          )}
          {itemFormik.values.itemType === "CST" && (
            <div className="billDataForm__billForm_item">
              <TextField
                field={itemFormik.getFieldProps("itemDescription")}
                theme="regular"
                label={t("bill.description")}
                isValid={isValid("itemDescription", itemFormik)}
                errorText={getErrorText("itemDescription", itemFormik)}
                onBlur={itemFormik.handleBlur}
              />
              <TextField
                field={itemFormik.getFieldProps("itemAmount")}
                theme="regular"
                label={t("bill.amount")}
                isValid={isValid("itemAmount", itemFormik)}
                errorText={getErrorText("itemAmount", itemFormik)}
                onBlur={itemFormik.handleBlur}
              />
            </div>
          )}
          <div className="billDataForm_submit">
            <SmallButton
              type="button"
              disabled={!itemFormik.isValid}
              onClick={() => {
                itemFormik.handleSubmit();
              }}
            >
              {addItemButtonLabel}
            </SmallButton>
          </div>
        </fieldset>
        <div className="billItemContainer">
          {billItemsDTO.length > 0 && (
            <BillItemTable
              handleDelete={handleDeleteItem}
              handleEdit={handleItemEdit}
              shouldUpdateTable={true}
              billItems={billItemsDTO ?? []}
            />
          )}
        </div>
        <div className="billDataForm_footer">
          <span>
            {t("bill.total")} : ${billTotal}
          </span>
        </div>
      </div>
      <div className="billDataForm__paymentForm">
        <div className="billDataForm_subtitle">{t("bill.payment")}</div>
        <div className="billDataForm__paymentForm_item">
          <DateField
            label={t("bill.date")}
            format="dd/MM/yyyy"
            fieldName="date"
            errorText={getErrorText("date", paymentFormik)}
            fieldValue={paymentFormik.values.date}
            isValid={isValid("date", paymentFormik)}
            onChange={paymentDateFieldHandleOnChange("date")}
          />
          <AutocompleteField
            fieldName="paymentType"
            fieldValue={
              paymentCreationMode
                ? paymentFormik.values.paymentType
                : getBillPaymentType(paymentToEdit.amount ?? 0)
            }
            label={t("bill.type")}
            isValid={isValid("paymentType", paymentFormik)}
            errorText={getErrorText("paymentType", paymentFormik)}
            onBlur={onPaymentBlurCallback("paymentType")}
            options={paymentTypeOptions ?? []}
            isLoading={false}
          />
          <TextField
            field={paymentFormik.getFieldProps("amount")}
            theme="regular"
            label={t("bill.amount")}
            isValid={isValid("amount", paymentFormik)}
            errorText={getErrorText("amount", paymentFormik)}
            onBlur={paymentFormik.handleBlur}
          />
        </div>
        <div className="billDataForm_submit">
          <SmallButton
            type="button"
            disabled={false}
            onClick={() => {
              paymentFormik.handleSubmit();
            }}
          >
            {addPaymentButtonLabel}
          </SmallButton>
        </div>
        <div>
          {billPaymentsDTO.length > 0 && (
            <PaymentTable
              handleEdit={handlePaymentEdit}
              handleDelete={handleDeletePayment}
              shouldUpdateTable={true}
              payments={billPaymentsDTO}
            />
          )}
        </div>
        <div className="billDataForm_footer">
          <span>
            {t("bill.topay")} : ${billTotal}
          </span>
          <span>
            {t("bill.balance")} : ${billTotal - paymentTotal}
          </span>
        </div>
        <div className="billDataForm__paymentForm_item2">
          <SmallButton type="submit" disabled={false}>
            {t("button.save")}
          </SmallButton>
          <SmallButton disabled={false}>{t("button.paid")}</SmallButton>
        </div>
      </div>
    </form>
  );
};

export default BillDataForm;
