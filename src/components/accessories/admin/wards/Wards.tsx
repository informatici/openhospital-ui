import React, { useEffect } from "react";
import classes from "./Wards.module.scss";
import { useDispatch } from "react-redux";
import { getWards } from "../../../../state/ward/actions";
import { WardDTO } from "../../../../generated";
import WardTable from "./wardTable";

export const Wards = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWards());
  }, [dispatch]);

  const handleEdit = (row: WardDTO) => {};

  return (
    <div className={classes.wards}>
      <WardTable onEdit={handleEdit} />
    </div>
  );
};
