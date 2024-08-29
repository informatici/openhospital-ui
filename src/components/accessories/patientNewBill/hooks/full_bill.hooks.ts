import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import {
  BillDTO,
  BillItemsDTO,
  BillPaymentsDTO,
  FullBillDTO,
  PatientDTO,
} from "../../../../generated";
import { currencyFormat } from "../../../../libraries/formatUtils/currencyFormatting";
import { parseDate } from "../../../../libraries/formDataHandling/functions";
import {
  newBill,
  newBillReset,
  updateBill,
  updateBillReset,
} from "../../../../state/bills";
import { IState } from "../../../../types";
import { ItemGroups } from "../consts";
import { usePendingBills } from "./pending_bill.hooks";
import { useItemPrices } from "./price.hooks";

export const useSelectedPatient = () => {
  const patient = useAppSelector(
    (state: IState) => state.patients.selectedPatient.data ?? ({} as any)
  );
  return { patient };
};

export const useCurrentUser = () => {
  const user = useAppSelector(
    (state: IState) => state.main.authentication.data?.username
  );
  return user;
};

export const useFullBill = () => {
  const { patient } = useSelectedPatient();
  const user = useCurrentUser();

  const { data: pendings, status: pendingStatus } = usePendingBills(
    patient.code ?? 0
  );
  const creationMode = useMemo(() => !(pendings?.length > 0), [pendings]);

  const status = useAppSelector((state: IState) =>
    creationMode
      ? state.bills.newBill.status ?? "IDLE"
      : state.bills.updateBill.status ?? "IDLE"
  );

  const [bill, setBill] = useState<BillDTO>(() => {
    return (
      pendings[0]?.bill ?? {
        id: 0,
        date: parseDate(Date.now().toString()),
        patName: patient?.firstName,
        patient: patient,
        user: user,
      }
    );
  });
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [itemToEdit, setItemToEdit] = useState<
    Record<string, any> | undefined
  >();
  const [billItems, setBillItems] = useState<BillItemsDTO[]>([]);
  const [billPayments, setBillPayments] = useState<BillPaymentsDTO[]>([]);
  const [fullBill, setFullBill] = useState<FullBillDTO>({
    bill,
    billItems,
    billPayments,
  });

  const saveBill = useCallback(() => {
    creationMode
      ? dispatch(newBill(fullBill))
      : dispatch(updateBill({ id: bill.id ?? 0, fullBillDTO: fullBill }));
  }, [fullBill, creationMode, dispatch]);

  const { prices } = useItemPrices(pendings[0]?.bill?.listId);
  const itemsRowData = useMemo(() => {
    return billItems.map((item) => {
      const priceDTO = prices.find(
        (e) => (e.id ?? 0).toString() == item.priceId || e.item == item.itemId
      );
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
        itemAmount: item.itemAmount,
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
          id: billPayments.length + 1,
          amount: values?.paymentAmount,
          date: values?.paymentDate,
          billId: bill.id ?? -1,
          user: user as any,
        },
      ]),
    [billPayments]
  );
  const handleAddItem = useCallback(
    (itemDTO: BillItemsDTO) => {
      itemDTO.billId = bill.id;
      setBillItems([...billItems, itemDTO]);
    },
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
    (item: any) => {
      let items = billItems.filter((value) => value.id != item.id);
      setBillItems([...items]);
    },
    [billItems]
  );
  useEffect(() => {
    setFullBill(() => {
      return { ...fullBill, billDTO: bill };
    });
  }, [bill]);
  useEffect(() => {
    setFullBill(() => {
      return { ...fullBill, billItemsDTO: billItems };
    });
  }, [billItems]);
  useEffect(() => {
    setFullBill(() => {
      return { ...fullBill, billPaymentsDTO: billPayments };
    });
  }, [billPayments]);

  useEffect(() => {
    if (!creationMode) {
      const fullBill = pendings[0];
      setBill({ ...fullBill.bill });
      setBillItems([...(fullBill.billItems ?? [])]);
      setBillPayments([...(fullBill.billPayments ?? [])]);
    }
  }, [creationMode, patient]);

  const billTotal = useMemo(() => {
    return billItems
      .map((e) => (e.itemQuantity ?? 0) * (e.itemAmount ?? 0))
      .reduce((acc, current) => acc + current, 0);
  }, [billItems]);

  const paymentTotal = useMemo(() => {
    return billPayments
      .map((e) => e?.amount ?? 0)
      .reduce((acc, current) => acc + current, 0);
  }, [billPayments]);

  useEffect(() => {
    setBill(() => ({
      ...bill,
      amount: billTotal,
      balance: billTotal - paymentTotal,
    }));
  }, [billTotal, paymentTotal]);

  useEffect(() => {
    if (status === "SUCCESS") {
      creationMode ? dispatch(newBillReset()) : dispatch(updateBillReset());
    }
  }, [status]);

  return {
    fullBill,
    bill,
    billItems,
    billPayments,
    billTotal,
    paymentTotal,
    itemsRowData,
    itemToEdit,
    creationMode,
    status,
    saveBill,
    setItemToEdit,
    handleBillEdit,
    handleAddItem,
    handleEditItem,
    handleAddPayment,
    handleDeleteItem,
    handleDeletePayment,
  };
};
