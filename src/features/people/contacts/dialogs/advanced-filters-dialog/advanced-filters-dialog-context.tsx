//#region Import
import { createContext, useCallback, useContext, useLayoutEffect, useMemo, useState } from "react"

import useSelector from "@/core/hooks/useSelector"
import type { AdvancedTableStateValue } from "@/core/slices/advanced-table-slice"
import type { Contact } from "@/features/people/contacts/types"
import { emptySegmentCondition } from "@/features/people/segments/constants/preset-segments"
import type { SegmentConditionType } from "@/features/people/segments/types"
import { areConditionsEmpty } from "@/features/people/segments/utils"
import type { OptionType } from "@/ui"

import type { AdvancedFiltersDialogContextValue, AdvancedFiltersTab, SegmentSelectionRenderedView } from "./types"
//#endregion

const AdvancedFiltersDialogContextProvider = createContext<AdvancedFiltersDialogContextValue>(
	{} as AdvancedFiltersDialogContextValue
)

// eslint-disable-next-line
export const useAdvancedFiltersDialogContext = (): AdvancedFiltersDialogContextValue =>
	useContext(AdvancedFiltersDialogContextProvider)

const AdvancedFiltersDialogContext = ({ children }: { children: React.ReactNode }) => {
	const { filters } = useSelector<AdvancedTableStateValue<Contact>>(({ advancedTable }) => advancedTable["contacts"])
	const persistedSegmentOption = filters?.advancedFilters?.segment
	const persistedConditions = filters?.advancedFilters?.conditions

	const persistedAdvancedFiltersTab: AdvancedFiltersTab = persistedSegmentOption?.value?.length
		? "segmentSelection"
		: "newConditions"

	// Not re-using value in RTK directly since user may close - reopen
	// So creating Clonned state in Context for both conditions & selectedSegment
	const [conditions, setConditions] = useState<SegmentConditionType[]>(persistedConditions ?? [emptySegmentCondition])
	const [selectedSegmentOption, setSelectedSegmentOption] = useState<OptionType | undefined>(persistedSegmentOption)
	const [selectedTab, setSelectedTab] = useState<AdvancedFiltersTab>(persistedAdvancedFiltersTab)
	const [segmentSelectionTabView, setSegmentSelectionTabView] =
		useState<SegmentSelectionRenderedView>("viewSegmentConditions")

	useLayoutEffect(() => {
		setSelectedTab(persistedAdvancedFiltersTab)
	}, [persistedAdvancedFiltersTab])

	const clearConditions = useCallback(() => setConditions([emptySegmentCondition]), [])

	const onTabChange = useCallback(
		(tab: AdvancedFiltersTab) => {
			// save selection
			setSelectedTab(tab)

			// reset the open view in segment selection tab
			setSegmentSelectionTabView("viewSegmentConditions")

			//clear selected segment
			setSelectedSegmentOption(undefined)
			clearConditions()
		},
		[clearConditions]
	)

	const onSegmentSelection = useCallback((segment?: OptionType) => {
		if (!segment) clearConditions()

		setSelectedSegmentOption(segment)
		// eslint-disable-next-line
	}, [])

	const areContextConditionsEmpty = useMemo(() => areConditionsEmpty(conditions), [conditions])

	return (
		<AdvancedFiltersDialogContextProvider.Provider
			value={{
				conditions,
				selectedSegmentOption,
				selectedTab,
				setConditions,
				clearConditions,
				onTabChange,
				onSegmentSelection,
				areContextConditionsEmpty,
				segmentSelectionTabView,
				setSegmentSelectionTabView,
			}}>
			{children}
		</AdvancedFiltersDialogContextProvider.Provider>
	)
}

export default AdvancedFiltersDialogContext
