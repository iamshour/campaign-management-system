//#region Import
import { ARABIC_REGEX, PLACEHOLDER_REGEX } from "../constants/sms-template-body-constants"
//#endregion

/**
 * Function that takes a text with placeholders and rearranges the placeholders counter from lower to higher
 * @example:
 * 		input text: Hello {{1}}. This is a sample SM text from company {{3}}. About {{2}} promotion.
 * 		output text: Hello {{1}}. This is a sample SM text from company {{2}}. About {{3}} promotion.
 * @param text: string containing the placeholders to be rearranged
 * @returns finalText: string after rearrangement
 */
export const rearrangePlaceholders = (text: string) => {
	const list = text.split(PLACEHOLDER_REGEX)
	return list.reduce((prev, current, idx) => (idx > 0 ? prev + `{{${idx}}}` + current : current), "")
}

// TODO: the following utils functions can be moved to global utils later since they are not specific to sms template

/**
 * Function that checks if a string contains arabic characters based on unicode
 * @param text: string
 * @returns boolean resulting from check, true if arabic character found, false otherwise
 */
export const textHasArabicCharacters = (text: string) => {
	if (!text) return false

	return !!text.match(ARABIC_REGEX)
}

/* 

TODO: use following functions in SmsTemplateBodyTextarea.
** Logic: - if code has only english characters, return false
          - if code has english characters and emojis, return false
          - if code has any unicode character that is not an emoji, return true


** Issue with this code: EMOJI_REGEX does not support all emojis


export const textHasUnicodeCharacters = (text: string) => {
	// Text is empty:
	if (!text) return false

	// Text does not contain any unicode characters:
	if (!text.match(UNICODE_REGEX)) return false

	// Text contains some unicode characters:
	// here we check if these unicode characters are emojis
	// if we find characters that are unicode but are not emojis, this means that user is using a unicode language (arabic...)
	return [...text].some((character) => {
		return isCharacterUnicode(character) && !isCharacterEmoji(character)
	})
}

export const isCharacterUnicode = (character: string) => {
	const UNICODE_REGEX = /[^\u0000-\u00ff]/
	return !!character.match(UNICODE_REGEX)
}

export const isCharacterEmoji = (character: string) => {
	const EMOJI_REGEX = /([\uD800-\uDBFF][\uDC00-\uDFFF])/
	return !!character.match(EMOJI_REGEX)
}

*/
