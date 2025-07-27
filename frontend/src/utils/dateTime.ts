import { formatDate } from "date-fns";

// Converts a given date and time into ISO format expected by the database.
export const getDateTimeForDb = (date: string, time: string) => {
  const currentDate = formatDate(new Date(date), "yyyy-MM-dd");
  const newDateTime = `${currentDate}T${time}:00`;
  return newDateTime;
};
