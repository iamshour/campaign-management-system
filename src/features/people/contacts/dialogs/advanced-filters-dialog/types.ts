//#region Import
import type { SegmentConditionType } from "@/features/people/segments/types"
import type { OptionType } from "@/ui"

//#endregion

export type AdvancedFiltersTab = "newConditions" | "segmentSelection"

export type SegmentSelectionRenderedView = "editSegmentConditions" | "viewSegmentConditions"

export interface AdvancedFiltersDialogContextValue {
	/**
	 * Bool check which returns true if conditions are empty (Or has the default preset condition only)
	 */
	areContextConditionsEmpty: boolean

	/**
	 * Callback function used to clear conditions, resets to default value.
	 */
	clearConditions: () => void

	/**
	 * List of segment conditions
	 */
	conditions: SegmentConditionType[]

	/**
	 * Callback function used when selecting an option from the fetched segments in segments popover (2nd tab of dialog)
	 * @param segmentOption
	 */
	onSegmentSelection: (segmentOption?: OptionType) => void

	/**
	 * Callback Function passed to the `RadioGroup` on tabs/Views change
	 * @param tab Newly selected tab to switch to. Can be either `advancedFilter` or `segments`
	 */
	onTabChange: (tab: AdvancedFiltersTab) => void

	/**
	 * String represnting the open view inside segment selection tab (view can be view or edit)
	 */
	segmentSelectionTabView: SegmentSelectionRenderedView

	/**
	 * Selected option from dropdown list of fetched segments, rendered inside second tab of Dialog
	 */
	selectedSegmentOption?: OptionType

	/**
	 * Current selected tab of advanced filters dialog. Can be either `newConditions` or `segmentSelection`
	 */
	selectedTab: AdvancedFiltersTab

	/**
	 * Function to update the list of conditions
	 */
	setConditions: React.Dispatch<React.SetStateAction<SegmentConditionType[]>>

	/**
	 * Function to set the view inside segment selection tab
	 */
	setSegmentSelectionTabView: React.Dispatch<React.SetStateAction<SegmentSelectionRenderedView>>
}
