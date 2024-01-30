import type { Group } from "@/features/people/groups/types"

const groupFieldsMap: Partial<Record<keyof Group, string>> = {
	groupName: "groups:fields.groupName",
	description: "groups:fields.description",
	createdAt: "groups:fields.createdAt",
	contactsCount: "groups:fields.contactsCount",
}

export default groupFieldsMap
