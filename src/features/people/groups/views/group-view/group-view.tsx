//#region Import
import { lazy, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

import AdvancedTable from "@/core/components/advanced-table"
import useDispatch from "@/core/hooks/useDispatch"
import { clearState } from "@/core/slices/advanced-table-slice/advanced-table-slice"
import type { SharedListViewProps } from "@/core/types"
import contactsTableColumns from "@/features/people/contacts/constants/contacts-table-columns"
import ViewContactDialog from "@/features/people/contacts/dialogs/view-contact-dialog"
import type { Contact } from "@/features/people/contacts/types"
import type { ColumnType } from "@/ui"

const GroupViewTableActions = lazy(() => import("./group-view-table-actions"))
const GroupViewTopbar = lazy(() => import("./group-view-topbar/group-view-topbar"))
const ContactsFiltersContent = lazy(() => import("@/features/people/contacts/components/contacts-filters-content"))
//#endregion

const GroupView = ({ count, ...tableProps }: SharedListViewProps<Contact>) => {
	const dispatch = useDispatch()

	const { t } = useTranslation("contacts")

	const [viewContactId, setViewContactId] = useState<string | undefined>(undefined)

	useEffect(() => {
		return () => {
			// Clearing All RTK-Slice data on unmount, to prevent persisting in-app persistance (for selection, filters, etc.)
			dispatch(clearState("contacts-in-group"))
		}
	}, [dispatch])

	return (
		<>
			<AdvancedTable tableKey='contacts-in-group' count={count}>
				<AdvancedTable.FiltersBar>
					<AdvancedTable.FiltersBar.Header />
					<AdvancedTable.FiltersBar.Content>
						<ContactsFiltersContent />
					</AdvancedTable.FiltersBar.Content>
					<AdvancedTable.FiltersBar.Footer />
				</AdvancedTable.FiltersBar>

				<AdvancedTable.Content>
					<AdvancedTable.TopBar>
						<GroupViewTopbar />
					</AdvancedTable.TopBar>

					<AdvancedTable.Body columns={tableColumns} onRowClick={({ id }) => setViewContactId(id)} {...tableProps} />
					<AdvancedTable.Pagination>
						<AdvancedTable.Pagination.Message />
					</AdvancedTable.Pagination>
				</AdvancedTable.Content>
			</AdvancedTable>

			<ViewContactDialog
				id={viewContactId}
				open={!!viewContactId?.length}
				title={t("dialogs.view-contact.title")}
				onOpenChange={(open) => !open && setViewContactId(undefined)}
			/>
		</>
	)
}

export default GroupView

const tableColumns: ColumnType<Contact>[] = [
	...contactsTableColumns,
	{
		accessorKey: "actions",
		cell: (_, { id }) => <GroupViewTableActions id={id} />,
	},
]
