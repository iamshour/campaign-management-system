//#region Import
import type { SegmentRuleCondition, SegmentConditionType, SegmentRuleType } from "./types"
//#endregion

const isRuleValid = (rule: Partial<SegmentRuleType>) => {
	if (!rule?.attribute?.length || !rule?.condition?.length) return false

	// Checking if condition will render a specification field, and specification field has valid value
	if (!(["IS_EMPTY", "IS_NOT_EMPTY"] as SegmentRuleCondition[]).includes(rule.condition)) {
		if (rule?.attribute === "GROUPS") return !!rule?.group?.value
		if (rule?.attribute === "SEGMENTS") return !!rule?.segment?.value
		if (rule?.attribute === "COUNTRY") return !!rule?.country?.length

		return !!rule?.specification?.length
	}

	return true
}
const isConditionValid = (condition: Partial<SegmentConditionType[][number]>) => {
	if (!condition?.rules?.length || condition.rules.length > 10) return false

	return condition?.rules.every((rule) => isRuleValid(rule))
}

export const areConditionsValid = (conditions?: SegmentConditionType[]) => {
	if (!conditions?.length || conditions.length > 10) return false

	return conditions.every((condition) => isConditionValid(condition))
}

export const areConditionsEmpty = (conditions?: SegmentConditionType[]) => {
	if (!conditions?.length) return true

	if (conditions?.length == 1 && conditions[0].rules?.length == 1)
		return Object.values(conditions[0].rules[0]).every((val) => val === "")

	return false
}
