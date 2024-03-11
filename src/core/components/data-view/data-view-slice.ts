//#region Import
import type { RootState } from "@/core/lib/redux-toolkit/root-reducer"
import type { PaginationAndSorting } from "@/core/lib/redux-toolkit/types"

import { getObjectSize } from "@/utils"
import { createSelector, createSlice, type PayloadAction } from "@reduxjs/toolkit"

import type { DataViewFilterType, DataViewKey, DataViewRenderType, DataViewState, Selection } from "./types"
//#endregion

const initialDataViewBaseState = { paginationAndSorting: { limit: 25, offset: 0 }, view: "LIST" as DataViewRenderType }

const initialSmsChannelsTablesState = {
	paginationAndSorting: { limit: 20, offset: 0 },
	view: "LIST" as DataViewRenderType,
}

const initialCompactDataViewBaseState = {
	paginationAndSorting: { limit: 10, offset: 0 },
	view: "LIST" as DataViewRenderType,
}

const initialState: { [K in DataViewKey]: DataViewState<K> } = {
	"add-contacts-to-group": initialDataViewBaseState,
	contacts: initialDataViewBaseState,
	"contacts-exports": initialDataViewBaseState,
	"contacts-in-group": initialDataViewBaseState,
	groups: initialCompactDataViewBaseState,
	industries: initialDataViewBaseState,
	"international-sms-channel-source-listings": initialSmsChannelsTablesState,
	"international-sms-channel-source-opted-out-list": initialSmsChannelsTablesState,
	"international-sms-channel-source-requests-completed": initialSmsChannelsTablesState,
	"international-sms-channel-source-requests-pending": initialSmsChannelsTablesState,
	"international-sms-channel-sources": initialSmsChannelsTablesState,
	"local-sms-channel-source-listings": initialSmsChannelsTablesState,
	"local-sms-channel-source-opted-out-list": initialSmsChannelsTablesState,
	"local-sms-channel-source-requests-completed": initialSmsChannelsTablesState,
	"local-sms-channel-source-requests-pending": initialSmsChannelsTablesState,
	"local-sms-channel-sources": initialSmsChannelsTablesState,
	segments: initialDataViewBaseState,
	"sms-industry-templates": initialCompactDataViewBaseState,
	"sms-prebuilt-templates": {
		...initialCompactDataViewBaseState,
		filters: { filterBy: "ALL", industryId: "ALL" },
	},
	"sms-prebuilt-templates-dialog": {
		...initialCompactDataViewBaseState,
		filters: { filterBy: "ALL", industryId: "ALL" },
	},
	"sms-templates": initialCompactDataViewBaseState,
}

