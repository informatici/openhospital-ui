import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PriceDTO } from "../../../../generated/models/PriceDTO";
import { PriceListDTO } from "../../../../generated/models/PriceListDTO";
import { getPriceLists } from "../../../../state/prices/actions";
import { IState } from "../../../../types";
import { ItemGroups } from "../consts";

export const usePriceLists = () => {
  const dispatch = useDispatch();
  const priceLists = useSelector<IState, PriceListDTO[]>(
    (state: IState) => state.prices.getPriceLists?.data ?? []
  );

  useEffect(() => {
    dispatch(getPriceLists);
  }, [dispatch]);

  return priceLists;
};

export const useItemPrices = (code?: string) => {
  const dispatch = useDispatch();
  const [listCode, setListCode] = useState(code ?? "LIST001");

  const prices = useSelector<IState, PriceDTO[]>((state: IState) =>
    (state.prices.getPrices?.data ?? []).filter((e) => e.list?.code == listCode)
  );

  const examsOptionsSelector = (state: IState) => {
    return state.prices.getPrices.data
      ? state.prices.getPrices.data
          .filter(
            (e) => e.group == ItemGroups.exam.id && e.list?.code == listCode
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
            (e) => e.group == ItemGroups.medical.id && e.list?.code == listCode
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
            (e) => e.group == ItemGroups.surgery.id && e.list?.code == listCode
          )
          .map((item) => {
            return {
              value: item.item ?? "",
              label: item.description ?? "",
            };
          })
      : [];
  };

  const examsOptions = useSelector<IState, { value: string; label: string }[]>(
    (state: IState) => examsOptionsSelector(state)
  );

  const medicalsOptions = useSelector<
    IState,
    { value: string; label: string }[]
  >((state: IState) => medicalsOptionsSelector(state));

  const surgeriesOptions = useSelector<
    IState,
    { value: string; label: string }[]
  >((state: IState) => surgeriesOptionsSelector(state));

  return {
    prices,
    setListCode,
    medicalsOptions,
    examsOptions,
    surgeriesOptions,
  };
};
