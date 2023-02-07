export interface ICustomModal {
  title: string;
  description: string;
  content: React.ReactElement;
  open: boolean;
  onClose: () => void;
}
