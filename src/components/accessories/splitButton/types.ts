import React from "react";

export interface IProps {
  type?: "button" | "submit" | "reset" | undefined;
  label?: string;
  disabled?: boolean;
  descriptions: string[];
  className: string;
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>, index: number) => void;
}
