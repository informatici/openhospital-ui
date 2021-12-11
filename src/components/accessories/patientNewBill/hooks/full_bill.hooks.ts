import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
  BillDTO,
  BillItemsDTO,
  BillPaymentsDTO,
  FullBillDTO,
  PatientDTO,
} from "../../../../generated";
import { currencyFormat } from "../../../../libraries/formatUtils/currencyFormatting";
import { IState } from "../../../../types";
import { ItemGroups } from "../consts";
import { usePendingBills } from "./pending_bill.hooks";
import { useItemPrices } from "./price.hooks";

export const useSelectedPatient = () => {
  const patient = useSelector<IState, PatientDTO>(
    (state: IState) => state.patients.selectedPatient.data ?? {}
  );
  return { patient };
};

export const useFullBill = () => {
  const { patient } = useSelectedPatient();

  const { data: pendings, status } = usePendingBills(patient.code ?? 0);

  const [bill, setBill] = useState<BillDTO>(() => {
    return {
      date:
        pendings.length == 0
          ? new Date(Date.now()).toISOString()
          : pendings[0].billDTO?.date,
    };
  });
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

  console.log(pendings[0]?.billDTO?.listId);
  const { prices } = useItemPrices(pendings[0]?.billDTO?.listId);
  const itemsRowData = useMemo(() => {
    return billItems.map((item) => {
      const priceDTO = prices.find(
        (e) => e.id == item.priceId || e.item == item.itemId
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

  useEffect(() => {
    if (pendings.length > 0) {
      const fullBill = pendings[0];
      setBill({ ...fullBill.billDTO });
      setBillItems([...(fullBill.billItemsDTO ?? [])]);
      setBillPayments([...(fullBill.billPaymentsDTO ?? [])]);
    }
  }, [pendings, patient]);

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
