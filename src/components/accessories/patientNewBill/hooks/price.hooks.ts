import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import { useEffect, useMemo } from "react";
import { getPriceLists } from "../../../../state/prices";
import { IState } from "../../../../types";
import { ItemGroups } from "../consts";

export const usePriceLists = () => {
  const dispatch = useAppDispatch();
  const priceLists = useAppSelector(
    (state: IState) => state.prices.getPriceLists?.data ?? []
  );

  useEffect(() => {
    dispatch(getPriceLists);
  }, [dispatch]);

  return priceLists;
};

export const useItemPrices = (idList?: number) => {
  const listId = useMemo(() => idList ?? 0, [idList]);

  const prices = useAppSelector((state: IState) =>
    (state.prices.getPrices?.data ?? []).filter((e) => e.list?.id === listId)
  );

  const examsOptionsSelector = (state: IState) => {
    return state.prices.getPrices.data
      ? state.prices.getPrices.data
          .filter(
            (e) => e.group === ItemGroups.exam.id && e.list?.id === listId
          )
          .map((item) => {
            return {
              value: item.item ?? "",
              label: item.description ?? "",
            };
          })
      : [];
  };

  const medicalsOptionsSelector = (state: IState) => {
    return state.prices.getPrices.data
      ? state.prices.getPrices.data
          .filter(
            (e) => e.group === ItemGroups.medical.id && e.list?.id === listId
          )
          .map((item) => {
            return {
              value: item.item ?? "",
              label: item.description ?? "",
            };
          })
      : [];
  };

  const surgeriesOptionsSelector = (state: IState) => {
    return state.prices.getPrices.data
      ? state.prices.getPrices.data
          .filter(
            (e) => e.group === ItemGroups.surgery.id && e.list?.id === listId
          )
          .map((item) => {
            return {
              value: item.item ?? "",
              label: item.description ?? "",
            };
          })
      : [];
  };

  const examsOptions = useAppSelector((state: IState) =>
    examsOptionsSelector(state)
  );

  const medicalsOptions = useAppSelector((state: IState) =>
    medicalsOptionsSelector(state)
  );

  const surgeriesOptions = useAppSelector((state: IState) =>
    surgeriesOptionsSelector(state)
  );

  return {
    prices,
    medicalsOptions,
    examsOptions,
    surgeriesOptions,
  };
};
