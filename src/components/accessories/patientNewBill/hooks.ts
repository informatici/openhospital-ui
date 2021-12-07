import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  BillDTO,
  BillItemsDTO,
  BillPaymentsDTO,
  ExamDTO,
  FullBillDTO,
  MedicalDTO,
  OperationDTO,
  PatientDTO,
} from "../../../generated";
import { PriceDTO } from "../../../generated/models/PriceDTO";
import { PriceListDTO } from "../../../generated/models/PriceListDTO";
import { currencyFormat } from "../../../libraries/formatUtils/currencyFormatting";
import { priceDTO } from "../../../mockServer/fixtures/priceDTO";
import { getExams } from "../../../state/exams/actions";
import { getMedicals } from "../../../state/medicals/actions";
import { getPriceLists, getPrices } from "../../../state/prices/actions";
import { IState } from "../../../types";
import { ItemGroups } from "./consts";

export const useDialogStatus = () => {
  const [showItemPicker, setShowPicker] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);

  const handleItemPicker = useCallback(() => {
    setShowPicker(!showItemPicker);
  }, [showItemPicker]);
  const handlePaymentDialog = useCallback(() => {
    setShowPaymentDialog(!showPaymentDialog);
  }, [showPaymentDialog]);

  return {
    showItemPicker,
    showPaymentDialog,
    handleItemPicker,
    handlePaymentDialog,
  };
};

export const useSelectedPatient = () => {
  const patient = useSelector<IState, PatientDTO>(
    (state: IState) => state.patients.selectedPatient.data ?? {}
  );
  return { patient };
};

export const usePriceLists = () => {
  const dispatch = useDispatch();
  const priceLists = useSelector<IState, PriceListDTO[]>(
    (state: IState) => state.prices.getPriceLists?.data ?? []
  );

  useEffect(() => {
    dispatch(getPriceLists);
  }, [dispatch]);

  return priceLists;
};

export const useItemPrices = (code?: string) => {
  const dispatch = useDispatch();
  const [listCode, setListCode] = useState(code ?? "LIST001");

  const prices = useSelector<IState, PriceDTO[]>((state: IState) =>
    (state.prices.getPrices?.data ?? []).filter((e) => e.list?.code == listCode)
  );

  const examsOptionsSelector = (state: IState) => {
    return state.prices.getPrices.data
      ? state.prices.getPrices.data
          .filter(
            (e) => e.group == ItemGroups.exam.id && e.list?.code == listCode
          )
          .map((item) => {
            return {
              value: item.item ?? "",
              label: item.description ?? "",
            };
          })
      : [];
  };

  const medicalsOptionsSelector = (state: IState) => {
    return state.prices.getPrices.data
      ? state.prices.getPrices.data
          .filter(
            (e) => e.group == ItemGroups.medical.id && e.list?.code == listCode
          )
          .map((item) => {
            return {
              value: item.item ?? "",
              label: item.description ?? "",
            };
          })
      : [];
  };

  const surgeriesOptionsSelector = (state: IState) => {
    return state.prices.getPrices.data
      ? state.prices.getPrices.data
          .filter(
            (e) => e.group == ItemGroups.surgery.id && e.list?.code == listCode
          )
          .map((item) => {
            return {
              value: item.item ?? "",
              label: item.description ?? "",
            };
          })
      : [];
  };

  const examsOptions = useSelector<IState, { value: string; label: string }[]>(
    (state: IState) => examsOptionsSelector(state)
  );

  const medicalsOptions = useSelector<
    IState,
    { value: string; label: string }[]
  >((state: IState) => medicalsOptionsSelector(state));

  const surgeriesOptions = useSelector<
    IState,
    { value: string; label: string }[]
  >((state: IState) => surgeriesOptionsSelector(state));

  return {
    prices,
    setListCode,
    medicalsOptions,
    examsOptions,
    surgeriesOptions,
  };
};

export const useItems = () => {
  const dispatch = useDispatch();
  const medicals = useSelector<IState, MedicalDTO[]>(
    (state) => state.medicals.medicalsOrderByName.data || []
  );
  const exams = useSelector<IState, ExamDTO[]>(
    (state) => state.exams.examList.data || []
  );
  const surgeries: OperationDTO[] = [
    { code: "srg1", description: "Surgery 1" },
    { code: "srg2", description: "Surgery 2" },
  ];
  useEffect(() => {
    dispatch(getMedicals());
    dispatch(getExams());
  }, [dispatch]);

  return {
    medicals,
    exams,
    surgeries,
    dispatch,
  };
};

