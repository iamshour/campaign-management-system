//#region Import
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

import { getObjectSize } from "@/utils"

import type {
	AdvancedTableListGridView,
	AdvancedTableSliceStateType,
	AdvancedTableStateType,
	FiltersFieldMappingType,
	TableKey,
} from "./types"
//#endregion

/**
 * Initial Data Table State passed for each
 */
const initialDataTableStateBase = { offset: 0, limit: 25 }
const initialDataTableStateCompact = { ...initialDataTableStateBase, limit: 10 }
const initialDataTableStateCompactWithGrids: AdvancedTableStateType<"groups" | "industries"> = {
	...initialDataTableStateBase,
	view: "List View",
	limit: 10,
}

const initialState: AdvancedTableSliceStateType = {
	contacts: initialDataTableStateBase,
	"contacts-in-group": initialDataTableStateBase,
	"add-contacts-to-group": initialDataTableStateBase,
	groups: initialDataTableStateCompactWithGrids,
	"contacts-exports": initialDataTableStateBase,
	segments: initialDataTableStateBase,
	"sms-templates": initialDataTableStateCompact,
	"sms-prebuilt-templates": initialDataTableStateCompact,
	industries: initialDataTableStateCompactWithGrids,
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
			{ payload }: PayloadAction<{ [K in TableKey]?: Partial<AdvancedTableStateType<K>> }>
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

		updateFilters: (state, { payload }: PayloadAction<{ [K in TableKey]?: Partial<FiltersFieldMappingType[K]> }>) => {
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

		toggleListGridView: (state, { payload }: PayloadAction<{ [K in TableKey]?: AdvancedTableListGridView }>) => {
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
			if (tableKey === "groups" || tableKey === "industries")
				return {
					...state,
					[tableKey]: initialDataTableStateCompactWithGrids,
				}

			return {
				...state,
				[tableKey]: initialDataTableStateBase,
			}
		},

		clearState: (state, { payload }: PayloadAction<TableKey>) => {
			return {
				...state,
				[payload]: payload === "groups" ? initialDataTableStateCompactWithGrids : initialDataTableStateBase,
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
