//#region Import
import { useForm, Button, Footer, Form, Skeleton, type OptionType } from "@blueai/ui"
import { cleanObject, getListOfKey } from "@blueai/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { Suspense, lazy } from "react"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { array, object, string, any } from "zod"

import { useAdvancedTableContext } from "@/core/components/advanced-table"
import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import { clearSelection } from "@/core/slices/advanced-table-slice"
import { useUpdateMultipleContactsMutation } from "@/features/people/contacts/api"
import TagSchema from "@/features/people/contacts/schemas/tag-schema"
import type { UpdateMultipleContactsArgs } from "@/features/people/contacts/types"
import { getContactFilterAndContactSearchFilter, getContactAdvancedFilter } from "@/features/people/contacts/utils"
import GroupOptionTypeSchema from "@/features/people/groups/schemas/group-option-type-schema"

const Input = lazy(() => import("@blueai/ui").then((mod) => ({ default: mod.Input })))
const SelectTagsPopover = lazy(() => import("@/features/people/contacts/components/select-tags-popover"))
const SelectGroupsWithCreatePopover = lazy(
	() => import("@/features/people/groups/components/select-groups-with-create-popover")
)
const SelectGroupsPopover = lazy(() => import("@/features/people/groups/components/select-groups-popover"))
//#endregion

type DialogActionType = "addTags" | "addToGroups" | "removeTags" | "removeFromGroups"

export interface EditMultipleContactsDialogContentProps {
	/**
	 * Callback function used to close the dialog
	 */
	onClose: () => void

	/**
	 * Dialog's Action type (`add` OR `remove`), which could be used for adding or removing Tags
	 */
	actionType: DialogActionType
}

type DialogFormData = { prompt?: number; tags: string[]; groups: OptionType[] }

