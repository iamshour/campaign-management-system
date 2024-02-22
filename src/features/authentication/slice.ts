import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

import type { AuthSliceState } from "./types"

const initialState: AuthSliceState = {
	user: {
		name: "John Dow",
		company: "Blue.Ai Technologies",
		role: "BUSINESS",
		industryId: undefined,
		src: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(2).webp",
	},
}

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setUser: (state, { payload }: PayloadAction<AuthSliceState["user"]>) => {
			state.user = payload
		},

		// MOCK FUNCTION USED TO SWITCH USER ROLE ----- ONLY USED FOR QA TESTING FOR NOW
		switchRole: (state) => {
			state.user.role = state.user.role === "BLUE" ? "BUSINESS" : "BLUE"
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

export const { setUser, updateToken, clearAuth, switchRole } = authSlice.actions
export default authSlice.reducer
