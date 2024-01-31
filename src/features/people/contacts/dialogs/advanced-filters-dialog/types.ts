//#region Import
import type { OptionType } from "@blueai/ui"

import type { SegmentConditionType } from "@/features/people/segments/types"
//#endregion

export type AdvancedFiltersTab = "newConditions" | "segmentSelection"

export type SegmentSelectionRenderedView = "viewSegmentConditions" | "editSegmentConditions"
export interface AdvancedFiltersDialogContextValue {
	/**
	 * List of segment conditions
	 */
	conditions: SegmentConditionType[]

	/**
	 * Function to update the list of conditions
	 */
	setConditions: React.Dispatch<React.SetStateAction<SegmentConditionType[]>>

	/**
	 * Selected option from dropdown list of fetched segments, rendered inside second tab of Dialog
	 */
	selectedSegmentOption?: OptionType

	/**
	 * Current selected tab of advanced filters dialog. Can be either `newConditions` or `segmentSelection`
	 */
	selectedTab: AdvancedFiltersTab

	/**
	 * Callback function used to clear conditions, resets to default value.
	 */
	clearConditions: () => void

	/**
	 * Callback Function passed to the `RadioGroup` on tabs/Views change
	 * @param tab Newly selected tab to switch to. Can be either `advancedFilter` or `segments`
	 */
	onTabChange: (tab: AdvancedFiltersTab) => void

	/**
	 * Callback function used when selecting an option from the fetched segments in segments popover (2nd tab of dialog)
	 * @param segmentOption
	 */
	onSegmentSelection: (segmentOption: OptionType) => void

	/**
	 * Bool check which returns true if conditions are empty (Or has the default preset condition only)
	 */
	areContextConditionsEmpty: boolean

	/**
	 * String represnting the open view inside segment selection tab (view can be view or edit)
	 */
	segmentSelectionTabView: SegmentSelectionRenderedView

	/**
	 * Function to set the view inside segment selection tab
	 */
	setSegmentSelectionTabView: React.Dispatch<React.SetStateAction<SegmentSelectionRenderedView>>
}
