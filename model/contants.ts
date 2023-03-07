export const MONTHS = [
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

const range = (start: number, end: number, reverse: boolean): number[] => {
  let value: number[] = [];
  if (reverse) {
    for (let i = end; i >= start; i--) {
      value.push(i);
    }
  } else {
    for (let i = start; i <= end; i++) {
      value.push(i);
    }
  }

  return value;
};

export let DAYS = range(1, 31, false);

export let YEARS = range(1900, new Date().getFullYear(), true);
