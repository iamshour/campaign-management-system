//#region Import
import { zodResolver } from "@hookform/resolvers/zod"
import { Suspense, lazy } from "react"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"
import { any, object, string } from "zod"

import { useDataGridContext } from "@/core/components/data-grid"
import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import { clearSelection } from "@/core/slices/data-grid-slice/data-grid-slice"
import type { DataGridState } from "@/core/slices/data-grid-slice/types"
import { getContactFilterAndContactSearchFilter } from "@/features/people/contacts/utils"
import { useRemoveContactsFromGroupMutation } from "@/features/people/groups/api"
import type { RemoveContactsFromGroupBody } from "@/features/people/groups/types"
import { useForm, Button, Footer, Form, Skeleton } from "@/ui"
import { useDropdownStateContext } from "@/ui/dropdown/dropdown-state-context"
import { cleanObject } from "@/utils"

const Input = lazy(() => import("@/ui/input/input"))
//#endregion

export interface RemoveFromGroupDialogContentProps {
	/**
	 * Contact Id in the Group we want to remove from
	 */
	id?: string

	/**
	 * Callback function used to close the dialog
	 */
	closeDialog: () => void
}

const RemoveMultiContactsFromGroup = ({ id, closeDialog }: RemoveFromGroupDialogContentProps) => {
	const { t } = useTranslation("groups")
	const { id: currentGroupId } = useParams()

	const dispatch = useDispatch()

	const { closeDropdown } = useDropdownStateContext()

	const { selection, filters, searchTerm } = useSelector<DataGridState<"contacts-in-group">>(
		({ dataGrid }) => dataGrid["contacts-in-group"]
	)
	const { count } = useDataGridContext()

	const [triggerRemoveContactsFromGroup, { isLoading }] = useRemoveContactsFromGroupMutation()

	const nbOfContactsToRemove = (selection === "ALL" ? count : selection?.length) ?? 0

	const form = useForm<{ prompt?: number }>({
		resolver: getResolvedFormSchema(nbOfContactsToRemove),
		defaultValues: { prompt: 0 },
	})

	const onSubmit = async () => {
		const contactsIdsToBeRemoved = id ? [id] : !!selection && selection !== "ALL" ? selection : undefined

		const body: RemoveContactsFromGroupBody = {
			contactsIds: contactsIdsToBeRemoved,
			contactGroupsIds: [currentGroupId!],
			...getContactFilterAndContactSearchFilter(filters, searchTerm),
		}

		// Cleaning Body from all undefined values, empty objects, and nested objects with undefined values
		const cleanBody = cleanObject(body)

		await triggerRemoveContactsFromGroup(cleanBody).unwrap()

		// Clearing Selection list if contacts were selected using their Ids
		if (cleanBody?.contactsIds?.length) dispatch(clearSelection("contacts-in-group"))

		toast.success(t("successMessage", { count: nbOfContactsToRemove }))

		closeDialog()
		closeDropdown()
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-6 overflow-y-auto p-2'>
				<p>{t("dialogs.remove-from-group.message", { count: nbOfContactsToRemove })}</p>

				{nbOfContactsToRemove > 1 && (
					<Suspense fallback={<Skeleton className='h-[50px]' />}>
						<Form.Field
							name='prompt'
							control={form.control}
							render={({ field }) => (
								<Form.Item>
									<Form.Label>{t("ui:prompt-input.label", { count: nbOfContactsToRemove })}</Form.Label>
									<Form.Control>
										<Input size='lg' placeholder={t("ui:prompt-input.placeholder")} {...field} />
									</Form.Control>
									<Form.Message />
								</Form.Item>
							)}
						/>
					</Suspense>
				)}

				<Footer>
					<Button
						type='submit'
						className='px-10'
						loading={isLoading}
						disabled={nbOfContactsToRemove > 1 && Number(form.watch("prompt")) !== nbOfContactsToRemove}>
						{t("dialogs.remove-from-group.actions.submit")}
					</Button>
				</Footer>
			</form>
		</Form>
	)
}

export default RemoveMultiContactsFromGroup

const getResolvedFormSchema = (nbToRemove: number) => {
	return zodResolver(
		object({
			prompt:
				nbToRemove > 1 ? string().refine((v) => Number(v) === nbToRemove, { message: "Numbers do not match" }) : any(),
		})
	)
}
