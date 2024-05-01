export function formatDate(dateObj: Date): string {
  return dateObj.toISOString().slice(0, 10);
}

export function getDateMinusDays(date: Date, days: number) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}
