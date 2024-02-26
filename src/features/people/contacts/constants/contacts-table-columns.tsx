//#region Import
import type { ColumnType } from "@/core/components/data-grid/types"

import { lazy } from "react"

import type { Contact } from "../types"

import contactFieldsMap from "./contact-fields-map"

// eslint-disable-next-line react-refresh/only-export-components
const DataGridDateCell = lazy(() => import("@/core/components/data-grid/data-grid-date-cell"))

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
		cell: (date) => <DataGridDateCell date={date} />,
		header: contactFieldsMap.createdAt,
		sortable: true,
	},
	{
		accessorKey: "tags",
		cell: (tags: string[]) => !!tags?.length && <ContactsTableTagsRow tags={tags} />,
		header: contactFieldsMap.tags,
	},
]

export default contactsTableColumns
