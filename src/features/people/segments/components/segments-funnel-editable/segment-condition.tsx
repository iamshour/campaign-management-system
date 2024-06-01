//#region Import
import type { SegmentRuleType } from "@/features/people/segments/types"

import { emptySegmentRule } from "@/features/people/segments/constants/preset-segments"
import { Button, Tooltip } from "@/ui"
import IcBaselineDelete from "~icons/ic/baseline-delete"
import { Fragment, memo } from "react"
import { useTranslation } from "react-i18next"

import SegmentRule from "./segment-rule"
import { useSegmentsFunnelContext } from "./segments-funnel-editable"
//#endregion

interface SegmentConditionProps {
	conditionIdx: number

	rules: SegmentRuleType[]
}

const SegmentCondition = memo(({ conditionIdx, rules }: SegmentConditionProps) => {
	const { t } = useTranslation("segments", { keyPrefix: "views.editableSegmentView.items.conditions" })

	const { conditionsLength, setConditions } = useSegmentsFunnelContext()

	/**
	 * Callback function used to add a new rule in a specified condition
	 */
	const addRule = () => {
		setConditions((prev) =>
			prev.map((condition, prevIdx) => {
				if (prevIdx === conditionIdx)
					return {
						...condition,
						rules: [...condition.rules, emptySegmentRule],
					}

				return condition
			})
		)
	}

	/**
	 * Callback function used to delete a rule from a specified condition
	 * @param ruleIdx Rule Idx that belonging to the rule to be deleted
	 */
	const removeRule = (ruleIdx: number) => {
		setConditions((prev) =>
			prev.map((condition, prevIdx) => {
				if (prevIdx === conditionIdx)
					return {
						...condition,
						rules: condition?.rules.filter((_, prevRuleIdx) => prevRuleIdx !== ruleIdx),
					}

				return condition
			})
		)
	}

	/**
	 * Callback function used to remove a condition (Only used if conditionsLength > 1)
	 */
	const removeCondition = () => setConditions((prev) => prev.filter((_, prevIdx) => prevIdx !== conditionIdx))

	return (
		<div className='relative flex w-full flex-1 flex-col gap-2'>
			<h4 className='text-lg font-medium'>{t("conditionCount", { count: conditionIdx + 1 })}</h4>

			<div className='flex w-full flex-col gap-2 rounded-xl bg-white p-4'>
				{rules?.map((rule, ruleIdx) => (
					<Fragment key={ruleIdx}>
						<div className='flex items-center gap-2'>
							<SegmentRule {...rule} conditionIdx={conditionIdx} ruleIdx={ruleIdx} />

							{rules?.length > 1 && (
								<Tooltip content={t("actions.deleteRule")} side='left' sideOffset={8}>
									<Button
										className='h-6 w-6 shrink-0 rounded-full p-0 text-2xl'
										onClick={() => removeRule(ruleIdx)}
										type='button'
										variant='destructive'>
										-
									</Button>
								</Tooltip>
							)}
						</div>

						{ruleIdx !== rules?.length - 1 && <p className='text-sm font-bold text-gray-400'>{t("andRule")}</p>}
					</Fragment>
				))}

				<div className='mt-4 flex w-full items-center justify-between'>
					<Button
						className='w-max'
						// Max Number of allowed rules === 10
						disabled={rules?.length >= 10}
						onClick={addRule}
						size='sm'
						type='button'
						variant='outline'>
						{t("actions.andRule")}
					</Button>

					{
						// Renders Delete condition button only if conditions length are more than two
						conditionsLength > 1 && (
							<Tooltip content={t("actions.deleteCondition")} side='left' sideOffset={8}>
								<Button
									className='h-max w-max p-0 text-xl text-gray-400 hover:bg-transparent hover:text-primary-700'
									onClick={removeCondition}
									type='button'
									variant='ghost'>
									<IcBaselineDelete />
								</Button>
							</Tooltip>
						)
					}
				</div>
			</div>
		</div>
	)
})

SegmentCondition.displayName = "SegmentCondition"

export default SegmentCondition
