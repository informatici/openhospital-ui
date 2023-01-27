export const useCityOptions = (cities: Array<string> | undefined) => {
  return cities?.map((e) => ({
    label: e,
    value: e,
  }));
};
