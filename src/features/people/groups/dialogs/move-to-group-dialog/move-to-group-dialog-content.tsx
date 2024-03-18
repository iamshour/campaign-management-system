//#region Import
import type { DataViewState } from "@/core/components/data-view/types"
import type { MoveContactsToGroupBody } from "@/features/people/groups/types"

import { useDataViewContext } from "@/core/components/data-view/data-view-context"
import { clearSelection } from "@/core/components/data-view/data-view-slice"
import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import { getContactFilter, getContactSearchFilter } from "@/features/people/contacts/utils"
import { useMoveContactsToGroupMutation } from "@/features/people/groups/api"
import GroupOptionTypeSchema from "@/features/people/groups/schemas/group-option-type-schema"
import { Button, Footer, Form, type OptionType, Skeleton, useForm } from "@/ui"
import { useDropdownStateContext } from "@/ui/dropdown/dropdown-state-context"
import { cleanObject } from "@/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { lazy, Suspense } from "react"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"
import { any, object, string } from "zod"

const Input = lazy(() => import("@/ui/input/input"))

const SelectGroupsPopover = lazy(
	() => import("@/features/people/groups/components/select-groups-popover/select-groups-popover")
)
//#endregion

export interface MoveToGroupDialogContentProps {
	/**
	 * Callback function used to close the dialog
	 */
	closeDialog: () => void

	/**
	 * Contact Id in the Group we want to remove from
	 */
	id?: string
}

type DialogFormData = { group?: OptionType; prompt: number }

const MoveToGroupDialogContent = ({ closeDialog, id }: MoveToGroupDialogContentProps) => {
	const { t } = useTranslation("groups")

	const { id: currentGroupId } = useParams()

	const dispatch = useDispatch()

	const { closeDropdown } = useDropdownStateContext()

	const { filters, searchTerm, selection } = useSelector<DataViewState<"contacts-in-group">>(
		({ dataView }) => dataView["contacts-in-group"]
	)

	const { count } = useDataViewContext()

	const [triggerMoveContactsToGroup, { isLoading }] = useMoveContactsToGroupMutation()

	const nbOfContactsToMove = id ? 1 : selection ? (selection === "ALL" ? count : selection?.length) : 0

	const form = useForm<DialogFormData>({
		defaultValues: { prompt: 0 },
		resolver: getResolvedFormSchema(nbOfContactsToMove),
	})

	const onSubmit = async ({ group }: DialogFormData) => {
		if (!group?.value) return

		const contactsIdsToBeMoved = id ? [id] : !!selection && selection !== "ALL" ? selection : undefined

		const body: MoveContactsToGroupBody = {
			contactFilter: getContactFilter(filters),
			contactSearchFilter: getContactSearchFilter(searchTerm),
			contactsIds: contactsIdsToBeMoved,
			fromGroupId: currentGroupId!,
			moveAndDelete: false,
			toGroupId: group?.value,
		}

		// Cleaning Body from all undefined/empty/nullish objects/nested objects
		const cleanBody = cleanObject(body)

		await triggerMoveContactsToGroup(cleanBody).unwrap()

		// Clearing Selection list if contacts were selected using their Ids
		if (cleanBody?.contactsIds?.length) dispatch(clearSelection("contacts-in-group"))

		toast.success(t("dialogs.move-to-group.successMessage", { count: nbOfContactsToMove }))

		closeDialog()
		closeDropdown()
	}

	return (
		<Form {...form}>
			<form
				className='flex h-full flex-col justify-between gap-6 overflow-y-auto p-2'
				onSubmit={form.handleSubmit(onSubmit)}>
				<Form.Field
					control={form.control}
					name='group'
					render={({ field }) => (
						<Form.Item label={t("groups:components.groupsPopover.label")} size='lg'>
							<Suspense fallback={<Skeleton className='h-[72px] w-[340px]' />}>
								<SelectGroupsPopover
									selection={field.value}
									updateSelection={(group) => form.setValue("group", group)}
								/>
							</Suspense>
						</Form.Item>
					)}
				/>

				{nbOfContactsToMove > 1 && (
					<>
						<p>{t("dialogs.move-to-group.message", { count: nbOfContactsToMove })}</p>

						<Suspense fallback={<Skeleton className='h-[50px] w-[340px]' />}>
							<Form.Field
								control={form.control}
								name='prompt'
								render={({ field }) => (
									<Form.Item label={t("ui:prompt-input.label", { count: nbOfContactsToMove })} size='lg'>
										<Input placeholder={t("ui:prompt-input.placeholder")} {...field} />
									</Form.Item>
								)}
							/>
						</Suspense>
					</>
				)}

				<Footer>
					<Button
						className='px-10'
						disabled={nbOfContactsToMove > 1 && Number(form.watch("prompt")) !== nbOfContactsToMove}
						loading={isLoading}
						type='submit'>
						{t("dialogs.move-to-group.actions.submit")}
					</Button>
				</Footer>
			</form>
		</Form>
	)
}

export default MoveToGroupDialogContent

const getResolvedFormSchema = (nbToMove: number) => {
	return zodResolver(
		object({
			group: GroupOptionTypeSchema.partial()
				.optional()
				.refine((g) => !!g && !!Object.values(g)?.length, {
					message: "Please Choose a group",
				}),
			prompt:
				nbToMove > 1 ? string().refine((v) => Number(v) === nbToMove, { message: "Numbers do not match" }) : any(),
		})
	)
}
