//#region Import
import { zodResolver } from "@hookform/resolvers/zod"
import { Suspense, lazy } from "react"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"
import { any, object, string } from "zod"

import { useAdvancedTableContext } from "@/core/components/advanced-table"
import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import { clearSelection } from "@/core/slices/advanced-table-slice"
import { getContactFilterAndContactSearchFilter } from "@/features/people/contacts/utils"
import { useRemoveContactsFromGroupMutation } from "@/features/people/groups/api"
import type { RemoveContactsFromGroupArgs } from "@/features/people/groups/types"
import { useForm, Button, Footer, Form, Skeleton } from "@/ui"
import { cleanObject } from "@/utils"

const Input = lazy(() => import("@/ui").then((mod) => ({ default: mod.Input })))
//#endregion

export interface RemoveFromGroupDialogContentProps {
	/**
	 * Contact Id in the Group we want to remove from
	 */
	id?: string

	/**
	 * Callback function used to close the dialog
	 */
	onClose: () => void
}

const RemoveMultiContactsFromGroup = ({ id, onClose }: RemoveFromGroupDialogContentProps) => {
	const { t } = useTranslation("groups")
	const { id: currentGroupId } = useParams()

	const dispatch = useDispatch()

	const { selection, filters, searchTerm } = useSelector(({ advancedTable }) => advancedTable["contacts-in-group"])
	const { count } = useAdvancedTableContext()

	const [triggerRemoveContactsFromGroup, { isLoading }] = useRemoveContactsFromGroupMutation()

	const nbOfContactsToRemove = (selection === "ALL" ? count : selection?.length) ?? 0

	const form = useForm<{ prompt?: number }>({
		resolver: getResolvedFormSchema(nbOfContactsToRemove),
		defaultValues: { prompt: 0 },
	})

	const onSubmit = async () => {
		const contactsIdsToBeRemoved = id ? [id] : !!selection && selection !== "ALL" ? selection : undefined

		const body: RemoveContactsFromGroupArgs = {
			contactsIds: contactsIdsToBeRemoved,
			contactGroupsIds: [currentGroupId!],
			...getContactFilterAndContactSearchFilter(filters, searchTerm),
		}

		// Cleaning Body from all undefined values, empty objects, and nested objects with undefined values
		const cleanBody = cleanObject(body)

		await triggerRemoveContactsFromGroup(cleanBody)
			.unwrap()
			.then(() => {
				// Clearing Selection list if contacts were selected using their Ids
				if (cleanBody?.contactsIds?.length) dispatch(clearSelection("contacts-in-group"))

				toast.success(t("successMessage", { count: nbOfContactsToRemove }))
				onClose()
			})
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
