import dayjs from "dayjs";

export default function formatDayJSDate(date) {
  return dayjs(date).format("DD/MM/YYYY");
}
