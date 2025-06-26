export function isValidDateString(dateString: string): boolean {
  if (!dateString) {
    return false;
  }

  const date = new Date(dateString);

  return !isNaN(date.getTime());
}
