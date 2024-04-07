export type AuthViews = "NEW_PASS" | "OTP" | "RESET_PASS" | "SIGN_IN" | "SIGN_UP"

export type UserRole = "BLUE" | "BUSINESS"

export interface AuthSliceState {
	token?: string

	user: {
		company: string
		industryId?: string
		name: string
		role: UserRole
		src: string
	}
}
