//#region Import
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
//#endregion

export interface AppSliceState {
	/**
	 * Boolean check regarding whether if Navigation bar for private routes is open or not
	 */
	isNavOpen: boolean

	/**
	 * Boolean check regarding whether if Filters bar is open or not
	 */
	isFilterBarOpen: boolean
}

const initialState: AppSliceState = {
	isNavOpen: false,
	isFilterBarOpen: true,
}

const appSlice = createSlice({
	name: "app",
	initialState,
	reducers: {
		toggleNavbar: (state, { payload }: PayloadAction<boolean | undefined>) => {
			state.isNavOpen = payload !== undefined ? payload : !state.isNavOpen
		},

		toggleFiltersBar: (state) => {
			state.isFilterBarOpen = !state.isFilterBarOpen
		},
	},
})

export const { toggleNavbar, toggleFiltersBar } = appSlice.actions
export default appSlice.reducer
