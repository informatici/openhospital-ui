import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { scrollToElement } from "../../../libraries/uiUtils/scrollToElement";
import BookingForm from "./bookingForm/BookingForm";
import { initialFields } from "./consts";
import "./styles.scss";
import { TBookingTransitionState } from "./types";

const PatientBooking = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const infoBoxRef = useRef<HTMLDivElement>(null);
  const [shouldResetForm, setShouldResetForm] = useState(false);
  const [bookingTransitionState, setActivityTransitionState] =
    useState<TBookingTransitionState>("IDLE");

  const { isLoading, hasSucceeded, hasFailed } = useAppSelector((state) => ({
    isLoading: false,
    hasSucceeded: true,
    hasFailed: false,
  }));

  useEffect(() => {
    if (hasFailed) {
      scrollToElement(infoBoxRef.current);
    }
  }, [hasFailed]);

  useEffect(() => {
    if (bookingTransitionState === "TO_RESET") {
      // dispatch(createBookingReset());
      setShouldResetForm(true);
    }
  }, [bookingTransitionState, dispatch]);

  const onSubmit = (booking: any) => {
    setShouldResetForm(false);
    // dispatch(createBooking(booking));
  };

  const resetFormCallback = () => {
    setShouldResetForm(false);
    setActivityTransitionState("IDLE");
    scrollToElement(null);
  };
  return (
    <BookingForm
      fields={initialFields}
      onSubmit={onSubmit}
      submitButtonLabel={t("booking.saveform")}
      resetButtonLabel={t("common.reset")}
      shouldResetForm={shouldResetForm}
      resetFormCallback={resetFormCallback}
      isLoading={isLoading}
    />
  );
};

export default PatientBooking;
