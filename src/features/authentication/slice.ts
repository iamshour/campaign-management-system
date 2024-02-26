import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

import type { AuthSliceState } from "./types"

const initialState: AuthSliceState = {
	user: {
		company: "Blue.Ai Technologies",
		industryId: undefined,
		name: "John Dow",
		role: "BUSINESS",
		src: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(2).webp",
	},
}

const authSlice = createSlice({
	initialState,
	name: "auth",
	reducers: {
		clearAuth: (state) => {
			state.user = undefined!
			state.token = ""
		},

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
	},
})

export const { clearAuth, setUser, switchRole, updateToken } = authSlice.actions

export default authSlice.reducer
