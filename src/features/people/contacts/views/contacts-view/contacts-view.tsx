//#region Import
import type { ColumnType } from "@/core/components/data-view/data-table/types"
import type { DataViewFilterType } from "@/core/components/data-view/types"
import type { SharedListViewProps } from "@/core/types"
import type { Contact } from "@/features/people/contacts/types"

import DataView from "@/core/components/data-view/data-view"
import { selectFilters } from "@/core/components/data-view/data-view-slice"
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

	const filters = useSelector<DataViewFilterType["contacts"]>(
		(state) => selectFilters(state, "contacts") as DataViewFilterType["contacts"]
	)

	const isAdvancedFiltersApplied = filters?.advancedFilters

	return (
		<>
			<DataView columns={tableColumns} dataViewKey='contacts' {...props}>
				<DataView.FiltersBar>
					<DataView.FiltersBar.Header>
						<AdvancedFiltersDialog>
							<Button
								className='h-max px-1.5 py-0 pb-0.5 text-primary-600 hover:bg-transparent hover:text-primary-900'
								size='sm'
								variant='ghost'>
								{t("common:filters-bar.advanced-filters.button")}
							</Button>
						</AdvancedFiltersDialog>
					</DataView.FiltersBar.Header>
					<DataView.FiltersBar.Content>
						<ContactsFiltersContent />

						{isAdvancedFiltersApplied && <ContactsViewFiltersPreview />}
					</DataView.FiltersBar.Content>
					<DataView.FiltersBar.Footer />
				</DataView.FiltersBar>

				<DataView.Content>
					<DataView.TopBar>
						<ContactsViewTopbar />
					</DataView.TopBar>

					<DataView.Body onRowClick={({ id }) => setViewContactId(id)} />

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

export default ContactsView

const tableColumns: ColumnType<Contact>[] = [
	...contactsTableColumns,
	{
		accessorKey: "actions",
		cell: (_, { id }) => <ContactsViewTableActions id={id} />,
	},
]
