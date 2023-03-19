export type Date = {
  day: string;
  month: string;
  year: string;
};

export const getDate = (date: string): string => {
  const d = date.split("T")[0].split("-");

  return `${d[2]}/${d[1]}`;
};

export const dateToObject = (date: string): Date => {
  if (date == "") {
    return { day: "", month: "", year: "1900" };
  }
  const d = date.split("T")[0].split("-");
  return { year: d[0], month: d[1], day: d[2] };
};

export const ObjectToDate = (obj: Date): string => {
  return `${obj.year}-${obj.month}-${obj.day}`;
};
