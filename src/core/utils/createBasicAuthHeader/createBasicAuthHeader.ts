export const createBasicAuthHeader = (
  username: string,
  password: string,
): string => {
  const credentials = Buffer.from(`${username}:${password}`).toString('base64');
  return `Basic ${credentials}`;
};
