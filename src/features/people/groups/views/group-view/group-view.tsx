//#region Import
import type { SharedListViewProps } from "@/core/types"
import type { Contact } from "@/features/people/contacts/types"

import DataGrid from "@/core/components/data-grid/data-grid"
import { ColumnType } from "@/core/components/data-grid/types"
import useDispatch from "@/core/hooks/useDispatch"
import { resetAdvancedTableState } from "@/core/slices/data-grid-slice/data-grid-slice"
import contactsTableColumns from "@/features/people/contacts/constants/contacts-table-columns"
import ViewContactDialog from "@/features/people/contacts/dialogs/view-contact-dialog/view-contact-dialog"
import { lazy, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

const GroupViewTableActions = lazy(() => import("./group-view-table-actions"))

const GroupViewTopbar = lazy(() => import("./group-view-topbar/group-view-topbar"))

const GroupViewFiltersContent = lazy(() => import("./group-view-filters-content"))
//#endregion

const GroupView = (props: SharedListViewProps<Contact>) => {
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
			<DataGrid columns={tableColumns} dataGridKey='contacts-in-group' {...props}>
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

					<DataGrid.Body onRowClick={({ id }) => setViewContactId(id)} />
					<DataGrid.Pagination>
						<DataGrid.Pagination.Message />
					</DataGrid.Pagination>
				</DataGrid.Content>
			</DataGrid>

			<ViewContactDialog
				id={viewContactId}
				onOpenChange={(open) => !open && setViewContactId(undefined)}
				open={!!viewContactId?.length}
				title={t("dialogs.view-contact.title")}
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
