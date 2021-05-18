export interface IStateProps {
  isLoading: boolean;
  hasSucceeded: boolean;
  hasFailed: boolean;
}

export interface IDispatchProps {
  createBooking: (booking: any) => any;
  createBookingReset: () => void;
}

export type TBookingProps = IStateProps & IDispatchProps;

export type TBookingTransitionState = "IDLE" | "TO_RESET";
