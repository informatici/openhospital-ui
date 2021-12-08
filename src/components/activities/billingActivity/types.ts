import { Dispatch, SetStateAction } from "react";
import { BillItemsDTO, FullBillDTO } from "../../../generated";
import { PriceDTO } from "../../../generated/models/PriceDTO";
import { TUserCredentials } from "../../../state/main/types";

interface IOwnProps {
  billHomeRoute: string;
  dashboardRoute: string;
}

//
//Interface used for share variable prices and item-setItem
//between child and father
//
export interface PricesState {
  prices: Array<PriceDTO> | undefined;
  items: BillItemsDTO[];
  setItems: Dispatch<SetStateAction<BillItemsDTO[]>>;
}

export interface ItemsState {
  items: Array<Item> | undefined;
}

export interface IStateProps {
  userCredentials: TUserCredentials;
  prices: Array<PriceDTO> | undefined;
  isLoading: boolean;
  hasSucceeded: boolean;
  hasFailed: boolean;
}

export interface IDispatchProps {
  getPrices: () => any;
  newBill: (bill: FullBillDTO) => any;
  newBillReset: () => any;
}

export type TProps = IOwnProps & IStateProps & IDispatchProps;

export type Item = {
  hashCode: number | undefined; //doesn't match with directus
  id: number | undefined;
  price: boolean | undefined;
  billId: number | undefined;
  priceId: number | undefined;
  itemDescription: string | undefined;
  itemAmount: number | undefined;
  itemQuantity: number | undefined;
  itemDisplayCode: string | undefined; //doesn't match with directus
  itemId: number | undefined; //doesn't match with directus
};

export type TActivityTransitionState =
  | "IDLE"
  | "TO_BILL_HOME"
  | "TO_DASHBOARD"
  | "TO_NEW_BILL"
  | "TO_PAYMENTS"
  | "TO_BILLS";

export type IBillSummary = {
  dailyRevenue: number;
  dailyDebt: number;

  monthlyRevenue: number;
  monthlyDebt: number;

  weeklyRevenue: number;
  weeklyDebt: number;

  annualRevenue: number;
  annualDebt: number;

  bestSellingByQuantity: { [key: string]: number }[];
  bestSellingByOccurence: { [key: string]: number }[];

  bestPatientsByPayments: { [key: string]: number }[];
  mostIndebtedPatients: { [key: string]: number }[];

  currentUserCashIn: number;
  currentUserDebt: number;
};

export type IBillingSection = "dashboard" | "bills" | "payments";
