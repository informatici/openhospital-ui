import moment from "moment";

/**
 * @param date1 The lower date
 * @param date2 The upper date
 * @param labels The array containing the period labels in the order "yearLabel, monthLabel, weekLabel, dayLabel"
 * @returns Returns the diff between [date1] and [date2] formatted in "nbYears labels[0], nbMonths labels[1], nbWeeks labels[2], nbDays labels[3]"
 */
export const formatDateDiff = (date1: string, date2: string, labels: any[]) => {
  if (!moment(date1).isValid() || !moment(date2).isValid()) {
    return null;
  }
  if (moment(date1).isAfter(moment(date2))) {
    return null;
  }
  const b = moment(date1);
  const a = moment(date2);
  const intervals: moment.unitOfTime.Diff[] = [
    "years",
    "months",
    "weeks",
    "days",
  ];
  var out = [];

  for (var i = 0; i < intervals.length; i++) {
    const diff = a.diff(b, intervals[i]);
    b.add(diff, intervals[i]);
    if (diff > 0) {
      out.push(diff + " " + labels[i]);
    }
  }
  return out.join(", ");
};
