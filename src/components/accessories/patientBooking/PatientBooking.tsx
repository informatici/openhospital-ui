import React, { FC, useEffect, useRef, useState } from "react";
import BookingForm from "./bookingForm/BookingForm";
import "./styles.scss";
import { connect } from "react-redux";
import { IState } from "../../../types";
import {
  IDispatchProps,
  IStateProps,
  TBookingTransitionState,
  TBookingProps,
} from "./types";
import { useTranslation } from "react-i18next";
import { scrollToElement } from "../../../libraries/uiUtils/scrollToElement";
import { initialFields } from "./consts";

const PatientBooking: FC<TBookingProps> = ({
  createBooking,
  createBookingReset,
  isLoading,
  hasSucceeded,
  hasFailed,
}) => {
  const { t } = useTranslation();
  const infoBoxRef = useRef<HTMLDivElement>(null);
  const [shouldResetForm, setShouldResetForm] = useState(false);
  const [bookingTransitionState, setActivityTransitionState] =
    useState<TBookingTransitionState>("IDLE");

  useEffect(() => {
    if (hasFailed) {
      scrollToElement(infoBoxRef.current);
    }
  }, [hasFailed]);

  useEffect(() => {
    if (bookingTransitionState === "TO_RESET") {
      createBookingReset();
      setShouldResetForm(true);
    }
  }, [bookingTransitionState, createBookingReset]);

  const onSubmit = (booking: any) => {
    setShouldResetForm(false);
    createBooking(booking);
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
      resetButtonLabel={t("common.discard")}
      shouldResetForm={shouldResetForm}
      resetFormCallback={resetFormCallback}
      isLoading={isLoading}
    />
  );
};

const mapStateToProps = (state: IState): IStateProps => ({
  isLoading: false,
  hasSucceeded: true,
  hasFailed: false,
});

const mapDispatchToProps: IDispatchProps = {
  createBooking: () => {},
  createBookingReset: () => {},
};
export default connect(mapStateToProps, mapDispatchToProps)(PatientBooking);
