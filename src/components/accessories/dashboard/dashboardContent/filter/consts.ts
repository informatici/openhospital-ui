import moment from "moment";

export const getCachedPeriod = (): string[] => {
  let cachedPeriod = localStorage.getItem(btoa("dfp"));

  if (cachedPeriod && atob(cachedPeriod) !== null) {
    let period = JSON.parse(atob(cachedPeriod));

    return period;
  } else {
    return [
      moment().startOf("day").toISOString(),
      moment().endOf("day").toISOString(),
    ];
  }
};
