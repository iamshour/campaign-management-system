//#region Import
import type { ColumnType } from "@/core/components/data-view/data-table/types"
import type { SharedListViewProps } from "@/core/types"
import type { Contact } from "@/features/people/contacts/types"

import DataView from "@/core/components/data-view/data-view"
import { resetDataViewState } from "@/core/components/data-view/data-view-slice"
import useDispatch from "@/core/hooks/useDispatch"
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
			dispatch(resetDataViewState("contacts-in-group"))
		}
	}, [dispatch])

	return (
		<>
			<DataView columns={tableColumns} dataViewKey='contacts-in-group' {...props}>
				<DataView.FiltersBar>
					<DataView.FiltersBar.Header />
					<DataView.FiltersBar.Content>
						<GroupViewFiltersContent />
					</DataView.FiltersBar.Content>
					<DataView.FiltersBar.Footer />
				</DataView.FiltersBar>

				<DataView.Content>
					<DataView.TopBar>
						<GroupViewTopbar />
					</DataView.TopBar>

					<DataView.Body
						classNames={{ emptyTableCell: "h-[calc(100vh-268px)]" }}
						onRowClick={({ id }) => setViewContactId(id)}
					/>
					<DataView.Pagination>
						<DataView.Pagination.Message />
					</DataView.Pagination>
				</DataView.Content>
			</DataView>

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
