//#region Import
import { zodResolver } from "@hookform/resolvers/zod"
import { Suspense, lazy } from "react"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"
import { object, string, any } from "zod"

import { useAdvancedTableContext } from "@/core/components/advanced-table"
import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import { clearSelection } from "@/core/slices/advanced-table-slice/advanced-table-slice"
import type { AdvancedTableStateType } from "@/core/slices/advanced-table-slice/types"
import { getContactFilterAndContactSearchFilter } from "@/features/people/contacts/utils"
import { useMoveContactsToGroupMutation } from "@/features/people/groups/api"
import GroupOptionTypeSchema from "@/features/people/groups/schemas/group-option-type-schema"
import type { MoveContactsToGroupArgs } from "@/features/people/groups/types"
import { Button, Footer, Form, Skeleton, useForm, type OptionType } from "@/ui"
import { cleanObject } from "@/utils"

const Input = lazy(() => import("@/ui").then((mod) => ({ default: mod.Input })))
const SelectGroupsPopover = lazy(() => import("@/features/people/groups/components/select-groups-popover"))
//#endregion

export interface MoveToGroupDialogContentProps {
	/**
	 * Callback function used to close the dialog
	 */
	onClose: () => void

	/**
	 * Contact Id in the Group we want to remove from
	 */
	id?: string
}

type DialogFormData = { prompt: number; group?: OptionType }

const MoveToGroupDialogContent = ({ id, onClose }: MoveToGroupDialogContentProps) => {
	const { t } = useTranslation("groups")
	const { id: currentGroupId } = useParams()

	const dispatch = useDispatch()

	const { selection, filters, searchTerm } = useSelector<AdvancedTableStateType<"contacts-in-group">>(
		({ advancedTable }) => advancedTable["contacts-in-group"]
	)
	const { count } = useAdvancedTableContext()

	const [triggerMoveContactsToGroup, { isLoading }] = useMoveContactsToGroupMutation()

	const nbOfContactsToMove = id ? 1 : selection ? (selection === "ALL" ? count : selection?.length) : 0

	const form = useForm<DialogFormData>({
		resolver: getResolvedFormSchema(nbOfContactsToMove),
		defaultValues: { prompt: 0 },
	})

	const onSubmit = async ({ group }: DialogFormData) => {
		if (!group?.value) return

		const contactsIdsToBeMoved = id ? [id] : !!selection && selection !== "ALL" ? selection : undefined

		const body: MoveContactsToGroupArgs = {
			contactsIds: contactsIdsToBeMoved,
			fromGroupId: currentGroupId!,
			toGroupId: group?.value,
			moveAndDelete: false,
			...getContactFilterAndContactSearchFilter(filters, searchTerm),
		}

		// Cleaning Body from all undefined values, empty objects, and nested objects with undefined values
		const cleanBody = cleanObject(body)

		await triggerMoveContactsToGroup(cleanBody)
			.unwrap()
			.then(() => {
				// Clearing Selection list if contacts were selected using their Ids
				if (cleanBody?.contactsIds?.length) dispatch(clearSelection("contacts-in-group"))

				toast.success(t("dialogs.move-to-group.successMessage", { count: nbOfContactsToMove }))
				onClose()
			})
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex h-full flex-col justify-between gap-6 overflow-y-auto p-2'>
				<Form.Field
					control={form.control}
					name='group'
					render={({ field }) => (
						<Form.Item>
							<Suspense fallback={<Skeleton className='h-[72px] w-[340px]' />}>
								<SelectGroupsPopover
									isMulti={false}
									selection={field.value}
									updateSelection={(group) => form.setValue("group", group)}
									size='lg'
								/>
							</Suspense>

							<Form.Message />
						</Form.Item>
					)}
				/>

				{nbOfContactsToMove > 1 && (
					<>
						<p>{t("dialogs.move-to-group.message", { count: nbOfContactsToMove })}</p>

						<Suspense fallback={<Skeleton className='h-[50px] w-[340px]' />}>
							<Form.Field
								name='prompt'
								control={form.control}
								render={({ field }) => (
									<Form.Item>
										<Form.Label>{t("ui:prompt-input.label", { count: nbOfContactsToMove })}</Form.Label>
										<Form.Control>
											<Input size='lg' placeholder={t("ui:prompt-input.placeholder")} {...field} />
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
						type='submit'
						className='px-10'
						loading={isLoading}
						disabled={nbOfContactsToMove > 1 && Number(form.watch("prompt")) !== nbOfContactsToMove}>
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
