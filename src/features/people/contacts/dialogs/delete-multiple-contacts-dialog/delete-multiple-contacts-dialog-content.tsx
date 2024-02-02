//#region Import
import { zodResolver } from "@hookform/resolvers/zod"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { object, string } from "zod"

import { useAdvancedTableContext } from "@/core/components/advanced-table"
import useSelector from "@/core/hooks/useSelector"
import { clearSelection } from "@/core/slices/advanced-table-slice"
import { useDeleteContactsMutation } from "@/features/people/contacts/api"
import type { ContactFilters } from "@/features/people/contacts/types"
import { getContactFilterAndContactSearchFilter, getContactAdvancedFilter } from "@/features/people/contacts/utils"
import { useForm, Button, Footer, Form, Input } from "@/ui"
import { cleanObject } from "@/utils"
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

	const { selection, filters, searchTerm } = useSelector(({ advancedTable }) => advancedTable["contacts"])
	const { count } = useAdvancedTableContext()

	const nbOfContactsToDelete = selection === "ALL" ? count : selection !== undefined ? selection?.length : 0

	const form = useForm<{ prompt: number }>({
		resolver: zodResolver(
			object({
				// Custom Validation for Prompt input, so that it's only accepted if passed input in promt equals to number of contacts to be deleted
				prompt: string().refine((v) => Number(v) === nbOfContactsToDelete, { message: "Numbers do not match" }),
			})
		),
		defaultValues: { prompt: 0 },
	})

	const [deleteContacts, { isLoading: submitLoading }] = useDeleteContactsMutation()

	const onSubmit = async () => {
		if (Number(form.watch("prompt")) !== nbOfContactsToDelete) return

		const body: ContactFilters = {
			contactsIds: !!selection?.length && selection !== "ALL" ? selection : undefined,
			...getContactFilterAndContactSearchFilter(filters, searchTerm),
			...getContactAdvancedFilter(filters?.advancedFilters),
		}

		// Cleaning Body from all undefined/nullish values
		const cleanBody = cleanObject(body)

		await deleteContacts(cleanBody)
			.unwrap()
			.then(() => {
				// Clearing Selection list if contacts were selected using their Ids
				if (cleanBody?.contactsIds?.length) dispatch(clearSelection("contacts"))

				toast.success(t("dialogs.deleteContacts.success.multi"))
				onClose()
			})
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex h-full flex-col justify-between gap-4 overflow-y-auto p-2 sm:gap-6'>
				<p className='w-full text-base'>{t("dialogs.deleteContacts.message", { count: nbOfContactsToDelete })}</p>

				<Form.Field
					name='prompt'
					control={form.control}
					render={({ field }) => (
						<Form.Item>
							<Form.Label>{t("ui:prompt-input.label", { count: nbOfContactsToDelete })}</Form.Label>
							<Form.Control>
								<Input size='lg' className='w-full' placeholder={t("ui:prompt-input.placeholder")} {...field} />
							</Form.Control>
							<Form.Message />
						</Form.Item>
					)}
				/>

				<Footer>
					<Button
						loading={submitLoading}
						type='submit'
						className='px-10'
						disabled={Number(form.watch("prompt")) !== nbOfContactsToDelete}>
						{t("dialogs.deleteContacts.actions.submit")}
					</Button>
				</Footer>
			</form>
		</Form>
	)
}

export default DeleteContactsDialogContent
