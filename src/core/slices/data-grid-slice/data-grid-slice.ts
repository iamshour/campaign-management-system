//#region Import
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

import { getObjectSize } from "@/utils"

import type { DataGridView, DataGridSliceStateType, DataGridState, FiltersFieldMappingType, DataGridKey } from "./types"
//#endregion

/**
 * Initial Data Grid State passed for each key/value pair
 */
const initialDataGridBaseState = { offset: 0, limit: 25, view: "LIST" as DataGridView }

const initialState: DataGridSliceStateType = {
	contacts: initialDataGridBaseState,
	"contacts-in-group": initialDataGridBaseState,
	"add-contacts-to-group": initialDataGridBaseState,
	groups: { ...initialDataGridBaseState, limit: 10 },
	"contacts-exports": initialDataGridBaseState,
	segments: initialDataGridBaseState,
	"sms-templates": { ...initialDataGridBaseState, limit: 10 },
	"sms-prebuilt-templates": { ...initialDataGridBaseState, limit: 10 },
	"sms-industry-templates": { ...initialDataGridBaseState, limit: 10 },
	industries: initialDataGridBaseState,
}

const dataGridSlice = createSlice({
	name: "dataGrid",
	initialState,
	reducers: {
		/**
		 * @description Function used to update contacts table state
		 * when search is applied, offset is reset to 0 so the user is taken to first page in table
		 * @param param1 Table State, which includes `sort, order, offset, limit, and selection`
		 */
		updateDataGridState: (state, { payload }: PayloadAction<{ [K in DataGridKey]?: Partial<DataGridState<K>> }>) => {
			const dataGridKey = Object.keys(payload)[0] as DataGridKey
			const payloadValue = Object.values(payload)[0]

			if (!payloadValue) return

			return {
				...state,
				[dataGridKey]: { ...state[dataGridKey], offset: 0, ...payloadValue },
			}
		},

		updateSelection: (state, { payload }: PayloadAction<{ [K in DataGridKey]?: string | string[] | "ALL" }>) => {
			const dataGridKey = Object.keys(payload)[0] as DataGridKey
			const payloadValue = Object.values(payload)[0]

			const prevState = state[dataGridKey]
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

			state[dataGridKey].selection = newSelection
		},

		/**
		 * Clears selection key
		 * when filter is applied, offset is reset to 0 so the user is taken to first page in table
		 * @param state DataGridKey property
		 */
		clearSelection: (state, { payload: dataGridKey }: PayloadAction<DataGridKey>) => {
			state[dataGridKey].selection = []
		},

		updateFilters: (
			state,
			{ payload }: PayloadAction<{ [K in DataGridKey]?: Partial<FiltersFieldMappingType[K]> }>
		) => {
			const dataGridKey = Object.keys(payload)[0] as DataGridKey
			const payloadValue = Object.values(payload)[0]

			if (!payloadValue) return

			const prevState = state[dataGridKey]
			const filters = { ...prevState?.filters, ...payloadValue }

			return {
				...state,
				[dataGridKey]: {
					...prevState,
					offset: 0,
					filters,
					appliedFiltersCount: filters !== undefined ? getObjectSize(filters) : undefined,
				},
			}
		},

		clearFilters: (state, { payload: dataGridKey }: PayloadAction<DataGridKey>) => {
			const prevState = state[dataGridKey]

			return {
				...state,
				[dataGridKey]: {
					...prevState,
					filters: undefined,
					appliedFiltersCount: undefined,
				},
			}
		},

		toggleDataGridView: (state, { payload }: PayloadAction<{ [K in DataGridKey]?: DataGridView }>) => {
			const dataGridKey = Object.keys(payload)[0] as DataGridKey
			const payloadValue = Object.values(payload)[0]

			return {
				...state,
				[dataGridKey]: {
					...state[dataGridKey],
					view: payloadValue,
				},
			}
		},

		/**
		 * Function used to reset one portion of state, i.e. One of the states related to the keys: "contacts" | "contacts-in-group" | "add-contacts-to-group" | "groups"
		 * @param param1 tablekey Prop, Can be one of the following: "contacts" | "contacts-in-group" | "add-contacts-to-group" | "groups"
		 */
		resetAdvancedTableState: (state, { payload: dataGridKey }: PayloadAction<DataGridKey>) => {
			return {
				...state,
				[dataGridKey]: initialState[dataGridKey],
			}
		},
	},
})

export const {
	updateDataGridState,
	updateSelection,
	clearSelection,
	updateFilters,
	clearFilters,
	toggleDataGridView,
	resetAdvancedTableState,
} = dataGridSlice.actions
export default dataGridSlice.reducer
