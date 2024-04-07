//#region Import
import type { SegmentRuleType } from "@/features/people/segments/types"

import { lazy, memo } from "react"
import { useTranslation } from "react-i18next"

const Input = lazy(() => import("@/ui/input/input"))

const Label = lazy(() => import("@/ui/label/label"))

const SelectTagsPopover = lazy(
	() => import("@/features/people/contacts/components/select-tags-popover/select-tags-popover")
)

const SelectGroupsPopover = lazy(
	() => import("@/features/people/groups/components/select-groups-popover/select-groups-popover")
)

const SelectSegmentsPopover = lazy(() => import("../select-segments-popover/select-segments-popover"))

const SelectCountryPopover = lazy(() => import("@/ui/popovers/select-country-popover/select-country-popover"))
//#endregion

type SegmentSpecificationProps = Omit<SegmentRuleType, "contactSegmentRuleCondition"> &
	Pick<SegmentRuleType, "attribute"> & {
		onSelectValueChange: (updatedRule: Partial<SegmentRuleType>) => void
		ruleIdx: number
	}

const SegmentSpecification = memo(
	({ attribute, country, group, onSelectValueChange, ruleIdx, segment, specification }: SegmentSpecificationProps) => {
		const { t } = useTranslation("segments", {
			keyPrefix: "views.editableSegmentView.items.conditions.fields.specification",
		})

		switch (attribute) {
			case "TAGS":
				return (
					<SelectTagsPopover
						creatable
						label={`${t("label")} *`}
						selection={specification ? { label: specification, value: specification } : undefined}
						updateSelection={(option) => onSelectValueChange({ specification: option?.value })}
					/>
				)

			case "GROUPS":
				return (
					<SelectGroupsPopover
						label={`${t("label")} *`}
						selection={group}
						updateSelection={(group) => onSelectValueChange({ group })}
					/>
				)
			case "COUNTRY":
				return (
					<SelectCountryPopover
						label={`${t("label")} *`}
						onChange={(country) => onSelectValueChange({ country })}
						value={country as any}
						withCountryCode={false}
					/>
				)

			case "SEGMENTS":
				return (
					<SelectSegmentsPopover
						label={`${t("label")} *`}
						selection={segment}
						updateSelection={(segment) => onSelectValueChange({ segment })}
					/>
				)

			default:
				return (
					<div className='w-full max-w-[340px]'>
						<Label htmlFor={`specification-${ruleIdx}`}>{t("label")} *</Label>
						<Input
							className='w-full bg-white'
							id={`specification-${ruleIdx}`}
							onChange={(e) => onSelectValueChange({ specification: e.target.value })}
							placeholder={t("placeholder")}
							value={specification}
						/>
					</div>
				)
		}
	}
)

SegmentSpecification.displayName = "SegmentSpecification"

export default SegmentSpecification
