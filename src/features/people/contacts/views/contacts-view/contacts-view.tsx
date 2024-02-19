//#region Import
import { lazy, useState } from "react"
import { useTranslation } from "react-i18next"

import DataGrid from "@/core/components/data-grid"
import useSelector from "@/core/hooks/useSelector"
import type { DataGridState } from "@/core/slices/data-grid-slice/types"
import type { SharedListViewProps } from "@/core/types"
import contactsTableColumns from "@/features/people/contacts/constants/contacts-table-columns"
import AdvancedFiltersDialog from "@/features/people/contacts/dialogs/advanced-filters-dialog/advanced-filters-dialog"
import ViewContactDialog from "@/features/people/contacts/dialogs/view-contact-dialog"
import type { Contact } from "@/features/people/contacts/types"
import { Button, type ColumnType } from "@/ui"

const ContactsViewTopbar = lazy(() => import("./contacts-view-topbar"))
const ContactsFiltersContent = lazy(() => import("@/features/people/contacts/components/contacts-filters-content"))
const ContactsViewTableActions = lazy(() => import("./contacts-view-table-actions"))
const ContactsViewFiltersPreview = lazy(() => import("./contacts-view-filters-preview"))
//#endregion

const ContactsView = ({ count, ...tableProps }: SharedListViewProps<Contact>) => {
	const { t } = useTranslation("contacts")

	const [viewContactId, setViewContactId] = useState<string | undefined>(undefined)

	const { filters } = useSelector<DataGridState<"contacts">>(({ dataGrid }) => dataGrid["contacts"])
	const isAdvancedFiltersApplied = filters?.advancedFilters

	return (
		<>
			<DataGrid dataGridKey='contacts' count={count}>
				<DataGrid.FiltersBar>
					<DataGrid.FiltersBar.Header>
						<AdvancedFiltersDialog>
							<Button
								className='h-max px-1.5 py-0 pb-0.5 text-primary-600 hover:bg-transparent hover:text-primary-900'
								variant='ghost'
								size='sm'>
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

export default ContactsView

const tableColumns: ColumnType<Contact>[] = [
	...contactsTableColumns,
	{
		accessorKey: "actions",
		cell: (_, { id }) => <ContactsViewTableActions id={id} />,
	},
]
