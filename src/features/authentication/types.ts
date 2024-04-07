export type UserRole = "ADMIN" | "USER"

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
