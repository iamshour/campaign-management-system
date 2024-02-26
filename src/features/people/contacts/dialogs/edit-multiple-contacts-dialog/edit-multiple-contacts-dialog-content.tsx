//#region Import
import type { DataGridState } from "@/core/slices/data-grid-slice/types"
import type { UpdateMultipleContactsBody } from "@/features/people/contacts/types"

import { useDataGridContext } from "@/core/components/data-grid/data-grid"
import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import { clearSelection } from "@/core/slices/data-grid-slice/data-grid-slice"
import { useUpdateMultipleContactsMutation } from "@/features/people/contacts/api"
import TagSchema from "@/features/people/contacts/schemas/tag-schema"
import { getContactAdvancedFilter, getContactFilter, getContactSearchFilter } from "@/features/people/contacts/utils"
import GroupOptionTypeSchema from "@/features/people/groups/schemas/group-option-type-schema"
import { Button, Footer, Form, type OptionType, Skeleton, useForm } from "@/ui"
import { cleanObject, getListOfKey, omit } from "@/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { lazy, Suspense } from "react"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { any, array, object, string } from "zod"

const Input = lazy(() => import("@/ui/input/input"))

const SelectTagsPopover = lazy(
	() => import("@/features/people/contacts/components/select-tags-popover/select-tags-popover")
)

const SelectGroupsWithCreatePopover = lazy(
	() => import("@/features/people/groups/components/select-groups-with-create-popover")
)

const SelectGroupsPopover = lazy(
	() => import("@/features/people/groups/components/select-groups-popover/select-groups-popover")
)
//#endregion

type DialogActionType = "addTags" | "addToGroups" | "removeFromGroups" | "removeTags"

export interface EditMultipleContactsDialogContentProps {
	/**
	 * Dialog's Action type (`add` OR `remove`), which could be used for adding or removing Tags
	 */
	actionType: DialogActionType

	/**
	 * Callback function used to close the dialog
	 */
	onClose: () => void
}

type DialogFormData = { groups: OptionType[]; prompt?: number; tags: string[] }

