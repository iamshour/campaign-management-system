//#region Import
import type { SegmentConditionType, SegmentRuleAttribute, SegmentRuleType } from "../types"
//#endregion

export const emptySegmentRule = { attribute: "" as SegmentRuleAttribute } as SegmentRuleType

export const emptySegmentCondition: SegmentConditionType = {
	rules: [emptySegmentRule],
}
