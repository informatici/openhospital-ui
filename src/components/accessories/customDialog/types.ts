export interface ICustomDialog {
  title: string;
  description: string;
  content: React.ReactElement;
  open: boolean;
  onClose: () => void;
}
