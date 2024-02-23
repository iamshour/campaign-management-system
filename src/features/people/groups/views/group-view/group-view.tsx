//#region Import
import { lazy, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

import DataGrid from "@/core/components/data-grid"
import useDispatch from "@/core/hooks/useDispatch"
import { resetAdvancedTableState } from "@/core/slices/data-grid-slice/data-grid-slice"
import type { SharedListViewProps } from "@/core/types"
import contactsTableColumns from "@/features/people/contacts/constants/contacts-table-columns"
import ViewContactDialog from "@/features/people/contacts/dialogs/view-contact-dialog"
import type { Contact } from "@/features/people/contacts/types"
import type { ColumnType } from "@/ui"

const GroupViewTableActions = lazy(() => import("./group-view-table-actions"))
const GroupViewTopbar = lazy(() => import("./group-view-topbar/group-view-topbar"))
const GroupViewFiltersContent = lazy(() => import("./group-view-filters-content"))
//#endregion

const GroupView = ({ count, ...tableProps }: SharedListViewProps<Contact>) => {
	const dispatch = useDispatch()

	const { t } = useTranslation("contacts")

	const [viewContactId, setViewContactId] = useState<string | undefined>(undefined)

	useEffect(() => {
		return () => {
			// Clearing All RTK-Slice data on unmount, to prevent persisting in-app persistance (for selection, filters, etc.)
			dispatch(resetAdvancedTableState("contacts-in-group"))
		}
	}, [dispatch])

	return (
		<>
			<DataGrid dataGridKey='contacts-in-group' count={count}>
				<DataGrid.FiltersBar>
					<DataGrid.FiltersBar.Header />
					<DataGrid.FiltersBar.Content>
						<GroupViewFiltersContent />
					</DataGrid.FiltersBar.Content>
					<DataGrid.FiltersBar.Footer />
				</DataGrid.FiltersBar>

				<DataGrid.Content>
					<DataGrid.TopBar>
						<GroupViewTopbar />
					</DataGrid.TopBar>

					<DataGrid.Body columns={tableColumns} onRowClick={({ id }) => setViewContactId(id)} {...tableProps} />
					<DataGrid.Pagination>
						<DataGrid.Pagination.Message />
					</DataGrid.Pagination>
				</DataGrid.Content>
			</DataGrid>

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
