//#region Import
//#endregion

import { SegmentRuleAttribute } from "../types"

/**
 * List of fields used in a Segment Rule's attribute field
 */
const segmentRuleAttributeFields: { label: string; value: SegmentRuleAttribute }[] = [
	{ label: "attribute.fields.firstName", value: "FIRST_NAME" },
	{ label: "attribute.fields.lastName", value: "LAST_NAME" },
	{ label: "attribute.fields.phoneNumber", value: "PHONE_NUMBER" },
	{ label: "attribute.fields.email", value: "EMAIL_ADDRESS" },
	{ label: "attribute.fields.country", value: "COUNTRY" },
	{ label: "attribute.fields.tags", value: "TAGS" },
	{ label: "attribute.fields.groups", value: "GROUPS" },
	{ label: "attribute.fields.segments", value: "SEGMENTS" },
]
export default segmentRuleAttributeFields
