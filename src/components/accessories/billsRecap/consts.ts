export const monthList = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const yearList = Array.from(
  new Array(10),
  (val, index) => new Date().getFullYear() - index
);
