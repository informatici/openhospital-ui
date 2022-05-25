import cityOptions from "../../../customization/city-options.json";

export const useCityOptions = () => {
  return cityOptions.cityOptions.map((e) => ({
    label: e,
    value: e,
  }));
};
