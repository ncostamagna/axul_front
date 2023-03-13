export const MONTHS = [
  { key: "01", value: "January" },
  { key: "02", value: "February" },
  { key: "03", value: "March" },
  { key: "04", value: "April" },
  { key: "05", value: "May" },
  { key: "06", value: "June" },
  { key: "07", value: "July" },
  { key: "08", value: "August" },
  { key: "09", value: "September" },
  { key: "10", value: "October" },
  { key: "11", value: "November" },
  { key: "12", value: "December" },
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

const rangeDays = (): string[] => {
  const _days = range(1, 31, false);
  let days: string[] = [];
  for (const d of _days) {
    days.push(d < 10 ? `0${d}` : `${d}`);
  }
  return days;
};

export let DAYS = rangeDays();

export let YEARS = range(1900, new Date().getFullYear(), true);
