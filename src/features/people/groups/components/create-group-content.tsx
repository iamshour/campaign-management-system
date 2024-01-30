//#region Import
import { zodResolver } from "@hookform/resolvers/zod"
import { OptionType, twMerge, useForm } from "@package/ui"
import Button from "@package/ui/src/button"
import Footer from "@package/ui/src/footer"
import Form from "@package/ui/src/form"
import Input from "@package/ui/src/input/input"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"

import { ErrorObject } from "@/core/lib/redux-toolkit/helpers"
import GroupSchema, { type GroupSchemaType } from "@/features/people/groups/schemas/group-schema"
import type { Group } from "@/features/people/groups/types"

import { useCreateGroupMutation, useEditGroupMutation } from "../api"
//#endregion

export interface CreateGroupContentProps extends Partial<Pick<Group, "groupId" | "groupName" | "description">> {
	closePopover: () => void
	size?: React.ComponentPropsWithoutRef<typeof Input>["size"]
	className?: string
	ctaButtonProps?: React.ComponentPropsWithoutRef<typeof Button>

	/**
	 * Callback function passed only in some components called on successful creation of group, used to return new group data
	 */
	onCreateSuccess?: (newGroupData: OptionType) => void
}

const CreateGroupContent = ({
	closePopover,
	groupId,
	groupName = "",
	description: groupDescription = "",
	size,
	className,
	ctaButtonProps,
	onCreateSuccess,
}: CreateGroupContentProps) => {
	const { t } = useTranslation("groups", { keyPrefix: "components.groupsPopover.createNewPopover" })

	const [triggerCreateGroupMutation, { isLoading: isCreateSubmitLoading }] = useCreateGroupMutation()
	const [triggerEditGroupMutation, { isLoading: isEditSubmitLoading }] = useEditGroupMutation()

	const form = useForm<GroupSchemaType>({
		resolver: zodResolver(GroupSchema),
		defaultValues: { groupName, groupDescription },
	})

	const catchErrors = (error: ErrorObject) => {
		// At this moment, we're only catching one specific error for group name that already exist
		// Can be used to catch other errors later on
		if (error?.data?.statusCode !== 4050300) return
		form.setError("groupName", { message: error.data.message })
	}

	const onSuccess = (message: string) => {
		closePopover()
		toast.success(t(message))
	}

	const onSubmit = async ({ groupName: name, groupDescription: description }: GroupSchemaType) => {
		if (!groupId) {
			await triggerCreateGroupMutation({ name, description })
				.unwrap()
				.then(({ groupName, groupId }) => {
					if (onCreateSuccess) onCreateSuccess({ label: groupName, value: groupId })

					onSuccess("createSuccessMessage")
				})
				.catch(catchErrors)
		}

		if (groupId) {
			await triggerEditGroupMutation({ groupId, name, description })
				.unwrap()
				.then(() => onSuccess("editSuccessMessage"))
				.catch(catchErrors)
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className={twMerge("space-y-4 overflow-y-auto p-2", className)}>
				<Form.Field
					control={form.control}
					name='groupName'
					render={({ field }) => (
						<Form.Item>
							<Form.Label size={size}>{t("fields.name.label")}</Form.Label>
							<Form.Control>
								<Input size={size} placeholder={t("fields.description.placeholder")} {...field} />
							</Form.Control>
							<Form.Message />
						</Form.Item>
					)}
				/>
				<Form.Field
					control={form.control}
					name='groupDescription'
					render={({ field }) => (
						<Form.Item className='pb-4'>
							<Form.Label size={size}>{t("fields.description.label")}</Form.Label>
							<Form.Control>
								<Input size={size} placeholder={t("fields.description.placeholder")} {...field} />
							</Form.Control>
							<Form.Message />
						</Form.Item>
					)}
				/>
				<Footer>
					<Button
						type='submit'
						loading={isCreateSubmitLoading || isEditSubmitLoading}
						className='px-8'
						variant='secondary'
						{...ctaButtonProps}>
						{ctaButtonProps?.children ? ctaButtonProps?.children : groupId ? "Save" : "Create"}
					</Button>
				</Footer>
			</form>
		</Form>
	)
}

export default CreateGroupContent
