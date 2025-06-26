export function isValidISOString(dateString: string): boolean {
  if (typeof dateString !== 'string') {
    return false;
  }

  if (dateString.length !== 24) {
    return false;
  }

  const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

  if (!isoRegex.test(dateString)) {
    return false;
  }

  const date = new Date(dateString);

  return !isNaN(date.getTime()) && date.toISOString() === dateString;
}
