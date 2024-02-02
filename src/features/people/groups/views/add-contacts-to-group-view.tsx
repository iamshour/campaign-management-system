//#region Import
import { lazy } from "react"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useNavigate, useParams } from "react-router-dom"

import AdvancedTable from "@/core/components/advanced-table"
import appPaths from "@/core/constants/app-paths"
import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import { clearSelection, resetAdvancedTableState, updateSelection } from "@/core/slices/advanced-table-slice"
import type { SharedListViewProps } from "@/core/types"
import contactsTableColumns from "@/features/people/contacts/constants/contacts-table-columns"
import type { Contact } from "@/features/people/contacts/types"
import { getContactFilterAndContactSearchFilter } from "@/features/people/contacts/utils"
import { Button, Footer } from "@/ui"
import { cleanObject } from "@/utils"

import { useAddContactsToGroupMutation } from "../api"
import { AddContactsToGroupArgs } from "../types"

const FiltersContent = lazy(() => import("@/features/people/contacts/views/contacts-view/filters-content"))
//#endregion

const AddContactsToGroupView = ({ list, count, ...tableProps }: SharedListViewProps<Contact>) => {
	const { t } = useTranslation("groups", { keyPrefix: "views.addToGroup" })

	const { id: groupId } = useParams()

	const [triggerAddContactsToGroup, { isLoading }] = useAddContactsToGroupMutation()

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const { selection, filters, searchTerm } = useSelector(({ advancedTable }) => advancedTable["add-contacts-to-group"])

	const onBack = () => {
		dispatch(resetAdvancedTableState("add-contacts-to-group"))
		navigate(`${appPaths.GROUPS}/${groupId}`, { replace: true })
	}

	const onAdd = async () => {
		const contactsIds = !!selection && selection !== "ALL" ? selection : undefined

		const body: AddContactsToGroupArgs = {
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
		<AdvancedTable tableKey='add-contacts-to-group' count={count}>
			<AdvancedTable.FiltersBar>
				<AdvancedTable.FiltersBar.Header />
				<AdvancedTable.FiltersBar.Content>
					<FiltersContent />
				</AdvancedTable.FiltersBar.Content>
				<AdvancedTable.FiltersBar.Footer />
			</AdvancedTable.FiltersBar>

			<AdvancedTable.Content>
				<h3 className='pt-4 text-[21px] font-medium'>{t("title")}</h3>

				<AdvancedTable.TopBar />
				<AdvancedTable.Table
					list={list}
					columns={contactsTableColumns}
					onRowClick={({ id }) => dispatch(updateSelection({ "add-contacts-to-group": id }))}
					classNames={{
						wrapper: "px-4",
					}}
					{...tableProps}
				/>
				<AdvancedTable.Pagination>
					<AdvancedTable.Pagination.Message />
				</AdvancedTable.Pagination>

				<Footer className='p-4'>
					<Button variant='outline' onClick={onBack}>
						{t("actions.cancel")}
					</Button>

					<Button onClick={onAdd} disabled={!selection} loading={isLoading}>
						{t("actions.submit")}
					</Button>
				</Footer>
			</AdvancedTable.Content>
		</AdvancedTable>
	)
}

export default AddContactsToGroupView
