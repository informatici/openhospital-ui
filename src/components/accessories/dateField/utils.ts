const parseDigits = (str: string) => (str.match(/\d+/g) || []).join("");

export const formatToDate = (str: string): string => {
  const digits = parseDigits(str);
  const chars = digits.split("");
  return chars
    .reduce(
      (r, v, index) => (index === 2 || index === 4 ? `${r}/${v}` : `${r}${v}`),
      ""
    )
    .substr(0, 10);
};
