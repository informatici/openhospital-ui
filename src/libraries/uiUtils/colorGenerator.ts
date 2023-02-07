import { number } from "yup";

export const generateColor = (defaultValues: {
  red?: number;
  green?: number;
  blue?: number;
  opacity?: number;
}) => {
  const r = Math.floor(Math.random() * 255) + 1;
  const g = Math.floor(Math.random() * 255) + 1;
  const b = Math.floor(Math.random() * 255) + 1;
  const { red, green, blue, opacity } = defaultValues;
  return `rgb(${red ?? r}, ${green ?? g}, ${blue ?? b}, ${
    opacity ?? Math.random()
  })`;
};
