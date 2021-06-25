import { TFields } from "../../../libraries/formDataHandling/types";
import { TBookingFormFieldName } from "./bookingForm/types";

const categoriesOptions = [
  {
    label: "Category 1",
    value: "Category 1",
  },
  {
    label: "Category 2",
    value: "Category 2",
  },
];

const servicesOptions = [
  {
    label: "Service 1",
    value: "Service 1",
  },
  {
    label: "Service 2",
    value: "Service 2",
  },
];

export const initialFields: TFields<TBookingFormFieldName> = {
  category: {
    value: "",
    type: "text",
    options: categoriesOptions,
  },
  service: {
    value: "",
    type: "text",
    options: servicesOptions,
  },

  bookingDate: {
    value: "",
    type: "date",
  },
};
