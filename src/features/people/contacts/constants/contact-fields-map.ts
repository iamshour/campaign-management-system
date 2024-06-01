import type { Contact } from "@/features/people/contacts/types"

const contactFieldsMap: Partial<Record<keyof Contact, string>> = {
	country: "contacts:fields.country",
	createdAt: "contacts:fields.createdAt",
	email: "contacts:fields.email",
	firstName: "contacts:fields.firstName",
	groups: "contacts:fields.groups",
	lastName: "contacts:fields.lastName",
	note: "contacts:fields.note",
	phoneNumber: "contacts:fields.phoneNumber",
	tags: "contacts:fields.tags",
	updatedAt: "contacts:fields.updatedAt",
}

export default contactFieldsMap
