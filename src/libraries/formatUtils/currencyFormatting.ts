import numbro from "numbro";

export const currencyFormat = (
  num: number | string | undefined,
  currency: string = "$"
) => {
  return numbro(num).formatCurrency({ currencySymbol: currency, mantissa: 2 });
};
