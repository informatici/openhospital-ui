import React, { ComponentProps } from "react";
import "./styles.scss";

type PharmacyActivityContentProps = { title: string } & Omit<
  ComponentProps<"div">,
  "title"
>;

export function PharmacyActivityContent({
  children,
  title,
  ...props
}: PharmacyActivityContentProps) {
  return (
    <div {...props} className="pharmacyActivity__content">
      <span className="pharmacyActivity__content_title">{title}</span>
      {children}
    </div>
  );
}
