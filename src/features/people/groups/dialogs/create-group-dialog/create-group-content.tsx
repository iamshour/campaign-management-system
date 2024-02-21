//#region Import
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"

import type { ErrorObject } from "@/core/lib/redux-toolkit/helpers"
import { useCreateGroupMutation } from "@/features/people/groups/api"
import GroupForm from "@/features/people/groups/components/group-form"
import type { GroupSchemaType } from "@/features/people/groups/schemas/group-schema"
import { Button, type UseFormReturn, type OptionType } from "@/ui"
//#endregion

export interface CreateGroupContentProps {
	/**
	 *  Callback function used to close Popover/Dialog
	 */
	closeDialog: () => void

	/**
	 * Callback function passed only in some components called on successful creation of group, used to return new group data
	 */
	onCreateSuccess?: (newGroupData: OptionType) => void

	/**
	 * Call To Action Button Props (Optional)
	 */
	ctaProps?: React.ComponentPropsWithoutRef<typeof Button>
}

const CreateGroupContent = ({ closeDialog, onCreateSuccess, ctaProps = {} }: CreateGroupContentProps) => {
	const { t } = useTranslation("groups", { keyPrefix: "components.groupsPopover.createNewPopover" })

	const [triggerCreateGroupMutation, { isLoading }] = useCreateGroupMutation()

	const onSubmit = async (
		{ groupName: name, groupDescription: description }: GroupSchemaType,
		form: UseFormReturn<GroupSchemaType>
	) => {
		await triggerCreateGroupMutation({ name, description })
			.unwrap()
			.then(({ groupName, groupId }) => {
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
		<GroupForm onSubmit={onSubmit} size='default'>
			<Button type='submit' loading={isLoading} className='px-8' {...ctaProps}>
				Create
			</Button>
		</GroupForm>
	)
}

export default CreateGroupContent
