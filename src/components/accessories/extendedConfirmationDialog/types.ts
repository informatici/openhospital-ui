import { ReactNode } from "react";

export interface IProps {
  isOpen: boolean;
  title: string;
  icon: string;
  info: string;
  items: { label: string; onClick: () => void }[];
}
