//#region Import
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Pathname } from "react-router-dom"
//#endregion

export interface AppSliceState {
	/**
	 * Boolean that checks if Navigation bar for private routes is open or closed
	 */
	isNavbarOpen: boolean

	/**
	 * Persisted List of Closed Filters Bar, using URL's pathname
	 */
	closedFiltersBars?: Pathname[]
}

const initialState: AppSliceState = {
	isNavbarOpen: false,
}

const appSlice = createSlice({
	name: "app",
	initialState,
	reducers: {
		toggleNavbar: (state, { payload }: PayloadAction<AppSliceState["isNavbarOpen"] | undefined>) => {
			state.isNavbarOpen = payload !== undefined ? payload : !state.isNavbarOpen
		},

		toggleFiltersBar: (state, { payload: pathname }: PayloadAction<Pathname>) => {
			const prevState = (state?.closedFiltersBars || []) as Pathname[]

			state.closedFiltersBars = prevState?.includes(pathname)
				? prevState?.filter((prevPath) => prevPath !== pathname)
				: [...prevState, pathname]
		},
	},
})

export const { toggleNavbar, toggleFiltersBar } = appSlice.actions
export default appSlice.reducer
