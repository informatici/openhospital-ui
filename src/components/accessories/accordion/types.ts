import { PropsWithChildren } from "react";

export interface IPropsSummary extends PropsWithChildren {
  onClick?: () => void;
}

export interface IProps extends PropsWithChildren {
  expanded?: boolean;
}
