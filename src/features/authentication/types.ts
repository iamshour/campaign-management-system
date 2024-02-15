export type AuthViews = "SIGN_IN" | "SIGN_UP" | "RESET_PASS" | "NEW_PASS" | "OTP"

export type user = {
	company: string
	industryId?: string
}

export interface AuthSliceState {
	user: user
	token?: string
}
