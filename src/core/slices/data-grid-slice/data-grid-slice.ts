//#region Import
import { PaginationAndSorting } from "@/core/lib/redux-toolkit/types"
import { getObjectSize } from "@/utils"
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

import type { DataGridFilterType, DataGridKey, DataGridState, DataGridView } from "./types"
//#endregion

/**
 * Initial Data Grid State passed for each key/value pair
 */
const initialDataGridBaseState = { paginationAndSorting: { limit: 25, offset: 0 }, view: "LIST" as DataGridView }

const initialCompactDataGridBaseState = { paginationAndSorting: { limit: 10, offset: 0 }, view: "LIST" as DataGridView }

const initialState: { [K in DataGridKey]: DataGridState<K> } = {
	"add-contacts-to-group": initialDataGridBaseState,
	contacts: initialDataGridBaseState,
	"contacts-exports": initialDataGridBaseState,
	"contacts-in-group": initialDataGridBaseState,
	groups: initialCompactDataGridBaseState,
	industries: initialDataGridBaseState,
	segments: initialDataGridBaseState,
	"sms-industry-templates": initialCompactDataGridBaseState,
	"sms-prebuilt-templates": {
		...initialCompactDataGridBaseState,
		filters: { filterBy: "ALL", industryId: "ALL" },
	},
	"sms-prebuilt-templates-dialog": {
		...initialCompactDataGridBaseState,
		filters: { filterBy: "ALL", industryId: "ALL" },
	},
	"sms-templates": initialCompactDataGridBaseState,
}

const dataGridSlice = createSlice({
	initialState,
	name: "dataGrid",
	reducers: {
		clearFilters: (state, { payload: dataGridKey }: PayloadAction<DataGridKey>) => {
			const prevState = state[dataGridKey]

			return {
				...state,
				[dataGridKey]: {
					...prevState,
					appliedFiltersCount: undefined,
					filters: undefined,
				},
			}
		},

		/**
		 * Clears selection key
		 * when filter is applied, offset is reset to 0 so the user is taken to first page in table
		 * @param state DataGridKey property
		 */
		clearSelection: (state, { payload: dataGridKey }: PayloadAction<DataGridKey>) => {
			state[dataGridKey].selection = []
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
		 * @description Function used to update contacts table state
		 * @param param1 Table State, which includes `sort, order, offset, limit, and selection`
		 */
		updateDataGridState: (state, { payload }: PayloadAction<{ [K in DataGridKey]?: Partial<DataGridState<K>> }>) => {
			const dataGridKey = Object.keys(payload)[0] as DataGridKey

			const payloadValue = Object.values(payload)[0]

			if (!payloadValue) return

			return {
				...state,
				[dataGridKey]: { ...state[dataGridKey], ...payloadValue },
			}
		},

		updateFilters: (state, { payload }: PayloadAction<{ [K in DataGridKey]?: Partial<DataGridFilterType[K]> }>) => {
			const dataGridKey = Object.keys(payload)[0] as DataGridKey

			const payloadValue = Object.values(payload)[0]

			if (!payloadValue) return

			const prevState = state[dataGridKey]

			const filters = { ...prevState?.filters, ...payloadValue }

			let appliedFiltersCount = filters !== undefined ? getObjectSize(filters) : undefined

			if (!!appliedFiltersCount && "startDate" in filters && "endDate" in filters) {
				appliedFiltersCount = appliedFiltersCount - 1
			}

			return {
				...state,
				[dataGridKey]: {
					...prevState,
					appliedFiltersCount,
					filters,
					paginationAndSorting: { ...prevState?.paginationAndSorting, offset: 0 },
				},
			}
		},

		updatePaginationAndSorting: (
			state,
			{ payload }: PayloadAction<{ [K in DataGridKey]?: Partial<PaginationAndSorting<K>> }>
		) => {
			const dataGridKey = Object.keys(payload)[0] as DataGridKey

			const payloadValue = Object.values(payload)[0]

			if (!payloadValue) return

			return {
				...state,
				[dataGridKey]: {
					...state[dataGridKey],
					paginationAndSorting: {
						...state[dataGridKey].paginationAndSorting,
						...payloadValue,
					},
				},
			}
		},

		/**
		 * @description Function used to update search in table state
		 * when search is applied, offset is reset to 0 so the user is taken to first page in table
		 * @param param1 Search term: string
		 * @returns
		 */
		updateSearch: (
			state,
			{ payload }: PayloadAction<{ [K in DataGridKey]?: Pick<DataGridState<K>, "searchTerm"> }>
		) => {
			const dataGridKey = Object.keys(payload)[0] as DataGridKey

			const searchTerm = Object.values(payload)[0]

			const prevState = state[dataGridKey]

			return {
				...state,
				[dataGridKey]: {
					...prevState,
					paginationAndSorting: { ...prevState?.paginationAndSorting, offset: 0 },
					searchTerm,
				},
			}
		},

		updateSelection: (state, { payload }: PayloadAction<{ [K in DataGridKey]?: DataGridState<K>["selection"] }>) => {
			const dataGridKey = Object.keys(payload)[0] as DataGridKey

			const selection = Object.values(payload)[0]

			state[dataGridKey].selection = selection
		},
	},
})

export const {
	clearFilters,
	clearSelection,
	resetAdvancedTableState,
	toggleDataGridView,
	updateDataGridState,
	updateFilters,
	updatePaginationAndSorting,
	updateSearch,
	updateSelection,
} = dataGridSlice.actions

export default dataGridSlice.reducer
