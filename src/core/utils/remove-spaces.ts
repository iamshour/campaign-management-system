/**
 * Quick & simple method to remove any space in a given sentance
 * @param sentance Sentance to have every single space removed
 * @returns sentance without any space
 */
const removeSpaces = (sentance?: string) => sentance?.trim()?.replace(" ", "") ?? ""

export default removeSpaces
