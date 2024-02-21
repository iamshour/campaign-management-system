//#region Import
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"

import type { ErrorObject } from "@/core/lib/redux-toolkit/helpers"
import { useEditGroupMutation } from "@/features/people/groups/api"
import GroupForm from "@/features/people/groups/components/group-form"
import type { GroupSchemaType } from "@/features/people/groups/schemas/group-schema"
import type { Group } from "@/features/people/groups/types"
import { Button, type UseFormReturn } from "@/ui"
import { useDropdownStateContext } from "@/ui/dropdown/dropdown-state-context"
//#endregion

export interface EditGroupContentProps extends Pick<Group, "groupId" | "groupName" | "description"> {
	/**
	 *  Callback function used to close popover/Dialog
	 */
	closeDialog: () => void
}

const EditGroupContent = ({ closeDialog, groupId, ...defaultValues }: EditGroupContentProps) => {
	const { t } = useTranslation("groups", { keyPrefix: "components.groupsPopover.createNewPopover" })

	const { closeDropdown } = useDropdownStateContext()

	const [triggerEditGroupMutation, { isLoading }] = useEditGroupMutation()

	const onSubmit = async (data: GroupSchemaType, form: UseFormReturn<GroupSchemaType>) => {
		await triggerEditGroupMutation({ groupId, name: data?.groupName, description: data?.groupDescription })
			.unwrap()
			.then(() => {
				toast.success(t("editSuccessMessage"))

				closeDialog()
				closeDropdown()
			})
			.catch((error: ErrorObject) => {
				// At this moment, we're only catching one specific error for group name that already exist
				// Can be used to catch other errors later on
				if (error?.data?.statusCode !== 4050300) return
				form.setError("groupName", { message: error.data.message })
			})
	}

	return (
		<GroupForm onSubmit={onSubmit} size='default' defaultValues={defaultValues}>
			<Button type='submit' loading={isLoading} className='px-8'>
				Save
			</Button>
		</GroupForm>
	)
}

export default EditGroupContent
