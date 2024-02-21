export type AuthViews = "SIGN_IN" | "SIGN_UP" | "RESET_PASS" | "NEW_PASS" | "OTP"

export type UserRole = "BUSINESS" | "BLUE"

export interface AuthSliceState {
	token?: string

	user: {
		name: string
		company: string
		role: UserRole
		industryId?: string
		src: string
	}
}
