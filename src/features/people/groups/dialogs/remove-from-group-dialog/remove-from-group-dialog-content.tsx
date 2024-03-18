//#region Import
import type { DataViewState } from "@/core/components/data-view/types"
import type { RemoveContactsFromGroupBody } from "@/features/people/groups/types"

import { useDataViewContext } from "@/core/components/data-view/data-view-context"
import { clearSelection } from "@/core/components/data-view/data-view-slice"
import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import { getContactFilter, getContactSearchFilter } from "@/features/people/contacts/utils"
import { useRemoveContactsFromGroupMutation } from "@/features/people/groups/api"
import { Button, Footer, Form, Skeleton, useForm } from "@/ui"
import { useDropdownStateContext } from "@/ui/dropdown/dropdown-state-context"
import { cleanObject } from "@/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { lazy, Suspense } from "react"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"
import { any, object, string } from "zod"

const Input = lazy(() => import("@/ui/input/input"))
//#endregion

export interface RemoveFromGroupDialogContentProps {
	/**
	 * Callback function used to close the dialog
	 */
	closeDialog: () => void

	/**
	 * Contact Id in the Group we want to remove from
	 */
	id?: string
}

const RemoveMultiContactsFromGroup = ({ closeDialog, id }: RemoveFromGroupDialogContentProps) => {
	const { t } = useTranslation("groups")

	const { id: currentGroupId } = useParams()

	const dispatch = useDispatch()

	const { closeDropdown } = useDropdownStateContext()

	const { filters, searchTerm, selection } = useSelector<DataViewState<"contacts-in-group">>(
		({ dataView }) => dataView["contacts-in-group"]
	)

	const { count } = useDataViewContext()

	const [triggerRemoveContactsFromGroup, { isLoading }] = useRemoveContactsFromGroupMutation()

	const nbOfContactsToRemove = (selection === "ALL" ? count : selection?.length) ?? 0

	const form = useForm<{ prompt?: number }>({
		defaultValues: { prompt: 0 },
		resolver: getResolvedFormSchema(nbOfContactsToRemove),
	})

	const onSubmit = async () => {
		const contactsIdsToBeRemoved = id ? [id] : !!selection && selection !== "ALL" ? selection : undefined

		const body: RemoveContactsFromGroupBody = {
			contactFilter: getContactFilter(filters),
			contactGroupsIds: [currentGroupId!],
			contactSearchFilter: getContactSearchFilter(searchTerm),
			contactsIds: contactsIdsToBeRemoved,
		}

		// Cleaning Body from all undefined/empty/nullish objects/nested objects
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
			<form className='flex flex-col gap-6 overflow-y-auto p-2' onSubmit={form.handleSubmit(onSubmit)}>
				<p>{t("dialogs.remove-from-group.message", { count: nbOfContactsToRemove })}</p>

				{nbOfContactsToRemove > 1 && (
					<Suspense fallback={<Skeleton className='h-[50px]' />}>
						<Form.Field
							control={form.control}
							name='prompt'
							render={({ field }) => (
								<Form.Item label={t("ui:prompt-input.label", { count: nbOfContactsToRemove })} size='lg'>
									<Input placeholder={t("ui:prompt-input.placeholder")} {...field} />
								</Form.Item>
							)}
						/>
					</Suspense>
				)}

				<Footer>
					<Button
						className='px-10'
						disabled={nbOfContactsToRemove > 1 && Number(form.watch("prompt")) !== nbOfContactsToRemove}
						loading={isLoading}
						type='submit'>
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
