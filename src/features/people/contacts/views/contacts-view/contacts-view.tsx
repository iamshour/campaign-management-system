//#region Import
import type { DataGridState } from "@/core/slices/data-grid-slice/types"
import type { SharedListViewProps } from "@/core/types"
import type { Contact } from "@/features/people/contacts/types"

import DataGrid from "@/core/components/data-grid/data-grid"
import { ColumnType } from "@/core/components/data-grid/types"
import useSelector from "@/core/hooks/useSelector"
import contactsTableColumns from "@/features/people/contacts/constants/contacts-table-columns"
import AdvancedFiltersDialog from "@/features/people/contacts/dialogs/advanced-filters-dialog/advanced-filters-dialog"
import ViewContactDialog from "@/features/people/contacts/dialogs/view-contact-dialog/view-contact-dialog"
import { Button } from "@/ui"
import { lazy, useState } from "react"
import { useTranslation } from "react-i18next"

const ContactsViewTopbar = lazy(() => import("./contacts-view-topbar/contacts-view-topbar"))

const ContactsFiltersContent = lazy(() => import("@/features/people/contacts/components/contacts-filters-content"))

const ContactsViewTableActions = lazy(() => import("./contacts-view-table-actions"))

const ContactsViewFiltersPreview = lazy(() => import("./contacts-view-filters-preview"))
//#endregion

const ContactsView = (props: SharedListViewProps<Contact>) => {
	const { t } = useTranslation("contacts")

	const [viewContactId, setViewContactId] = useState<string | undefined>(undefined)

	const { filters } = useSelector<DataGridState<"contacts">>(({ dataGrid }) => dataGrid["contacts"])

	const isAdvancedFiltersApplied = filters?.advancedFilters

	return (
		<>
			<DataGrid columns={tableColumns} dataGridKey='contacts' {...props}>
				<DataGrid.FiltersBar>
					<DataGrid.FiltersBar.Header>
						<AdvancedFiltersDialog>
							<Button
								className='h-max px-1.5 py-0 pb-0.5 text-primary-600 hover:bg-transparent hover:text-primary-900'
								size='sm'
								variant='ghost'>
								{t("common:filters-bar.advanced-filters.button")}
							</Button>
						</AdvancedFiltersDialog>
					</DataGrid.FiltersBar.Header>
					<DataGrid.FiltersBar.Content>
						<ContactsFiltersContent />

						{isAdvancedFiltersApplied && <ContactsViewFiltersPreview />}
					</DataGrid.FiltersBar.Content>
					<DataGrid.FiltersBar.Footer />
				</DataGrid.FiltersBar>

				<DataGrid.Content>
					<DataGrid.TopBar>
						<ContactsViewTopbar />
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

export default ContactsView

const tableColumns: ColumnType<Contact>[] = [
	...contactsTableColumns,
	{
		accessorKey: "actions",
		cell: (_, { id }) => <ContactsViewTableActions id={id} />,
	},
]
