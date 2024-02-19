//#region Import
import { lazy } from "react"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useNavigate, useParams } from "react-router-dom"

import DataGrid from "@/core/components/data-grid"
import appPaths from "@/core/constants/app-paths"
import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import { clearSelection, resetAdvancedTableState, updateSelection } from "@/core/slices/data-grid-slice/data-grid-slice"
import type { DataGridState } from "@/core/slices/data-grid-slice/types"
import type { SharedListViewProps } from "@/core/types"
import contactsTableColumns from "@/features/people/contacts/constants/contacts-table-columns"
import type { Contact } from "@/features/people/contacts/types"
import { getContactFilterAndContactSearchFilter } from "@/features/people/contacts/utils"
import { Button, Footer } from "@/ui"
import { cleanObject } from "@/utils"

import { useAddContactsToGroupMutation } from "../api"
import type { AddContactsToGroupBody } from "../types"

const ContactsFiltersContent = lazy(() => import("@/features/people/contacts/components/contacts-filters-content"))
//#endregion

const AddContactsToGroupView = ({ count, ...tableProps }: SharedListViewProps<Contact>) => {
	const { t } = useTranslation("groups", { keyPrefix: "views.addToGroup" })

	const { id: groupId } = useParams()

	const [triggerAddContactsToGroup, { isLoading }] = useAddContactsToGroupMutation()

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const { selection, filters, searchTerm } = useSelector<DataGridState<"add-contacts-to-group">>(
		({ dataGrid }) => dataGrid["add-contacts-to-group"]
	)

	const onBack = () => {
		dispatch(resetAdvancedTableState("add-contacts-to-group"))
		navigate(`${appPaths.GROUPS}/${groupId}`, { replace: true })
	}

	const onAdd = async () => {
		const contactsIds = !!selection && selection !== "ALL" ? selection : undefined

		const body: AddContactsToGroupBody = {
			contactGroupsIds: [groupId!],
			contactsIds,
			...getContactFilterAndContactSearchFilter(filters, searchTerm),
		}

		// Cleaning Body from all undefined values, empty objects, and nested objects with undefined values
		const cleanBody = cleanObject(body)

		await triggerAddContactsToGroup(cleanBody)
			.unwrap()
			.then(() => {
				// Clearing Selection list if contacts were selected using their Ids
				if (cleanBody?.contactsIds?.length) dispatch(clearSelection("add-contacts-to-group"))

				toast.success(t("successMessage", { count: contactsIds?.length ?? 2 }))
				onBack()
			})
	}

	return (
		<DataGrid dataGridKey='add-contacts-to-group' count={count}>
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
					columns={contactsTableColumns}
					onRowClick={({ id }) => dispatch(updateSelection({ "add-contacts-to-group": id }))}
					classNames={{ wrapper: "px-4" }}
					{...tableProps}
				/>
				<DataGrid.Pagination>
					<DataGrid.Pagination.Message />
				</DataGrid.Pagination>

				<Footer className='p-4'>
					<Button variant='outline' onClick={onBack}>
						{t("actions.cancel")}
					</Button>

					<Button onClick={onAdd} disabled={!selection} loading={isLoading}>
						{t("actions.submit")}
					</Button>
				</Footer>
			</DataGrid.Content>
		</DataGrid>
	)
}

export default AddContactsToGroupView
