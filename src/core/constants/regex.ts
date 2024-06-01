// Name fields are alphanumeric with allowed special characters # @_`/&~ (space included)
export const REGEX_NAME_FIELDS = /^[a-zA-Z0-9# @_`/&~]*$/

export const REGEX_ALPHANUMERICAL = /^[a-zA-Z0-9 ]*$/

export const REGEX_EMAIL = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

export const REGEX_FILENAME = /^[^/\\:*?"<>|]+$/
