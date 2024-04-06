export function formatDate(dateObj: Date) {
  let date: string | number = dateObj.getDate();
  if (date < 10) {
    date = `0${date}`;
  }

  let month: string | number = dateObj.getMonth() + 1;
  if (month < 10) {
    month = `0${month}`;
  }
  return `${dateObj.getFullYear()}-${month}-${date}`;
}
