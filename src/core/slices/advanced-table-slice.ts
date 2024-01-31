//#region Import
import type { OptionType, DateRange, TableState } from "@blueai/ui"
import { getObjectSize } from "@blueai/utils"
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

import type { Contact } from "@/features/people/contacts/types"
import type { ContactExportStatusOption, ContactExports } from "@/features/people/exports/types"
import type { Group } from "@/features/people/groups/types"
import type { SegmentConditionType } from "@/features/people/segments/types"
//#endregion

export type ListGridView = "List View" | "Grid View"

export type TableKey =
	| "contacts"
	| "contacts-in-group"
	| "add-contacts-to-group"
	| "groups"
	| "contacts-exports"
	| "segments"

export type FiltersFields = {
	dateRange?: DateRange
	tags?: string[]
	groups?: OptionType[]
	status?: ContactExportStatusOption[]
	exportedBy?: string[]
	advancedFilters?: {
		segment?: OptionType
		conditions: SegmentConditionType[]
	}
}

export type AdvancedTableStateValue<TData> = TableState<TData> & {
	searchTerm?: string

	filters?: FiltersFields

	appliedFiltersCount?: number

	view?: ListGridView
}

export type AdvancedTableState = {
	[K in TableKey]: AdvancedTableStateValue<unknown>
}

const defaultDataTableState = {
	offset: 0,
	limit: 25,
}
const defaultGroupsDataTableState = { ...defaultDataTableState, view: "List View" as ListGridView, limit: 10 }

const initialState: AdvancedTableState = {
	contacts: defaultDataTableState,
	"contacts-in-group": defaultDataTableState,
	"add-contacts-to-group": defaultDataTableState,
	groups: defaultGroupsDataTableState,
	"contacts-exports": defaultDataTableState,
	segments: defaultDataTableState,
}

const advancedTableSlice = createSlice({
	name: "advancedTable",
	initialState,
	reducers: {
		/**
		 * @description Function used to update contacts table state
		 * when search is applied, offset is reset to 0 so the user is taken to first page in table
		 * @param param1 Table State, which includes `sort, order, offset, limit, and selection`
		 */
		updateAdvancedTableState: (
			state,
			{
				payload,
			}: PayloadAction<{
				[K in TableKey]?: Partial<
					AdvancedTableStateValue<K extends "groups" ? Group : K extends "contacts-exports" ? ContactExports : Contact>
				>
			}>
		) => {
			const tableKey = Object.keys(payload)[0] as TableKey
			const payloadValue = Object.values(payload)[0]

			if (!payloadValue) return

			return {
				...state,
				[tableKey]: { ...state[tableKey], offset: 0, ...payloadValue },
			}
		},

		updateSelection: (state, { payload }: PayloadAction<{ [K in TableKey]?: string | string[] | "ALL" }>) => {
			const tableKey = Object.keys(payload)[0] as TableKey
			const payloadValue = Object.values(payload)[0]

			const prevState = state[tableKey]
			const prevSelection = prevState?.selection

			let newSelection: string[] | "ALL" | undefined

			if (payloadValue === "ALL") {
				newSelection = "ALL"
			} else if (typeof payloadValue === "string") {
				newSelection =
					!prevSelection || !prevSelection?.length || prevSelection === "ALL"
						? [payloadValue]
						: prevSelection?.includes(payloadValue)
							? prevSelection.filter((prevId) => prevId !== payloadValue)
							: [...prevSelection, payloadValue]
			} else {
				// Handling Multi Selection
				if (
					!payloadValue?.length ||
					prevSelection === "ALL" ||
					(payloadValue?.length === prevSelection?.length && prevSelection.every((v) => payloadValue?.includes(v)))
				) {
					newSelection = []
				} else {
					newSelection = payloadValue
				}
			}

			state[tableKey].selection = newSelection
		},

		/**
		 * Clears selection key
		 * when filter is applied, offset is reset to 0 so the user is taken to first page in table
		 * @param state TableKey property
		 */
		clearSelection: (state, { payload: tableKey }: PayloadAction<TableKey>) => {
			state[tableKey].selection = []
		},

		updateFilters: (state, { payload }: PayloadAction<{ [K in TableKey]?: FiltersFields }>) => {
			const tableKey = Object.keys(payload)[0] as TableKey
			const payloadValue = Object.values(payload)[0]

			if (!payloadValue) return

			const prevState = state[tableKey]
			const filters = { ...prevState?.filters, ...payloadValue }

			return {
				...state,
				[tableKey]: {
					...prevState,
					offset: 0,
					filters,
					appliedFiltersCount: filters !== undefined ? getObjectSize(filters) : undefined,
				},
			}
		},

		clearFilters: (state, { payload: tableKey }: PayloadAction<TableKey>) => {
			const prevState = state[tableKey]

			return {
				...state,
				[tableKey]: {
					...prevState,
					filters: undefined,
					appliedFiltersCount: undefined,
				},
			}
		},

		toggleListGridView: (state, { payload }: PayloadAction<{ [K in TableKey]?: ListGridView }>) => {
			const tableKey = Object.keys(payload)[0] as TableKey
			const payloadValue = Object.values(payload)[0]

			return {
				...state,
				[tableKey]: {
					...state[tableKey],
					view: payloadValue,
				},
			}
		},

		/**
		 * Function used to reset one portion of state, i.e. One of the states related to the keys: "contacts" | "contacts-in-group" | "add-contacts-to-group" | "groups"
		 * @param param1 tablekey Prop, Can be one of the following: "contacts" | "contacts-in-group" | "add-contacts-to-group" | "groups"
		 */
		resetAdvancedTableState: (state, { payload: tableKey }: PayloadAction<TableKey>) => {
			if (tableKey === "groups")
				return {
					...state,
					groups: defaultGroupsDataTableState,
				}

			return {
				...state,
				[tableKey]: defaultDataTableState,
			}
		},

		clearState: (state, { payload }: PayloadAction<TableKey>) => {
			return {
				...state,
				[payload]: payload === "groups" ? defaultGroupsDataTableState : defaultDataTableState,
			}
		},
	},
})

export const {
	updateAdvancedTableState,
	updateSelection,
	clearSelection,
	updateFilters,
	clearFilters,
	toggleListGridView,
	resetAdvancedTableState,
	clearState,
} = advancedTableSlice.actions
export default advancedTableSlice.reducer
