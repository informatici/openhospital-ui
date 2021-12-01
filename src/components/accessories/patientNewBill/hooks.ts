import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BillDTO,
  BillItemsDTO,
  BillPaymentsDTO,
  ExamDTO,
  FullBillDTO,
  MedicalDTO,
  OperationDTO,
} from "../../../generated";
import { getExams } from "../../../state/exams/actions";
import { getMedicals } from "../../../state/medicals/actions";
import { IState } from "../../../types";

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

  return { medicals, exams, surgeries, dispatch };
};

export const useFullBill = () => {
  const [bill, setBill] = useState<BillDTO>({});
  const [billItems, setBillItems] = useState<BillItemsDTO[]>([]);
  const [billPayments, setBillPayments] = useState<BillPaymentsDTO[]>([]);
  const [fullBill, setFullBill] = useState<FullBillDTO>({
    billDTO: bill,
    billItemsDTO: billItems,
    billPaymentsDTO: billPayments,
  });
  const handleBillDTO = useCallback(
    (billDTO: BillDTO) => setBill({ ...billDTO }),
    [bill]
  );
  const handleAddPayment = useCallback(
    (paymentDTO: BillPaymentsDTO) =>
      setBillPayments([...billPayments, paymentDTO]),
    [billPayments]
  );
  const handleAddItem = useCallback(
    (itemDTO: BillItemsDTO) => setBillItems([...billItems, itemDTO]),
    [billItems]
  );
  const handleRemovePayment = useCallback(
    (paymentDTO: BillPaymentsDTO) => {
      let payments = billPayments.filter((value) => value.id != paymentDTO.id);
      setBillPayments([...payments]);
    },
    [billPayments]
  );
  const handleRemoveItem = useCallback(
    (itemDTO: BillItemsDTO) => {
      let items = billItems.filter((value) => value.id != itemDTO.id);
      setBillPayments([...items]);
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

  return {
    fullBill,
    bill,
    billItems,
    billPayments,
    handleBillDTO,
    handleAddItem,
    handleAddPayment,
    handleRemoveItem,
    handleRemovePayment,
  };
};