const EditMultipleContactsDialogContent = ({ actionType, onClose }: EditMultipleContactsDialogContentProps) => {
	const { t } = useTranslation("contacts")

	const dispatch = useDispatch()

	const { filters, searchTerm, selection } = useSelector<DataGridState<"contacts">>(
		({ dataGrid }) => dataGrid["contacts"]
	)

	const { count } = useDataGridContext()

	/**
	 * Boolean used to quickly & conviniently check if Dialog is strictly used for `Tags`
	 * If not, then it used for `Groups`
	 */
	const isTagsDialog = actionType === "addTags" || actionType === "removeTags"

	const form = useForm<DialogFormData>({
		defaultValues: isTagsDialog ? { prompt: 0, tags: [] } : { groups: [], prompt: 0 },
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
	})

	const [editMultipleContacts, { isLoading: submitLoading }] = useUpdateMultipleContactsMutation()

	const onSubmit = async ({ groups, tags }: DialogFormData) => {
		const body: UpdateMultipleContactsBody = {
			// Returns true if the current component is used to add selected entries (tags or groups) to contact
			addToContact: (["addTags", "addToGroups"] as DialogActionType[]).includes(actionType),
			contactAdvancedFilter: getContactAdvancedFilter(filters?.advancedFilters),
			contactFilter: getContactFilter(omit(filters, ["advancedFilters"])),
			contactSearchFilter: getContactSearchFilter(searchTerm),
			contactsIds: !!selection && selection !== "ALL" ? selection : undefined,
			groups: !isTagsDialog ? getListOfKey(groups, "value") : undefined,
			tags: isTagsDialog ? tags : undefined,
		}

		// Cleaning Body from all undefined/empty/nullish objects/nested objects
		const cleanBody = cleanObject(body)

		await editMultipleContacts(cleanBody).unwrap()

		// Clearing Selection list if contacts were selected using their Ids
		if (cleanBody?.contactsIds?.length) dispatch(clearSelection("contacts"))

		toast.success(t(successMessageMap[actionType]))
		form.reset()
		onClose()
	}

	return (
		<Form {...form}>
			<form
				className='flex h-full flex-col justify-between gap-6 overflow-y-auto p-2'
				onSubmit={(e) => e.preventDefault()}>
				<Form.Field
					control={form.control}
					name={isTagsDialog ? "tags" : "groups"}
					render={({ field }) => (
						<Form.Item>
							<Suspense fallback={<Skeleton className='h-[72px] w-[340px]' />}>
								{actionType === "addTags" ? (
									<SelectTagsPopover
										creatable
										isMulti
										selection={(field.value?.map((value) => ({ label: value, value })) as OptionType[]) || []}
										size='lg'
										updateSelection={(items) => form.setValue("tags", getListOfKey(items, "value")!)}
									/>
								) : actionType === "removeTags" ? (
									<SelectTagsPopover
										isMulti
										selection={(field.value?.map((value) => ({ label: value, value })) as OptionType[]) || []}
										size='lg'
										updateSelection={(items) => form.setValue("tags", getListOfKey(items, "value")!)}
									/>
								) : actionType === "addToGroups" ? (
									<SelectGroupsWithCreatePopover
										isMulti
										onCreateSuccess={(newGroup) =>
											form.setValue(
												"groups",
												(field.value as OptionType[])?.length
													? [...(field.value as OptionType[]), newGroup]
													: [newGroup]
											)
										}
										selection={field.value as OptionType[]}
										size='lg'
										updateSelection={(items) => form.setValue("groups", items)}
									/>
								) : actionType === "removeFromGroups" ? (
									<SelectGroupsPopover
										isMulti
										selection={field.value as OptionType[]}
										size='lg'
										updateSelection={(items) => form.setValue("groups", items)}
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
								control={form.control}
								name='prompt'
								render={({ field }) => (
									<Form.Item className='mb-2 w-full'>
										<Form.Label>{t("ui:prompt-input.label", { count })}</Form.Label>
										<Form.Control>
											<Input className='w-full' placeholder={t("ui:prompt-input.placeholder")} size='lg' {...field} />
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
						className='px-10'
						disabled={selection === "ALL" && Number(form.watch("prompt")) !== count}
						loading={submitLoading}
						onClick={form.handleSubmit(onSubmit)}
						type='button'>
						{t(submitLabelMap[actionType])}
					</Button>
				</Footer>
			</form>
		</Form>
	)
}

export default EditMultipleContactsDialogContent

const tagsSchema = { tags: array(TagSchema).max(50, { message: "Can't select more than 10 Tags" }) }

const groupsSchema = { groups: array(GroupOptionTypeSchema).max(50, { message: "Can't select more than 10 Groups" }) }

/**
 * Object map used to get Corresponding Zod Schema Type
 */
const schemaMap: Record<DialogActionType, any> = {
	addTags: tagsSchema,
	addToGroups: groupsSchema,
	removeFromGroups: groupsSchema,
	removeTags: tagsSchema,
}

/**
 * Object map used to get localized message for corresponding Dialog when prompt is shown
 */
const messageMap: Record<DialogActionType, string> = {
	addTags: "dialogs.editMultiple.addTags.message",
	addToGroups: "dialogs.editMultiple.addToGroups.message",
	removeFromGroups: "dialogs.editMultiple.removeFromGroups.message",
	removeTags: "dialogs.editMultiple.removeTags.message",
}

/**
 * Object map used to get localized message for corresponding Dialog when prompt is shown
 */
const successMessageMap: Record<DialogActionType, string> = {
	addTags: "dialogs.editMultiple.addTags.success",
	addToGroups: "dialogs.editMultiple.addToGroups.success",
	removeFromGroups: "dialogs.editMultiple.removeFromGroups.success",
	removeTags: "dialogs.editMultiple.removeTags.success",
}

/**
 * Object map used to get localized submit button label for corresponding Dialog
 */
const submitLabelMap: Record<DialogActionType, string> = {
	addTags: "dialogs.editMultiple.addTags.buttons.submit",
	addToGroups: "dialogs.editMultiple.addToGroups.buttons.submit",
	removeFromGroups: "dialogs.editMultiple.removeFromGroups.buttons.submit",
	removeTags: "dialogs.editMultiple.removeTags.buttons.submit",
}
