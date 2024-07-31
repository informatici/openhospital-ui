import { PropsWithChildren } from "react";

export interface IProps extends PropsWithChildren {
  onClick: () => void;
}
