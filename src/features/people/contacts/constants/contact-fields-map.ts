import type { Contact } from "@/features/people/contacts/types"

const contactFieldsMap: Partial<Record<keyof Contact, string>> = {
	firstName: "contacts:fields.firstName",
	lastName: "contacts:fields.lastName",
	email: "contacts:fields.email",
	phoneNumber: "contacts:fields.phoneNumber",
	country: "contacts:fields.country",
	groups: "contacts:fields.groups",
	tags: "contacts:fields.tags",
	createdAt: "contacts:fields.createdAt",
	updatedAt: "contacts:fields.updatedAt",
	note: "contacts:fields.note",
}

export default contactFieldsMap