const dataViewSlice = createSlice({
	initialState,
	name: "dataView",
	reducers: {
		checkItem: (state, { payload }: PayloadAction<{ [K in DataViewKey]?: string }>) => {
			const dataViewKey = Object.keys(payload)[0] as DataViewKey

			const selectedItem = Object.values(payload)[0]

			if (!selectedItem) return

			const prevSelection = state[dataViewKey].selection

			if (!prevSelection?.length || prevSelection === "ALL") {
				state[dataViewKey].selection = [selectedItem]
			} else if (prevSelection?.includes(selectedItem)) {
				state[dataViewKey].selection = prevSelection?.filter((id) => id !== selectedItem)
			} else {
				state[dataViewKey].selection = [...prevSelection, selectedItem]
			}
		},

		clearFilters: (state, { payload: dataViewKey }: PayloadAction<DataViewKey>) => {
			const prevState = state[dataViewKey]

			return {
				...state,
				[dataViewKey]: {
					...prevState,
					appliedFiltersCount: undefined,
					filters: undefined,
				},
			}
		},

		/**
		 * Clears selection key
		 * when filter is applied, offset is reset to 0 so the user is taken to first page in table
		 * @param state DataViewKey property
		 */
		clearSelection: (state, { payload: dataViewKey }: PayloadAction<DataViewKey>) => {
			state[dataViewKey].selection = []
		},

		/**
		 * Function used to reset one portion of state, i.e. One of the states related to the keys: "contacts" | "contacts-in-group" | "add-contacts-to-group" | "groups"
		 * @param param1 tablekey Prop, Can be one of the following: "contacts" | "contacts-in-group" | "add-contacts-to-group" | "groups"
		 */
		resetDataViewState: (state, { payload: dataViewKey }: PayloadAction<DataViewKey>) => {
			return {
				...state,
				[dataViewKey]: initialState[dataViewKey],
			}
		},

		toggleView: (state, { payload }: PayloadAction<{ [K in DataViewKey]?: DataViewRenderType }>) => {
			const dataViewKey = Object.keys(payload)[0] as DataViewKey

			const payloadValue = Object.values(payload)[0]

			return {
				...state,
				[dataViewKey]: {
					...state[dataViewKey],
					view: payloadValue,
				},
			}
		},

		updateFilters: (state, { payload }: PayloadAction<{ [K in DataViewKey]?: Partial<DataViewFilterType[K]> }>) => {
			const dataViewKey = Object.keys(payload)[0] as DataViewKey

			const payloadValue = Object.values(payload)[0]

			if (!payloadValue) return

			const prevState = state[dataViewKey]

			const filters = { ...prevState?.filters, ...payloadValue }

			let appliedFiltersCount = filters !== undefined ? getObjectSize(filters) : undefined

			if (!!appliedFiltersCount && "startDate" in filters && "endDate" in filters) {
				appliedFiltersCount = appliedFiltersCount - 1
			}

			return {
				...state,
				[dataViewKey]: {
					...prevState,
					appliedFiltersCount,
					filters,
					paginationAndSorting: { ...prevState?.paginationAndSorting, offset: 0 },
				},
			}
		},

		updatePaginationAndSorting: (
			state,
			{ payload }: PayloadAction<{ [K in DataViewKey]?: Partial<PaginationAndSorting<K>> }>
		) => {
			const dataViewKey = Object.keys(payload)[0] as DataViewKey

			const payloadValue = Object.values(payload)[0]

			if (!payloadValue) return

			return {
				...state,
				[dataViewKey]: {
					...state[dataViewKey],
					paginationAndSorting: {
						...state[dataViewKey].paginationAndSorting,
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
			{ payload }: PayloadAction<{ [K in DataViewKey]?: Pick<DataViewState<K>, "searchTerm"> }>
		) => {
			const dataViewKey = Object.keys(payload)[0] as DataViewKey

			const searchTerm = Object.values(payload)[0]

			const prevState = state[dataViewKey]

			return {
				...state,
				[dataViewKey]: {
					...prevState,
					paginationAndSorting: { ...prevState?.paginationAndSorting, offset: 0 },
					searchTerm,
				},
			}
		},

		updateSelection: (state, { payload }: PayloadAction<{ [K in DataViewKey]?: Selection }>) => {
			const dataViewKey = Object.keys(payload)[0] as DataViewKey

			const selection = Object.values(payload)[0]

			state[dataViewKey].selection = selection
		},
	},
})

export const {
	checkItem,
	clearFilters,
	clearSelection,
	resetDataViewState,
	toggleView,
	updateFilters,
	updatePaginationAndSorting,
	updateSearch,
	updateSelection,
} = dataViewSlice.actions

export default dataViewSlice.reducer

/**
 * Selector Function used to select memoized `filters` property from `dataView` Slice
 * @example const filters = useSelector<DataViewFilterType["contacts"] | undefined>((state) => selectFilters(state, "contacts"))
 */
export const selectFilters = createSelector(
	(state: RootState, key: DataViewKey) => state.dataView[key],
	(data) => data.filters
)

/**
 * Selector Function used to select memoized `selection` property from `dataView` Slice
 * @example const selection = useSelector<Selection>((state) => selectSelection(state, "contacts"))
 */
export const selectSelection = createSelector(
	(state: RootState, key: DataViewKey) => state.dataView[key],
	(data) => data.selection
)

/**
 * Selector Function used to select memoized `paginationAndSorting ` property from `dataView` Slice
 * @example const paginationAndSorting = useSelector<PaginationAndSorting<any>>((state) => selectPaginationAndSorting(state, "contacts"))
 */
export const selectPaginationAndSorting = createSelector(
	(state: RootState, key: DataViewKey) => state.dataView[key],
	(data) => data?.paginationAndSorting
)

/**
 * Selector Function used to select memoized `view` property from `dataView` Slice
 * @example const view = useSelector<DataViewRenderType | undefined>((state) => selectView(state, "contacts"))
 */
export const selectView = createSelector(
	(state: RootState, key: DataViewKey) => state.dataView[key],
	(data) => data?.view
)
