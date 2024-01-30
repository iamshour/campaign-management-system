//#region Import
import { lazy, memo } from "react"
import { useTranslation } from "react-i18next"
import type { OptionType } from "@blueai/ui"
import type { SegmentRuleType } from "@/features/people/segments/types"

const Input = lazy(() => import("@blueai/ui").then((mod) => ({ default: mod.Input })))
const Label = lazy(() => import("@blueai/ui").then((mod) => ({ default: mod.Label })))
const SelectTagsPopover = lazy(() => import("@/features/people/contacts/components/select-tags-popover"))
const SelectGroupsPopover = lazy(() => import("@/features/people/groups/components/select-groups-popover"))
const SelectSegmentsPopover = lazy(() => import("../select-segments-popover"))
const SelectCountryPopover = lazy(() => import("@blueai/ui").then((mod) => ({ default: mod.SelectCountryPopover })))
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
						creatable
						label={`${t("label")} *`}
						// TODO: Fix parent ComboBox to accept single entries
						// isMulti={false}
						selectedOptions={specification ? [specification as string] : []}
						updateSelectedOptions={(options) =>
							onSelectValueChange({ specification: options?.find((op) => op !== specification) })
						}
					/>
				)

			case "GROUPS":
				return (
					<SelectGroupsPopover
						label={`${t("label")} *`}
						// TODO: Fix parent ComboBox to accept single entries
						// isMulti={false}
						selectedOptions={group?.value ? ([group] as OptionType[]) : []}
						updateSelectedOptions={(options) =>
							onSelectValueChange({ group: options?.find((op) => op?.value !== group?.value) })
						}
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
						// TODO: Fix parent ComboBox to accept single entries
						// isMulti={false}
						selectedOptions={segment?.value ? ([segment] as OptionType[]) : []}
						updateSelectedOptions={(options) =>
							onSelectValueChange({ segment: options?.find((op) => op?.value !== segment?.value) })
						}
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
