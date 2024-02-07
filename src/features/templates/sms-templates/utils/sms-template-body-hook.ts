import {
	MAX_ENGLISH_CHARS_PER_PART,
	MAX_UNICODE_CHARS_PER_PART,
	PLACEHOLDER_REGEX,
} from "../constants/sms-template-body-constants"

import { textHasArabicCharacters } from "./sms-template-body-utils"

interface useSmsTemplateBodyReturnType {
	maxCharactersPerPart: number
	charactersCountInCurrentPart: number
	partsCount: number
	placeholdersCount: number
}

const useSmsTemplateBody = (currentText: string): useSmsTemplateBodyReturnType => {
	const charactersCount = currentText?.length
	// TODO: handle all unicode languages not only arabic (check textHasUnicodeCharacters function in utils)
	const hasArabicCharacters = textHasArabicCharacters(currentText)
	const maxCharactersPerPart = hasArabicCharacters ? MAX_UNICODE_CHARS_PER_PART : MAX_ENGLISH_CHARS_PER_PART
	const charactersCountInCurrentPart = charactersCount
		? charactersCount % maxCharactersPerPart || maxCharactersPerPart
		: 0
	const partsCount = charactersCount ? Math.ceil(charactersCount / maxCharactersPerPart) : 0
	const placeholdersCount = currentText?.match(PLACEHOLDER_REGEX)?.length ?? 0

	return {
		maxCharactersPerPart,
		charactersCountInCurrentPart,
		partsCount,
		placeholdersCount,
	}
}

export default useSmsTemplateBody
