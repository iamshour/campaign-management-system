import type { Group } from "@/features/people/groups/types"

const groupFieldsMap: Partial<Record<keyof Group, string>> = {
	contactsCount: "groups:fields.contactsCount",
	createdAt: "groups:fields.createdAt",
	description: "groups:fields.description",
	groupName: "groups:fields.groupName",
}

export default groupFieldsMap
