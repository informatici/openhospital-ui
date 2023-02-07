import { PatientDTO } from "../../../../generated";
import { TFields } from "../../../../libraries/formDataHandling/types";

interface IBookingProps {
  fields: TFields<TBookingFormFieldName>;
  onSubmit: (booking: any) => void;
  submitButtonLabel: string;
  resetButtonLabel: string;
  isLoading: boolean;
  shouldResetForm: boolean;
  resetFormCallback: () => void;
  onMonthChange?: (date: any) => void | Promise<void>;
  shouldDisableDate?: (date: any) => boolean;
  renderDay?: (
    day: any,
    selectedDate: any,
    dayInCurrentMonth: boolean,
    dayComponent: JSX.Element
  ) => JSX.Element;
}

export type TBookingProps = IBookingProps;

export type TBookingFormFieldName = "category" | "service" | "bookingDate";

export interface BookingDTO {
  id: number;
  bookingDate: Date;
  service: ServiceDTO;
  patient: PatientDTO;
  status: BoookingStatus;
}
export enum BoookingStatus {
  "PENDING",
  "CONFIRMED",
  "CANCELLED",
  "SUCCESS",
  "FAILED",
}
export interface ServiceDTO {
  id: number;
  category: CategoryDTO;
  name: number;
  description: string;
  cost: number;
}

export interface CategoryDTO {
  id: number;
  name: string;
  description: string;
}

export interface ServiceAvailabilityDTO {
  year: number;
  month: number;
  service: ServiceDTO;
  unAvailableDays: number[];
  barelyAvailableDays: number[];
}
