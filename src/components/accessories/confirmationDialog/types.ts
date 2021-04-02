export interface IProps {
  isOpen: boolean;
  title: string;
  icon: string;
  info: string;
  primaryButtonLabel: string;
  secondaryButtonLabel?: string;
  handlePrimaryButtonClick: () => void;
  handleSecondaryButtonClick: () => void;
}
