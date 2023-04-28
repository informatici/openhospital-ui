export type TDashboardCardProps = {
  title: string;
  avatar?: React.ReactNode;
  actions: TDashboardCardOptionActions;
  subtitle?: string;
  cardRef?: React.RefObject<any>;
};

export type TDashboardDownloadFormat = "pdf" | "csv" | "excel";

export type TDashboardDownloadProps = {
  format: TDashboardDownloadFormat;
  link: string;
};

export type TDashboardCardOptionActions = {
  onExpand?: () => void;
  onClose?: () => void;
  onDownload?: TDashboardDownloadProps[];
};
