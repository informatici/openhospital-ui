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
import { PaymentTable } from "./PaymentTable";
import Table from "../table/Table";
import { BillItemTable } from "./BillItemTable";
import {
  BillDTO,
  BillItemsDTO,
  BillPaymentsDTO,
  ExamDTO,
  FullBillDTO,
  MedicalDTO,
} from "../../../generated";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../../types";
import { getExams } from "../../../state/exams/actions";
import { getMedicals } from "../../../state/medicals/actions";
import { searchPatient } from "../../../state/patients/actions";
import { getPriceLists, getPrices } from "../../../state/prices/actions";
import { PriceListDTO } from "../../../generated/models/PriceListDTO";

const BillDataForm: FunctionComponent<TProps> = ({
  fields,
  isLoading,
  onSubmit,
  submitButtonLabel,
  shouldResetForm,
}) => {
  const billItemRows: BillItemsDTO[] = [
    {
      itemId: "0",
      itemAmount: 5000,
      itemQuantity: 10,
      itemDescription: "Amoxiciline",
    },
  ];
  const billPaymentRows: BillPaymentsDTO[] = [
    {
      date: moment(Date.now()).toString(),
      amount: 180,
    },
  ];
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const validationSchema = object({
    billDate: string().required(t("common.required")),
    patName: string().required(t("common.required")),
    listName: string().required(t("common.required")),
  });

  const itemValidationSchema = object({
    itemType: string().required(t("common.required")),
    itemDescription: string().required(t("common.required")),
    itemAmount: number()
      .required(t("common.required"))
      .min(0, t("common.positiveValue")),
    itemQuantity: number()
      .required(t("common.required"))
      .min(0, t("common.positiveValue")),
  });

  const paymentValidationSchema = object({
    paymentType: string().required(t("common.required")),
    paymentDate: string().required("common.required"),
    paymentAmount: number()
      .required(t("common.required"))
      .min(0, t("common.positiveValue")),
  });

  const initialValues = getFromFields(fields, "value");

  const options = getFromFields(fields, "options");

  const handleItemType = (e: any, value: string) => {
    setSelectedItemType(value);
  };

  const [selectedItemType, setSelectedItemType] = useState("");
  const [billDTO, setBillDTO] = useState<BillDTO>();
  const [fullBillDTO, setFullBillDTO] = useState<FullBillDTO>({
    billDTO: billDTO,
    billItemsDTO: billItemRows,
    billPaymentsDTO: billPaymentRows,
  });

  const [billItemsDTO, setBillItemsDTO] =
    useState<BillItemsDTO[]>(billItemRows);
  const [billPaymentsDTO, setBillPaymentsDTO] =
    useState<BillPaymentsDTO[]>(billPaymentRows);

  const [currentPriceList, setCurrentPriceList] = useState<PriceListDTO>({});

  const handleDeleteItem = useCallback(
    (row: BillItemsDTO) => {
      let items = billItemsDTO;
      items = items.filter((item) => item.itemId != row.itemId);
      setBillItemsDTO(items);
    },
    [billItemsDTO]
  );

  const handleDeletePayment = useCallback(
    (row: BillItemsDTO) => {
      let bill = fullBillDTO;
      let payments = bill.billPaymentsDTO ?? [];
      payments = payments.filter((payment) => payment.id != row.id);
      bill.billPaymentsDTO = payments;
      setFullBillDTO(bill);
    },
    [fullBillDTO]
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
    initialValues,
    validationSchema: itemValidationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      let bill = fullBillDTO;
      let itemAmount = values.itemAmount;
      let itemDescription = values.itemDescription;
      if (values.itemType == "MED") {
        let item = medicalList?.find((e) => e.code == values.itemCode);
        if (item) {
          const price = priceList?.find((e) => e.item == "test");
          itemAmount =
            parseFloat(price ? price?.price : itemAmount) *
            parseFloat(values.itemQuantity);
          itemDescription = item.description;
        }
      } else if (values.itemType == "EXA") {
        let item = examList?.find((e) => e.code == values.itemCode);
        if (item) {
          const price = priceList?.find((e) => e.item == "test");
          itemAmount =
            parseFloat(price ? price?.price : itemAmount) *
            parseFloat(values.itemQuantity);
          itemDescription = item.description;
        }
      }
      billItemsDTO.push({
        itemAmount: itemAmount,
        itemDescription: itemDescription,
        itemQuantity: values.itemQuantity,
        itemId: (bill.billItemsDTO ?? []).length.toString(),
      });
      bill.billItemsDTO = billItemsDTO;
      setFullBillDTO(bill);
      itemFormik.resetForm();
      //const formattedValues = formatAllFieldValues({}, values);
      //onSubmit(formattedValues);
    },
  });

  const paymentFormik = useFormik({
    initialValues,
    validationSchema: paymentValidationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      let bill = fullBillDTO;
      bill.billPaymentsDTO?.push({
        amount:
          values.paymentType == "P"
            ? values.paymentAmount
            : -values.paymentAmount,
        date: values.paymentDate,
        id: (bill.billPaymentsDTO ?? []).length,
      });
      setFullBillDTO(bill);
      paymentFormik.resetForm();
      //const formattedValues = formatAllFieldValues({}, values);
      //onSubmit(formattedValues);
    },
  });

  const { setFieldValue, resetForm, handleBlur } = formik;

  const setItemFieldValue = itemFormik.setFieldValue;
  const resetItemForm = itemFormik.resetForm;
  const handleItemBlur = itemFormik.handleBlur;

  const setPaymentFieldValue = paymentFormik.setFieldValue;
  const resetPaymentForm = paymentFormik.resetForm;
  const handlePaymentBlur = paymentFormik.handleBlur;

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
    dispatch(getExams());
    dispatch(getMedicals());
    dispatch(getPriceLists());
    dispatch(getPrices());
  }, [dispatch]);

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

  const examList = useSelector((state: IState) => state.exams.examList.data);

  const priceList = useSelector((state: IState) => state.prices.getPrices.data);

  const examOptions = useSelector((state: IState) =>
    examOptionsSelector(state.exams.examList.data)
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

  const priceLList = useSelector(
    (state: IState) => state.prices.getPriceLists.data
  );

  const priceListOptions = useSelector((state: IState) =>
    priceListOptionsSelector(state.prices.getPriceLists.data)
  );

  const billItemTypeOptions = (options.itemType ?? []).map(
    (e: { value: string; type: any }) => {
      e.value = t(e.value);
      return e;
    }
  );

  const paymentTypeOptions = (options.paymentType ?? []).map(
    (e: { value: string; type: any }) => {
      e.value = t(e.value);
      return e;
    }
  );

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
            fieldValue={Date.now().toLocaleString()}
            isValid={isValid("billDate", formik)}
            onChange={() => {}}
          />
          <AutocompleteField
            fieldName="listName"
            fieldValue={formik.values.listName}
            label={t("bill.pricelist")}
            isValid={isValid("listName", formik)}
            errorText={getErrorText("listName", formik)}
            onBlur={onBlurCallback("listName")}
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
            options={options.patName}
            isLoading={false}
          />
        </div>
        <fieldset>
          <legend>{t("bill.additem")}</legend>
          <div className="billDataForm__billForm_item">
            <AutocompleteField
              fieldName="itemType"
              fieldValue={itemFormik.values.itemType}
              label={t("bill.itemtype")}
              isValid={isValid("itemType", itemFormik)}
              errorText={getErrorText("itemType", itemFormik)}
              onBlur={onItemBlurCallback("itemType")}
              options={billItemTypeOptions}
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
                fieldName="itemDescription"
                fieldValue={itemFormik.values.itemDescription}
                label={t("bill.item")}
                isValid={isValid("itemDescription", itemFormik)}
                errorText={getErrorText("itemDescription", itemFormik)}
                onBlur={onItemBlurCallback("itemDescription")}
                options={
                  itemFormik.values.itemType == "MED"
                    ? medicalOptions
                    : itemFormik.values.itemType == "EXA"
                    ? examOptions
                    : options.itemDescription
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
              {t("button.add")}
            </SmallButton>
          </div>
        </fieldset>
        <div className="billItemContainer">
          <BillItemTable
            handleDelete={handleDeleteItem}
            handleEdit={(row: any) => {}}
            shouldUpdateTable={true}
            billItems={billItemsDTO ?? []}
          />
        </div>
        <div className="billDataForm_footer">
          <span>{t("bill.total")} : $xxx</span>
        </div>
      </div>
      <div className="billDataForm__paymentForm">
        <div className="billDataForm_subtitle">{t("bill.payment")}</div>
        <div className="billDataForm__paymentForm_item">
          <DateField
            label={t("bill.date")}
            format="dd/MM/yyyy"
            fieldName="paymentDate"
            errorText={getErrorText("paymentDate", paymentFormik)}
            fieldValue={Date.now().toLocaleString()}
            isValid={isValid("paymentDate", paymentFormik)}
            onChange={() => {}}
          />
          <AutocompleteField
            fieldName="paymentType"
            fieldValue={t(paymentFormik.values.paymentType)}
            label={t("bill.type")}
            isValid={isValid("paymentType", paymentFormik)}
            errorText={getErrorText("paymentType", paymentFormik)}
            onBlur={onPaymentBlurCallback("paymentType")}
            options={paymentTypeOptions}
            isLoading={false}
          />
          <TextField
            field={paymentFormik.getFieldProps("paymentAmount")}
            theme="regular"
            label={t("bill.amount")}
            isValid={isValid("paymentAmount", paymentFormik)}
            errorText={getErrorText("paymentAmount", paymentFormik)}
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
            {t("button.add")}
          </SmallButton>
        </div>
        <div>
          <PaymentTable
            handleEdit={(row) => {}}
            handleDelete={handleDeletePayment}
            shouldUpdateTable={true}
            payments={fullBillDTO.billPaymentsDTO ?? []}
          />
        </div>
        <div className="billDataForm_footer">
          <span>{t("bill.topay")} : $xxx</span>
          <span>{t("bill.balance")} : $xxx</span>
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
