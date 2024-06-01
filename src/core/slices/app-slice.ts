//#region Import
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
//#endregion

export interface AppSliceState {
	/**
	 * Boolean check regarding whether if Filters bar is open or not
	 */
	isFilterBarOpen: boolean

	/**
	 * Boolean check regarding whether if Navigation bar for private routes is open or not
	 */
	isNavOpen: boolean
}

const initialState: AppSliceState = {
	isFilterBarOpen: true,
	isNavOpen: false,
}

const appSlice = createSlice({
	initialState,
	name: "app",
	reducers: {
		toggleFiltersBar: (state) => {
			state.isFilterBarOpen = !state.isFilterBarOpen
		},

		toggleNavbar: (state, { payload }: PayloadAction<boolean | undefined>) => {
			state.isNavOpen = payload !== undefined ? payload : !state.isNavOpen
		},
	},
})

export const { toggleFiltersBar, toggleNavbar } = appSlice.actions

export default appSlice.reducer
