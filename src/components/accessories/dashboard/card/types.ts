import { PropsWithChildren } from "react";
import { TDashboardComponent } from "../layouts/types";

export type TDashboardCardProps = {
  title: string;
  avatar?: React.ReactNode;
  actions: TDashboardCardOptionActions;
  subtitle?: string;
  cardRef?: React.RefObject<any>;
  sizeChangeHandler?: (width: number, height: number) => void;
} & PropsWithChildren;

export type TDashboardDownloadProps = {
  action: JSX.Element;
};

export type TDashboardCardOptionActions = {
  onExpand?: () => void;
  onClose?: () => void;
  onDownload?: TDashboardDownloadProps[];
  downloadButton?: React.ReactNode;
};

export type TFullscreenCardProps = {
  dashboard: TDashboardComponent | undefined;
  onClose: () => void;
};
