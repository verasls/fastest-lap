export function getCurrentYear(): number {
  return new Date().getFullYear();
}

export function getCurrentDate(): string {
  const date: Date = new Date();
  const year: number = date.getFullYear();
  const month: string = String(date.getMonth() + 1).padStart(2, "0");
  const day: string = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
