/**
 * Regular experssions to detect Template body placeholder
 * @example placeholder format: {{3}}
 */
export const PLACEHOLDER_REGEX = /\{\{[0-9]+\}\}/g

/**
 * Regular experssions to detect Emojis in string
 */
export const EMOJI_REGEX =
	// eslint-disable-next-line max-len
	/(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/

/**
 * Regular experssions to detect GSM Character Set
 * Standard GMS character set: characters accepted in Standard Single SMS
 * Extended GMS character set: characters also accepted in Standard Single SMS but each character should be counted as 2 characters
 *
 * @link https://support.dotdigital.com/en/articles/8199189-gsm-character-set
 */
// eslint-disable-next-line
export const STANDARD_GSM_REGEX = /[\u0000-\u007F]/

export const EXTENDED_GSM_REGEX = /[\u20ac\u240c\u005b\u005c\u005d\u005e\u007b\u007c\u007d\u007e\u007e]/
