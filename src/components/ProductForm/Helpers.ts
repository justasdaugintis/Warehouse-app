/**
 * Generates unique id's for products
 */
export const idGenerator = (): string => {
  let id: string = "product:id:";

  for (let index = 0; index < 9; index++) {
    id += Math.floor(Math.random() * 9).toString();
  }

  return id;
};

/**
 * Formats strings from the form
 */
export const formatString = (string: string): string => {
  const cleanedString = string.toLowerCase().trim();

  const formattedString = cleanedString.charAt(0).toUpperCase() + cleanedString.slice(1);

  return formattedString;
};
