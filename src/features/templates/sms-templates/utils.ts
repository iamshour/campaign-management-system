//#region Import
import { MAX_GSM_TOTAL_CHARS, MAX_UNICODE_TOTAL_CHARS } from "./constants/sms-template-body-constants"
import {
	STANDARD_GSM_REGEX,
	EXTENDED_GSM_REGEX,
	EMOJI_REGEX,
	PLACEHOLDER_REGEX,
} from "./constants/sms-template-body-regex"
//#endregion

/**
 * Function that checks if a string contains only GSM supportes characters based on unicode
 * @param text: string
 * @returns boolean resulting from check, true if only GMS supported characters found,
 * 			  false if unsupported characters found
 */
export const checkIfHasGsmCharactersOnly = (text: string) => {
	if (!text) return true

	return text.split("").every((c) => STANDARD_GSM_REGEX.test(c) || EXTENDED_GSM_REGEX.test(c))
}

/**
 * Function that takes a text with placeholders and rearranges the placeholders counter from lower to higher
 * @example:
 * 		input text: Hello {{1}}. This is a sample SMS text from company {{3}}. About {{2}} promotion.
 * 		output text: Hello {{1}}. This is a sample SMS text from company {{2}}. About {{3}} promotion.
 * @param text: string containing the placeholders to be rearranged
 * @returns finalText: string after rearrangement
 */
export const rearrangePlaceholders = (text: string) => {
	const list = text.split(PLACEHOLDER_REGEX)
	return list.reduce((prev, current, idx) => (idx > 0 ? prev + `{{${idx}}}` + current : current), "")
}

/**
 * Function that checks if a string contains emojis based on unicode
 * @param text: string
 * @returns boolean resulting from check, true if text contains emojis, false otherwise
 */
export const checkIfHasEmoji = (text: string) => {
	if (!text) return false

	return !!text.match(EMOJI_REGEX)
}

/**
 * Function that takes a text and remove emojis from it
 * @example:
 * 		input text: Hello😃. This is a sample SMS text.
 * 		output text: Hello. This is a sample SMS text.
 * @param text: string containing the emojis
 * @returns finalText: string after removing emojis
 */
export const removeEmojisFromString = (text: string) => {
	if (!text) return ""

	return text.split(EMOJI_REGEX).join("")
}

/**
 * Function that counts the number of characters in sms body. It counts all text characters normally
 * with the exception of GMS extended characters which are counted as 2 characters each.
 * @link https://support.dotdigital.com/en/articles/8199189-gsm-character-set
 *
 * @param text: string
 * @returns number respresenting the total count
 */
export const getTotalCharactersCount = (text: string) => {
	if (!text) return 0

	const countOfExtendedGsmCharacters = text.split("").filter((c) => EXTENDED_GSM_REGEX.test(c))?.length || 0

	return text.length + countOfExtendedGsmCharacters
}

/**
 * Function that return the total number of characters allowed in textarea
 * 800 for english text, 160 for texts with unicode characters
 * @param text: string
 * @returns number respresenting the max total
 */
export const getMaxTotalCharacters = (text: string) => {
	const textHasGsmCharactersOnly = checkIfHasGsmCharactersOnly(text)

	if (!textHasGsmCharactersOnly) return MAX_UNICODE_TOTAL_CHARS

	return MAX_GSM_TOTAL_CHARS
}
