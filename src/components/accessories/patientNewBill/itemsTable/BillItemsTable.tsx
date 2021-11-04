import React, { FC, useEffect, useRef, useState } from "react";
import "./styles.scss";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

export type BillItemTransitionState = "IDLE" | "TO_RESET";

const BillItemsTable: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const infoBoxRef = useRef<HTMLDivElement>(null);

  const [creationMode, setCreationMode] = useState(true);
  const [deletedObjCode, setDeletedObjCode] = useState("");

  return <></>;
};
export default BillItemsTable;
