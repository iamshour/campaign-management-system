//#region Import
import type { SegmentConditionType } from "@/features/people/segments/types"

import { Fragment } from "react"
import { useTranslation } from "react-i18next"
import { twMerge } from "tailwind-merge"

import SegmentRuleReadonly from "./segment-rule-readonly"
//#endregion

interface SegmentsFunnelReadonlyProps extends Pick<React.HTMLAttributes<HTMLDivElement>, "className"> {
	conditions?: SegmentConditionType[]
}

const SegmentsFunnelReadonly = ({ className, conditions }: SegmentsFunnelReadonlyProps) => {
	const { t } = useTranslation("segments", { keyPrefix: "views" })

	return (
		<div className={twMerge("flex h-full flex-1 flex-col gap-6", className)}>
			{!conditions?.length ? (
				<div className='h-full text-2xl font-light text-gray-500 flex-center'>No Conditions Found</div>
			) : (
				conditions?.map(({ rules }, conditionIdx) => (
					<div key={conditionIdx}>
						<h3 className='mb-2 font-medium'>
							{t("editableSegmentView.items.conditions.conditionCount", { count: conditionIdx + 1 })}
						</h3>

						<div className='flex w-full flex-col gap-2 rounded-xl bg-white p-4'>
							{rules?.map(({ attribute, condition, country, group, segment, specification }, ruleIdx) => (
								<Fragment key={ruleIdx}>
									<div className='flex w-full flex-wrap gap-4'>
										<SegmentRuleReadonly
											label={t("editableSegmentView.items.conditions.fields.attribute.label")}
											value={attribute}
										/>
										<SegmentRuleReadonly
											label={t("editableSegmentView.items.conditions.fields.condition.label")}
											value={condition}
										/>
										{!!group?.value?.length && (
											<SegmentRuleReadonly
												label={t("editableSegmentView.items.conditions.fields.specification.label")}
												showBadge
												value={group.label}
											/>
										)}
										{!!segment?.value?.length && (
											<SegmentRuleReadonly
												label={t("editableSegmentView.items.conditions.fields.specification.label")}
												showBadge
												value={segment.label}
											/>
										)}
										{!!country && (
											<SegmentRuleReadonly
												label={t("editableSegmentView.items.conditions.fields.specification.label")}
												showBadge
												// TODO: MAPPING TO SHOW FLAG ??
												value={country}
											/>
										)}

										{!!specification && !group?.value && !segment?.value && !country && (
											<SegmentRuleReadonly
												label={t("editableSegmentView.items.conditions.fields.specification.label")}
												value={specification}
											/>
										)}
									</div>

									{ruleIdx !== rules?.length - 1 && (
										<p className='text-sm font-bold text-gray-400'>
											{t("editableSegmentView.items.conditions.andRule")}
										</p>
									)}
								</Fragment>
							))}
						</div>
					</div>
				))
			)}
		</div>
	)
}

export default SegmentsFunnelReadonly