const EditMultipleContactsDialogContent = ({ actionType, onClose }: EditMultipleContactsDialogContentProps) => {
	const { t } = useTranslation("contacts")
	const dispatch = useDispatch()

	const { selection, filters, searchTerm } = useSelector(({ advancedTable }) => advancedTable["contacts"])
	const { count } = useAdvancedTableContext()

	/**
	 * Boolean used to quickly & conviniently check if Dialog is strictly used for `Tags`
	 * If not, then it used for `Groups`
	 */
	const isTagsDialog = actionType === "addTags" || actionType === "removeTags"

	const form = useForm<DialogFormData>({
		resolver: zodResolver(
			object({
				...schemaMap[actionType],
				prompt:
					selection === "ALL"
						? string().refine((v) => Number(v) === count, {
								message: "Numbers do not match",
							})
						: any(),
			})
		),
		defaultValues: isTagsDialog ? { prompt: 0, tags: [] } : { prompt: 0, groups: [] },
	})

	const [editMultipleContacts, { isLoading: submitLoading }] = useUpdateMultipleContactsMutation()

	const onSubmit = async ({ tags, groups }: DialogFormData) => {
		const body: UpdateMultipleContactsArgs = {
			contactsIds: !!selection && selection !== "ALL" ? selection : undefined,
			tags: isTagsDialog ? tags : undefined,
			groups: !isTagsDialog ? getListOfKey(groups, "value") : undefined,
			// Returns true if the current component is used to add selected entries (tags or groups) to contact
			addToContact: (["addTags", "addToGroups"] as DialogActionType[]).includes(actionType),
			...getContactFilterAndContactSearchFilter(filters, searchTerm),
			...getContactAdvancedFilter(filters?.advancedFilters),
		}

		// Cleaning Body from all undefined values, empty objects, and nested objects with undefined values
		const cleanBody = cleanObject(body)

		await editMultipleContacts(cleanBody)
			.unwrap()
			.then(() => {
				// Clearing Selection list if contacts were selected using their Ids
				if (cleanBody?.contactsIds?.length) dispatch(clearSelection("contacts"))

				toast.success(t(successMessageMap[actionType]))
				form.reset()
				onClose()
			})
	}

	return (
		<Form {...form}>
			<form
				onSubmit={(e) => e.preventDefault()}
				className='flex h-full flex-col justify-between gap-6 overflow-y-auto p-2'>
				<Form.Field
					control={form.control}
					name={isTagsDialog ? "tags" : "groups"}
					render={({ field }) => (
						<Form.Item>
							<Suspense fallback={<Skeleton className='h-[72px] w-[340px]' />}>
								{actionType === "addTags" ? (
									<SelectTagsPopover
										// creatable
										isMulti
										selection={(field.value?.map((value) => ({ label: value, value })) as OptionType[]) || []}
										updateSelection={(items) => form.setValue("tags", getListOfKey(items, "value")!)}
										size='lg'
									/>
								) : actionType === "removeTags" ? (
									<SelectTagsPopover
										isMulti
										selection={(field.value?.map((value) => ({ label: value, value })) as OptionType[]) || []}
										updateSelection={(items) => form.setValue("tags", getListOfKey(items, "value")!)}
										size='lg'
									/>
								) : actionType === "addToGroups" ? (
									<SelectGroupsWithCreatePopover
										isMulti
										selection={field.value as OptionType[]}
										updateSelection={(items) => form.setValue("groups", items)}
										onCreateSuccess={(newGroup) =>
											form.setValue(
												"groups",
												(field.value as OptionType[])?.length
													? [...(field.value as OptionType[]), newGroup]
													: [newGroup]
											)
										}
										size='lg'
									/>
								) : actionType === "removeFromGroups" ? (
									<SelectGroupsPopover
										isMulti
										selection={field.value as OptionType[]}
										updateSelection={(items) => form.setValue("groups", items)}
										size='lg'
									/>
								) : null}
							</Suspense>

							<Form.Message />
						</Form.Item>
					)}
				/>

				{selection === "ALL" && (
					<>
						<p className='w-[340px] max-w-full overflow-x-auto text-base'>{t(messageMap[actionType], { count })}</p>

						<Suspense fallback={<Skeleton className='h-[51px] w-[340px]' />}>
							<Form.Field
								name='prompt'
								control={form.control}
								render={({ field }) => (
									<Form.Item className='mb-2 w-full'>
										<Form.Label>{t("ui:prompt-input.label", { count })}</Form.Label>
										<Form.Control>
											<Input size='lg' className='w-full' placeholder={t("ui:prompt-input.placeholder")} {...field} />
										</Form.Control>
										<Form.Message />
									</Form.Item>
								)}
							/>
						</Suspense>
					</>
				)}

				<Footer>
					<Button
						type='button'
						onClick={form.handleSubmit(onSubmit)}
						className='px-10'
						loading={submitLoading}
						disabled={selection === "ALL" && Number(form.watch("prompt")) !== count}>
						{t(submitLabelMap[actionType])}
					</Button>
				</Footer>
			</form>
		</Form>
	)
}

export default EditMultipleContactsDialogContent

const tagsSchema = { tags: array(TagSchema) }
const groupsSchema = { groups: array(GroupOptionTypeSchema) }

/**
 * Object map used to get Corresponding Zod Schema Type
 */
const schemaMap: Record<DialogActionType, any> = {
	addTags: tagsSchema,
	removeTags: tagsSchema,
	addToGroups: groupsSchema,
	removeFromGroups: groupsSchema,
}

/**
 * Object map used to get localized message for corresponding Dialog when prompt is shown
 */
const messageMap: Record<DialogActionType, string> = {
	addTags: "dialogs.editMultiple.addTags.message",
	addToGroups: "dialogs.editMultiple.addToGroups.message",
	removeTags: "dialogs.editMultiple.removeTags.message",
	removeFromGroups: "dialogs.editMultiple.removeFromGroups.message",
}

/**
 * Object map used to get localized message for corresponding Dialog when prompt is shown
 */
const successMessageMap: Record<DialogActionType, string> = {
	addTags: "dialogs.editMultiple.addTags.success",
	addToGroups: "dialogs.editMultiple.addToGroups.success",
	removeTags: "dialogs.editMultiple.removeTags.success",
	removeFromGroups: "dialogs.editMultiple.removeFromGroups.success",
}

/**
 * Object map used to get localized submit button label for corresponding Dialog
 */
const submitLabelMap: Record<DialogActionType, string> = {
	addTags: "dialogs.editMultiple.addTags.buttons.submit",
	addToGroups: "dialogs.editMultiple.addToGroups.buttons.submit",
	removeTags: "dialogs.editMultiple.removeTags.buttons.submit",
	removeFromGroups: "dialogs.editMultiple.removeFromGroups.buttons.submit",
}
