export const getDate = (date: string): string => {
  const d = date.split("T")[0].split("-");

  return `${d[2]}/${d[1]}`;
};
