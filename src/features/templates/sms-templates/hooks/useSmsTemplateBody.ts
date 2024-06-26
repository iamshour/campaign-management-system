//#region Import
import { useCallback } from "react"

import { MAX_GMS_CHARS_PER_PART, MAX_UNICODE_CHARS_PER_PART } from "../constants/sms-template-body-constants"
import { PLACEHOLDER_REGEX } from "../constants/sms-template-body-regex"
import {
	checkIfHasEmoji,
	checkIfHasGsmCharactersOnly,
	getTotalCharactersCount,
	rearrangePlaceholders,
	removeEmojisFromString,
} from "../utils"
//#endregion

interface useSmsTemplateBodyReturnType {
	charactersCountInCurrentPart: number
	getReformattedBody: (text: string) => string
	maxCharactersPerPart: number
	partsCount: number
	placeholdersCount: number
}

const useSmsTemplateBody = (currentText: string): useSmsTemplateBodyReturnType => {
	const charactersCount = getTotalCharactersCount(currentText)

	// Check if text consists of GMS accepted characters only
	const hasGMSCharactersOnly = checkIfHasGsmCharactersOnly(currentText)

	const maxCharactersPerPart = hasGMSCharactersOnly ? MAX_GMS_CHARS_PER_PART : MAX_UNICODE_CHARS_PER_PART

	const charactersCountInCurrentPart = charactersCount
		? charactersCount % maxCharactersPerPart || maxCharactersPerPart
		: 0

	const partsCount = charactersCount ? Math.ceil(charactersCount / maxCharactersPerPart) : 0

	const placeholdersCount = currentText?.match(PLACEHOLDER_REGEX)?.length ?? 0

	/**
	 * Function that fixes the body format to satisfy requirements.
	 * 		1- rearranges placeholders
	 * 		2- removes emojis from text
	 * @param text: string to be formatted
	 * @returns finalText: string with fixed formatting
	 */
	const getReformattedBody = useCallback((text: string) => {
		let formattedBody = rearrangePlaceholders(text)

		if (checkIfHasEmoji(text)) {
			formattedBody = removeEmojisFromString(formattedBody)
		}

		return formattedBody
	}, [])

	return {
		charactersCountInCurrentPart,
		getReformattedBody,
		maxCharactersPerPart,
		partsCount,
		placeholdersCount,
	}
}

export default useSmsTemplateBody
