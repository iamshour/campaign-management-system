//#region Import
import Badge from "@package/ui/src/badge"
import type { ColumnType } from "@package/ui/src/table/types"
import { format } from "@package/utils"

import type { Contact } from "../types"

import contactFieldsMap from "./contact-fields-map"
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
		cell: (tags: string[]) =>
			!!tags?.length && (
				<span className='flex gap-1 overflow-x-auto pb-0.5 scrollbar scrollbar-track-transparent scrollbar-thumb-gray-300 scrollbar-thumb-rounded-lg scrollbar-h-0.5'>
					{tags?.map((tag) => (
						<Badge key={tag} className='rounded-md px-2'>
							{tag}
						</Badge>
					))}
				</span>
			),
	},
]

export default contactsTableColumns
