import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

import type { AuthSliceState } from "./types"

const initialState: AuthSliceState = {
	user: {
		company: "Blue.Ai Technologies",
		industryId: "6",
	},
}

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setUser: (state, { payload }: PayloadAction<AuthSliceState["user"]>) => {
			state.user = payload
		},

		updateToken: (state, { payload }: PayloadAction<AuthSliceState["token"]>) => {
			state.token = payload
		},

		clearAuth: (state) => {
			state.user = undefined!
			state.token = ""
		},
	},
})

export const { setUser, updateToken, clearAuth } = authSlice.actions
export default authSlice.reducer
