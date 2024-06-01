//#region Import
import type { ErrorObject } from "@/core/lib/redux-toolkit/helpers"
import type { GroupSchemaType } from "@/features/people/groups/schemas/group-schema"

import { useCreateGroupMutation } from "@/features/people/groups/api"
import GroupForm from "@/features/people/groups/components/group-form"
import { Button, type OptionType, type UseFormReturn } from "@/ui"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
//#endregion

export interface CreateGroupContentProps extends Pick<React.ComponentPropsWithoutRef<typeof GroupForm>, "size"> {
	/**
	 *  Callback function used to close Popover/Dialog
	 */
	closeDialog: () => void

	/**
	 * Call To Action Button Props (Optional)
	 */
	ctaProps?: React.ComponentPropsWithoutRef<typeof Button>

	/**
	 * Callback function passed only in some components called on successful creation of group, used to return new group data
	 */
	onCreateSuccess?: (newGroupData: OptionType) => void
}

const CreateGroupContent = ({ closeDialog, ctaProps = {}, onCreateSuccess, size }: CreateGroupContentProps) => {
	const { t } = useTranslation("groups", { keyPrefix: "components.groupsPopover.createNewPopover" })

	const [triggerCreateGroupMutation, { isLoading }] = useCreateGroupMutation()

	const onSubmit = async (
		{ groupDescription: description, groupName: name }: GroupSchemaType,
		form: UseFormReturn<GroupSchemaType>
	) => {
		await triggerCreateGroupMutation({ description, name })
			.unwrap()
			.then(({ groupId, groupName }) => {
				if (onCreateSuccess) onCreateSuccess({ label: groupName, value: groupId })

				toast.success(t("createSuccessMessage"))
				closeDialog()
			})
			.catch((error: ErrorObject) => {
				// At this moment, we're only catching one specific error for group name that already exist
				// Can be used to catch other errors later on
				if (error?.data?.statusCode !== 4050300) return

				form.setError("groupName", { message: error.data.message })
			})
	}

	return (
		<GroupForm onSubmit={onSubmit} size={size}>
			<Button
				className='ms-auto w-full shrink-0 px-8 sm:w-max'
				data-form='group-form'
				loading={isLoading}
				type='submit'
				{...ctaProps}>
				Create
			</Button>
		</GroupForm>
	)
}

export default CreateGroupContent
