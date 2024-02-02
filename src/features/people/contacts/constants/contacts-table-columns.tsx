//#region Import
import { lazy } from "react"

import type { ColumnType } from "@/ui"
import { format } from "@/utils"

import type { Contact } from "../types"

import contactFieldsMap from "./contact-fields-map"

// eslint-disable-next-line react-refresh/only-export-components
const ContactsTableTagsRow = lazy(() => import("../components/contacts-table-tags-row"))
//#endregion

const contactsTableColumns: ColumnType<Contact>[] = [
	{
		accessorKey: "selection",
		rowIdSelector: "id",
	},
	{
		accessorKey: "firstName",
		header: contactFieldsMap.firstName,
		sortable: true,
	},
	{
		accessorKey: "lastName",
		header: contactFieldsMap.lastName,
		sortable: true,
	},
	{
		accessorKey: "email",
		header: contactFieldsMap.email,
		sortable: true,
	},
	{
		accessorKey: "phoneNumber",
		header: contactFieldsMap.phoneNumber,
	},
	{
		accessorKey: "createdAt",
		header: contactFieldsMap.createdAt,
		cell: (createdAt) => !!createdAt && <>{format(new Date(createdAt), "MM-dd-yyyy")}</>,
		sortable: true,
	},
	{
		accessorKey: "tags",
		header: contactFieldsMap.tags,
		cell: (tags: string[]) => !!tags?.length && <ContactsTableTagsRow tags={tags} />,
	},
]

export default contactsTableColumns
