import { randomItems } from "../randomUtils/randomUtils";

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

const chartColors = [
  "rgb(255, 99, 132)",
  "rgb(54, 162, 235)",
  "rgb(255, 205, 86)",
  "rgb(105, 13, 211)",
  "rgb(156, 8, 65)",
  "rgb(33, 117, 138)",
  "rgb(6, 197, 245)",
  "rgb(14, 245, 6)",
  "rgb(11, 150, 6)",
  "rgb(206, 193, 13)",
  "rgb(206, 13, 87)",
  "rgb(238, 138, 176)",
  "rgb(11, 34, 248)",
  "rgb(148, 158, 243)",
  "rgb(243, 13, 205)",
  "rgb(187, 14, 66)",
  "rgba(255, 99, 132, 0.8)",
  "rgba(54, 162, 235, 0.8)",
];

export function colorGen(nbColors: number): string[] {
  return randomItems(chartColors, nbColors);
}
