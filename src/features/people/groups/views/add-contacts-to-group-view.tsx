//#region Import
import type { DataGridState } from "@/core/slices/data-grid-slice/types"
import type { SharedListViewProps } from "@/core/types"
import type { Contact } from "@/features/people/contacts/types"

import DataGrid from "@/core/components/data-grid/data-grid"
import appPaths from "@/core/constants/app-paths"
import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import {
	clearSelection,
	resetAdvancedTableState,
	updateDataGridState,
} from "@/core/slices/data-grid-slice/data-grid-slice"
import contactsTableColumns from "@/features/people/contacts/constants/contacts-table-columns"
import { Button, Footer } from "@/ui"
import { cleanObject } from "@/utils"
import { lazy } from "react"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useNavigate, useParams } from "react-router-dom"

import type { AddContactsToGroupBody } from "../types"

import { getContactFilter, getContactSearchFilter } from "../../contacts/utils"
import { useAddContactsToGroupMutation } from "../api"

const ContactsFiltersContent = lazy(() => import("@/features/people/contacts/components/contacts-filters-content"))
//#endregion

const AddContactsToGroupView = (props: SharedListViewProps<Contact>) => {
	const { t } = useTranslation("groups", { keyPrefix: "views.addToGroup" })

	const { id: groupId } = useParams()

	const [triggerAddContactsToGroup, { isLoading }] = useAddContactsToGroupMutation()

	const dispatch = useDispatch()

	const navigate = useNavigate()

	const { filters, searchTerm, selection } = useSelector<DataGridState<"add-contacts-to-group">>(
		({ dataGrid }) => dataGrid["add-contacts-to-group"]
	)

	const onBack = () => {
		dispatch(resetAdvancedTableState("add-contacts-to-group"))
		navigate(`${appPaths.GROUPS}/${groupId}`, { replace: true })
	}

	const onAdd = async () => {
		const contactsIds = !!selection && selection !== "ALL" ? selection : undefined

		const body: AddContactsToGroupBody = {
			contactFilter: getContactFilter(filters),
			contactGroupsIds: [groupId!],
			contactSearchFilter: getContactSearchFilter(searchTerm),
			contactsIds,
		}

		// Cleaning Body from all undefined/empty/nullish objects/nested objects
		const cleanBody = cleanObject(body)

		await triggerAddContactsToGroup(cleanBody).unwrap()

		// Clearing Selection list if contacts were selected using their Ids
		if (cleanBody?.contactsIds?.length) dispatch(clearSelection("add-contacts-to-group"))

		toast.success(t("successMessage", { count: contactsIds?.length ?? 2 }))
		onBack()
	}

	return (
		<DataGrid columns={contactsTableColumns} dataGridKey='add-contacts-to-group' {...props}>
			<DataGrid.FiltersBar>
				<DataGrid.FiltersBar.Header />
				<DataGrid.FiltersBar.Content>
					<ContactsFiltersContent />
				</DataGrid.FiltersBar.Content>
				<DataGrid.FiltersBar.Footer />
			</DataGrid.FiltersBar>

			<DataGrid.Content>
				<h3 className='pt-4 text-[21px] font-medium'>{t("title")}</h3>

				<DataGrid.TopBar />
				<DataGrid.Body
					classNames={{ wrapper: "px-4" }}
					onRowClick={({ id }) => dispatch(updateDataGridState({ "add-contacts-to-group": { selection: id } }))}
				/>
				<DataGrid.Pagination>
					<DataGrid.Pagination.Message />
				</DataGrid.Pagination>

				<Footer className='p-4'>
					<Button onClick={onBack} variant='outline'>
						{t("actions.cancel")}
					</Button>

					<Button disabled={!selection} loading={isLoading} onClick={onAdd}>
						{t("actions.submit")}
					</Button>
				</Footer>
			</DataGrid.Content>
		</DataGrid>
	)
}

export default AddContactsToGroupView
