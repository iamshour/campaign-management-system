//#region Import
import { Label, Select, Skeleton } from "@/ui"
import { lazy, Suspense, useCallback } from "react"
import { useTranslation } from "react-i18next"

import type { SegmentRuleAttribute, SegmentRuleCondition, SegmentRuleType } from "../../types"

import segmentRuleAttributeFields from "../../constants/segment-rule-attribute-fields"
import { useSegmentsFunnelContext } from "./segments-funnel-editable"

const SegmentSpecification = lazy(() => import("./segment-specification"))
//#endregion

interface SegmentRuleProps extends SegmentRuleType {
	conditionIdx: number
	ruleIdx: number
}

const SegmentRule = ({ conditionIdx, ruleIdx, ...rule }: SegmentRuleProps) => {
	const { attribute, condition } = rule

	const { t } = useTranslation("segments", { keyPrefix: "views.editableSegmentView.items.conditions.fields" })

	const { setConditions } = useSegmentsFunnelContext()

	/**
	 * Callback function used to update an existing rule props
	 * @param conditionId Condition id where a rule would be updated resides in
	 * @param rule Object of the updated rule
	 */
	const onSelectValueChange = useCallback(
		(updatedRule: Partial<SegmentRuleType>) => {
			setConditions((prev) =>
				prev?.map((condition, prevIdx) => {
					if (prevIdx === conditionIdx)
						return {
							...condition,
							rules: condition?.rules?.map((prevRule, prevRuleIdx) => {
								if (prevRuleIdx === ruleIdx) return { ...prevRule, ...updatedRule }

								return prevRule
							}),
						}

					return condition
				})
			)
		},
		[conditionIdx, ruleIdx, setConditions]
	)

	return (
		<div className='flex w-full flex-1 flex-wrap items-center gap-4 rounded-xl bg-[#F7F7F7] p-4'>
			{/* ATTRIBUTE  */}
			<div className='flex w-full max-w-[340px] flex-col'>
				<Label size='default'>{t("attribute.label")} *</Label>
				<Select
					onValueChange={(attribute) => onSelectValueChange({ ...EmptyConditionValues, attribute })}
					value={attribute}>
					<Select.Trigger className='w-full bg-white' hasValue={!!attribute?.length}>
						<Select.Value placeholder={t("attribute.placeholder")} />
					</Select.Trigger>
					<Select.Content sideOffset={8}>
						{segmentRuleAttributeFields.map(({ label, value }) => (
							<Select.Item key={value} value={value}>
								<Select.Text>{t(label)}</Select.Text>
							</Select.Item>
						))}
					</Select.Content>
				</Select>
			</div>

			{/* CONDITION  */}
			{!!attribute?.length && (
				<div className='flex w-full max-w-[340px] flex-col'>
					<Label size='default'>{t("condition.label")} *</Label>
					<Select
						onValueChange={(condition) => onSelectValueChange({ ...EmptyConditionValues, condition })}
						value={condition}>
						<Select.Trigger className='w-full bg-white' hasValue={!!condition?.length}>
							<Select.Value placeholder={t("condition.placeholder")} />
						</Select.Trigger>
						<Select.Content sideOffset={8}>
							{conditionsMap[attribute]?.map(({ label, value }) => (
								<Select.Item key={value} value={value}>
									<Select.Text>{t(label)}</Select.Text>
								</Select.Item>
							))}
						</Select.Content>
					</Select>
				</div>
			)}

			{/* SPECIFICATION  */}
			{!!attribute?.length &&
				!!condition?.length &&
				!(["IS_EMPTY", "IS_NOT_EMPTY"] as SegmentRuleCondition[]).includes(condition) && (
					<Suspense fallback={<Skeleton className='h-[40px] w-[340px] rounded-md' />}>
						<SegmentSpecification {...rule} onSelectValueChange={onSelectValueChange} ruleIdx={ruleIdx} />
					</Suspense>
				)}
		</div>
	)
}

export default SegmentRule

const EmptyConditionValues: Partial<SegmentRuleType> = {
	condition: "",
	country: undefined,
	group: undefined,
	segment: undefined,
	specification: undefined,
}

const allConditionFields: { label: string; value: SegmentRuleCondition }[] = [
	{ label: "condition.fields.is", value: "IS" },
	{ label: "condition.fields.isNot", value: "IS_NOT" },
	{ label: "condition.fields.startsWith", value: "STARTS_WITH" },
	{ label: "condition.fields.endsWith", value: "ENDS_WITH" },
	{ label: "condition.fields.contains", value: "CONTAINS" },
	{ label: "condition.fields.notContains", value: "NOT_CONTAINS" },
	{ label: "condition.fields.isEmpty", value: "IS_EMPTY" },
	{ label: "condition.fields.isNotEmpty", value: "IS_NOT_EMPTY" },
] as const

const pickConditionFields = (valuesToBePicked: SegmentRuleCondition[]) =>
	allConditionFields.filter(({ value }) => valuesToBePicked.includes(value))

const conditionsMap: Record<SegmentRuleAttribute, typeof allConditionFields> = {
	COUNTRY: pickConditionFields(["IS", "IS_NOT", "IS_EMPTY", "IS_NOT_EMPTY"]),
	EMAIL_ADDRESS: allConditionFields,
	FIRST_NAME: allConditionFields,
	GROUPS: pickConditionFields(["IS", "IS_NOT", "IS_EMPTY", "IS_NOT_EMPTY"]),
	LAST_NAME: allConditionFields,
	PHONE_NUMBER: allConditionFields,
	SEGMENTS: pickConditionFields(["IS", "IS_NOT"]),
	TAGS: pickConditionFields(["IS", "IS_NOT", "IS_EMPTY", "IS_NOT_EMPTY"]),
}
