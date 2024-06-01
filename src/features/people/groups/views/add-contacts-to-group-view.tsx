//#region Import
import type { DataViewState } from "@/core/components/data-view/types"
import type { SharedListViewProps } from "@/core/types"
import type { Contact } from "@/features/people/contacts/types"

import DataView from "@/core/components/data-view/data-view"
import { checkItem, clearSelection, resetDataViewState } from "@/core/components/data-view/data-view-slice"
import appPaths from "@/core/constants/app-paths"
import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
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

	const { groupId } = useParams()

	const [triggerAddContactsToGroup, { isLoading }] = useAddContactsToGroupMutation()

	const dispatch = useDispatch()

	const navigate = useNavigate()

	const { filters, searchTerm, selection } = useSelector<DataViewState<"add-contacts-to-group">>(
		({ dataView }) => dataView["add-contacts-to-group"]
	)

	const onBack = () => {
		dispatch(resetDataViewState("add-contacts-to-group"))
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
		<DataView columns={contactsTableColumns} dataViewKey='add-contacts-to-group' {...props}>
			<DataView.FiltersBar>
				<DataView.FiltersBar.Header />
				<DataView.FiltersBar.Content>
					<ContactsFiltersContent />
				</DataView.FiltersBar.Content>
				<DataView.FiltersBar.Footer />
			</DataView.FiltersBar>

			<DataView.Content>
				<h3 className='pt-4 text-[21px] font-medium'>{t("title")}</h3>

				<DataView.TopBar className='pt-4' />
				<DataView.Body<Contact> onRowClick={({ id }) => dispatch(checkItem({ "add-contacts-to-group": id }))} />
				<DataView.Pagination>
					<DataView.Pagination.Message />
				</DataView.Pagination>

				<Footer className='py-4'>
					<Button onClick={onBack} variant='outline'>
						{t("actions.cancel")}
					</Button>

					<Button disabled={!selection} loading={isLoading} onClick={onAdd}>
						{t("actions.submit")}
					</Button>
				</Footer>
			</DataView.Content>
		</DataView>
	)
}

export default AddContactsToGroupView
