//#region Import
import type { DataViewState } from "@/core/components/data-view/types"
import type { DeleteContactsBody } from "@/features/people/contacts/types"

import { useDataViewContext } from "@/core/components/data-view/data-view-context"
import { clearSelection } from "@/core/components/data-view/data-view-slice"
import useSelector from "@/core/hooks/useSelector"
import { useDeleteContactsMutation } from "@/features/people/contacts/api"
import { getContactAdvancedFilter, getContactFilter, getContactSearchFilter } from "@/features/people/contacts/utils"
import { Button, Form, Input, useForm } from "@/ui"
import { cleanObject, omit } from "@/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { object, string } from "zod"
//#endregion

export interface DeleteContactsDialogContent {
	/**
	 * Callback function used to close the dialog
	 */
	onClose: () => void
}

const DeleteContactsDialogContent = ({ onClose }: DeleteContactsDialogContent) => {
	const { t } = useTranslation("contacts")

	const dispatch = useDispatch()

	const { filters, searchTerm, selection } = useSelector<DataViewState<"contacts">>(
		({ dataView }) => dataView["contacts"]
	)

	const { count } = useDataViewContext()

	const nbOfContactsToDelete = selection === "ALL" ? count : selection !== undefined ? selection?.length : 0

	const form = useForm<{ prompt: number }>({
		defaultValues: { prompt: 0 },
		resolver: zodResolver(
			object({
				prompt: string().refine((v) => Number(v) === nbOfContactsToDelete, { message: "Numbers do not match" }),
			})
		),
	})

	const [deleteContacts, { isLoading: submitLoading }] = useDeleteContactsMutation()

	const onSubmit = async () => {
		if (Number(form.watch("prompt")) !== nbOfContactsToDelete) return

		const body: DeleteContactsBody = {
			contactAdvancedFilter: getContactAdvancedFilter(filters?.advancedFilters),
			contactFilter: getContactFilter(omit(filters, ["advancedFilters"])),
			contactSearchFilter: getContactSearchFilter(searchTerm),
			contactsIds: !!selection?.length && selection !== "ALL" ? selection : undefined,
		}

		// Cleaning Body from all undefined/empty/nullish objects/nested objects
		const cleanBody = cleanObject(body)

		await deleteContacts(cleanBody).unwrap()

		dispatch(clearSelection("contacts"))

		toast.success(t("dialogs.deleteContacts.success.multi"))
		onClose()
	}

	return (
		<Form {...form}>
			<form
				className='flex h-full flex-col justify-between gap-4 overflow-y-auto p-2 sm:gap-6'
				onSubmit={form.handleSubmit(onSubmit)}>
				<p className='w-full text-base'>{t("dialogs.deleteContacts.message", { count: nbOfContactsToDelete })}</p>

				<Form.Field
					control={form.control}
					name='prompt'
					render={({ field }) => (
						<Form.Item label={t("ui:prompt-input.label", { count: nbOfContactsToDelete })} size='lg'>
							<Input className='w-full' placeholder={t("ui:prompt-input.placeholder")} {...field} />
						</Form.Item>
					)}
				/>

				<Button
					className='ms-auto w-full px-10 sm:w-max'
					disabled={Number(form.watch("prompt")) !== nbOfContactsToDelete}
					loading={submitLoading}
					type='submit'>
					{t("dialogs.deleteContacts.actions.submit")}
				</Button>
			</form>
		</Form>
	)
}

export default DeleteContactsDialogContent
