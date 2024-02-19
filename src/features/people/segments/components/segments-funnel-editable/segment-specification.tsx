//#region Import
import { lazy, memo } from "react"
import { useTranslation } from "react-i18next"

import type { SegmentRuleType } from "@/features/people/segments/types"

const Input = lazy(() => import("@/ui/input"))
const Label = lazy(() => import("@/ui/label/label"))
const SelectTagsPopover = lazy(() => import("@/features/people/contacts/components/select-tags-popover"))
const SelectGroupsPopover = lazy(() => import("@/features/people/groups/components/select-groups-popover"))
const SelectSegmentsPopover = lazy(() => import("../select-segments-popover"))
const SelectCountryPopover = lazy(() => import("@/ui/select-country-popover/select-country-popover"))
//#endregion

type SegmentSpecificationProps = Omit<SegmentRuleType, "contactSegmentRuleCondition"> &
	Pick<SegmentRuleType, "attribute"> & {
		ruleIdx: number
		onSelectValueChange: (updatedRule: Partial<SegmentRuleType>) => void
	}

const SegmentSpecification = memo(
	({ attribute, specification, segment, group, country, ruleIdx, onSelectValueChange }: SegmentSpecificationProps) => {
		const { t } = useTranslation("segments", {
			keyPrefix: "views.editableSegmentView.items.conditions.fields.specification",
		})

		switch (attribute) {
			case "TAGS":
				return (
					<SelectTagsPopover
						isCreatable
						isMulti={false}
						label={`${t("label")} *`}
						selection={specification ? { label: specification, value: specification } : undefined}
						updateSelection={(option) => onSelectValueChange({ specification: option?.value })}
					/>
				)

			case "GROUPS":
				return (
					<SelectGroupsPopover
						label={`${t("label")} *`}
						isMulti={false}
						selection={group}
						updateSelection={(group) => onSelectValueChange({ group })}
					/>
				)
			case "COUNTRY":
				return (
					<SelectCountryPopover
						value={country as any}
						onChange={(country) => onSelectValueChange({ country })}
						withCountryCode={false}
						label={`${t("label")} *`}
					/>
				)

			case "SEGMENTS":
				return (
					<SelectSegmentsPopover
						label={`${t("label")} *`}
						isMulti={false}
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
							placeholder={t("placeholder")}
							value={specification ?? ""}
							onChange={(e) => onSelectValueChange({ specification: e.target.value })}
						/>
					</div>
				)
		}
	}
)

SegmentSpecification.displayName = "SegmentSpecification"

export default SegmentSpecification
