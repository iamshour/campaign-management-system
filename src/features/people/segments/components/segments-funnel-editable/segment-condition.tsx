//#region Import
import Button from "@package/ui/src/button"
import Tooltip from "@package/ui/src/tooltip"
import { Fragment, memo } from "react"
import { useTranslation } from "react-i18next"

import { emptySegmentRule } from "@/features/people/segments/constants/preset-segments"
import type { SegmentRuleType } from "@/features/people/segments/types"

import SegmentRule from "./segment-rule"

import { useSegmentsFunnelContext } from "."

import IcBaselineDelete from "~icons/ic/baseline-delete"
//#endregion

interface SegmentConditionProps {
	rules: SegmentRuleType[]

	conditionIdx: number
}

const SegmentCondition = memo(({ rules, conditionIdx }: SegmentConditionProps) => {
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
							<SegmentRule {...rule} ruleIdx={ruleIdx} conditionIdx={conditionIdx} />

							{rules?.length > 1 && (
								<Tooltip>
									<Tooltip.Trigger asChild>
										<Button
											type='button'
											onClick={() => removeRule(ruleIdx)}
											className='h-6 w-6 shrink-0 rounded-full p-0 text-2xl'
											variant='destructive'>
											-
										</Button>
									</Tooltip.Trigger>

									<Tooltip.Content side='left' sideOffset={8} content={t("actions.deleteRule")} />
								</Tooltip>
							)}
						</div>

						{ruleIdx !== rules?.length - 1 && <p className='text-sm font-bold text-gray-400'>{t("andRule")}</p>}
					</Fragment>
				))}

				<div className='mt-4 flex w-full items-center justify-between'>
					<Button
						type='button'
						variant='outline'
						size='sm'
						className='w-max'
						onClick={addRule}
						// Max Number of allowed rules === 10
						disabled={rules?.length >= 10}>
						{t("actions.andRule")}
					</Button>

					{
						// Renders Delete condition button only if conditions length are more than two
						conditionsLength > 1 && (
							<Tooltip>
								<Tooltip.Trigger asChild>
									<Button
										type='button'
										onClick={removeCondition}
										className='h-max w-max p-0 text-xl text-gray-400 hover:bg-transparent hover:text-primary-700'
										variant='ghost'>
										<IcBaselineDelete />
									</Button>
								</Tooltip.Trigger>

								<Tooltip.Content side='left' sideOffset={8} content={t("actions.deleteCondition")} />
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
