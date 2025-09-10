export interface IProps {
  isOpen: boolean;
  title: string;
  icon: string;
  info: string;
  primaryButtonLabel: string;
  secondaryButtonLabel?: string;
  handlePrimaryButtonClick: (date: string) => void;
  handleSecondaryButtonClick: () => void;
}