export const useFullBill = () => {
  const [bill, setBill] = useState<BillDTO>({});
  const { t } = useTranslation();
  const [itemToEdit, setItemToEdit] =
    useState<Record<string, any> | undefined>();
  const [billItems, setBillItems] = useState<BillItemsDTO[]>([]);
  const [billPayments, setBillPayments] = useState<BillPaymentsDTO[]>([]);
  const [fullBill, setFullBill] = useState<FullBillDTO>({
    billDTO: bill,
    billItemsDTO: billItems,
    billPaymentsDTO: billPayments,
  });

  const { prices } = useItemPrices();

  const itemsRowData = useMemo(() => {
    return billItems.map((item) => {
      const priceDTO = prices.find((e) => e.item == item.itemId);
      const groupLabel = Object.entries(ItemGroups).find(
        (e) => e[1].id == priceDTO?.group
      );
      return {
        id: item.id,
        itemId: item?.itemId,
        groupId: groupLabel ? groupLabel[1].id : ItemGroups.other.id,
        group: t(groupLabel ? groupLabel[1].value : ItemGroups.other.value),
        description: item.itemDescription,
        quantity: item.itemQuantity,
        amount: currencyFormat(item.itemAmount),
      };
    });
  }, [billItems]);

  const handleBillEdit = useCallback(
    (billDTO: BillDTO) => setBill({ ...billDTO }),
    [bill]
  );
  const handleAddPayment = useCallback(
    (values: Record<string, any>) =>
      setBillPayments([
        ...billPayments,
        {
          amount: values?.paymentAmount,
          date: values?.paymentDate,
          id: billPayments.length + 1,
        },
      ]),
    [billPayments]
  );
  const handleAddItem = useCallback(
    (itemDTO: BillItemsDTO) => setBillItems([...billItems, itemDTO]),
    [billItems]
  );
  const handleEditItem = useCallback(
    (itemDTO: BillItemsDTO) => {
      const items = billItems.map((item) =>
        item.id == itemDTO.id ? itemDTO : item
      );
      setBillItems([...items]);
      setItemToEdit(undefined);
    },
    [billItems]
  );
  const handleDeletePayment = useCallback(
    (paymentDTO: BillPaymentsDTO) => {
      let payments = billPayments.filter((value) => value.id != paymentDTO.id);
      setBillPayments([...payments]);
    },
    [billPayments]
  );
  const handleDeleteItem = useCallback(
    (itemDTO: any) => {
      let items = billItems.filter((value) => value.id != itemDTO.id);
      setBillItems([...items]);
    },
    [billItems]
  );
  useEffect(() => {
    setFullBill(() => {
      fullBill.billDTO = bill;
      return { ...fullBill, billDTO: bill };
    });
  }, [bill]);
  useEffect(() => {
    setFullBill(() => {
      fullBill.billItemsDTO = billItems;
      return { ...fullBill, billItemsDTO: billItems };
    });
  }, [billItems]);
  useEffect(() => {
    setFullBill(() => {
      fullBill.billPaymentsDTO = billPayments;
      return { ...fullBill, billPaymentsDTO: billPayments };
    });
  }, [billPayments]);

  const billTotal = useMemo(() => {
    return billItems
      .map((e) => (e.itemQuantity ?? 0) * (e.itemAmount ?? 0))
      .reduce((previous, current) => previous + current, 0);
  }, [billItems]);

  const paymentTotal = useMemo(() => {
    return billPayments
      .map((e) => e?.amount ?? 0)
      .reduce((previous, current) => previous + current, 0);
  }, [billPayments]);

  return {
    fullBill,
    bill,
    billItems,
    billPayments,
    billTotal,
    paymentTotal,
    itemsRowData,
    itemToEdit,
    setItemToEdit,
    handleBillEdit,
    handleAddItem,
    handleEditItem,
    handleAddPayment,
    handleDeleteItem,
    handleDeletePayment,
  };
};
