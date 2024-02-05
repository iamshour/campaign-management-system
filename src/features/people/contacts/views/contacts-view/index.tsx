//#region Import
import { lazy, useState } from "react"
import { useTranslation } from "react-i18next"

import AdvancedTable from "@/core/components/advanced-table"
import useSelector from "@/core/hooks/useSelector"
import type { SharedListViewProps } from "@/core/types"
import contactsTableColumns from "@/features/people/contacts/constants/contacts-table-columns"
import AdvancedFiltersDialog from "@/features/people/contacts/dialogs/advanced-filters-dialog"
import ViewContactDialog from "@/features/people/contacts/dialogs/view-contact-dialog"
import type { Contact } from "@/features/people/contacts/types"
import { Button, type ColumnType } from "@/ui"

const ContactsViewTopbar = lazy(() => import("./contacts-view-topbar"))
const ContactsViewFiltersContent = lazy(() => import("./contacts-view-filters-content"))
const ContactsViewTableActions = lazy(() => import("./contacts-view-table-actions"))
const ContactsViewFiltersPreview = lazy(() => import("./contacts-view-filters-preview"))
//#endregion

const ContactsView = ({ count, ...tableProps }: SharedListViewProps<Contact>) => {
	const { t } = useTranslation("contacts")

	const [viewContactId, setViewContactId] = useState<string | undefined>(undefined)

	const { filters } = useSelector(({ advancedTable }) => advancedTable["contacts"])
	const isAdvancedFiltersApplied = filters?.advancedFilters

	return (
		<>
			<AdvancedTable tableKey='contacts' count={count}>
				<AdvancedTable.FiltersBar>
					<AdvancedTable.FiltersBar.Header>
						<AdvancedFiltersDialog>
							<Button
								className='h-max px-1.5 py-0 pb-0.5 text-primary-600 hover:bg-transparent hover:text-primary-900'
								variant='ghost'
								size='sm'>
								{t("common:filters-bar.advanced-filters.button")}
							</Button>
						</AdvancedFiltersDialog>
					</AdvancedTable.FiltersBar.Header>
					<AdvancedTable.FiltersBar.Content>
						<ContactsViewFiltersContent />

						{isAdvancedFiltersApplied && <ContactsViewFiltersPreview />}
					</AdvancedTable.FiltersBar.Content>
					<AdvancedTable.FiltersBar.Footer />
				</AdvancedTable.FiltersBar>

				<AdvancedTable.Content>
					<AdvancedTable.TopBar>
						<ContactsViewTopbar />
					</AdvancedTable.TopBar>

					<AdvancedTable.Table columns={tableColumns} onRowClick={({ id }) => setViewContactId(id)} {...tableProps} />
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

export default ContactsView

const tableColumns: ColumnType<Contact>[] = [
	...contactsTableColumns,
	{
		accessorKey: "actions",
		cell: (_, { id }) => <ContactsViewTableActions id={id} />,
	},
]
