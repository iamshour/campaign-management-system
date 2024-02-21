//#region Import
import { useState } from "react"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"

import { useDeleteGroupMutation, useMoveContactsToGroupMutation } from "@/features/people/groups/api"
import SelectGroupsPopover from "@/features/people/groups/components/select-groups-popover"
import type { MoveContactsToGroupBody } from "@/features/people/groups/types"
import { BackButton, Button, Footer, type OptionType } from "@/ui"
import { useDropdownStateContext } from "@/ui/dropdown/dropdown-state-context"
import { useStep } from "@/utils"
//#endregion

export interface DeleteGroupDialogContentProps {
	/**
	 * Group Id For the group we want to delete
	 */
	groupId: string

	/**
	 * Callback function used to close the dialog
	 */
	closeDialog: () => void
}

const DeleteGroupDialogContent = ({ groupId, closeDialog }: DeleteGroupDialogContentProps) => {
	const { t } = useTranslation("groups", { keyPrefix: "dialogs.delete-group" })
	const [triggerDeleteGroup, { isLoading: isDeleteLoading }] = useDeleteGroupMutation()
	const [triggerMoveContactsToGroup, { isLoading: isMoveLoading }] = useMoveContactsToGroupMutation()

	const { closeDropdown } = useDropdownStateContext()

	const [currentStep, { goToNextStep, goToPrevStep, canGoToNextStep, canGoToPrevStep }] = useStep(2)

	const [selectedGroupToMoveTo, setSelectedGroupToMoveTo] = useState<OptionType>()

	const onSuccess = (message: string) => {
		toast.success(t(message))
		closeDialog()
		closeDropdown()
	}

	const handleDelete = async () => {
		if (currentStep === 1) {
			await triggerDeleteGroup(groupId)
				.unwrap()
				.then(() => onSuccess("successMessage"))
		}

		if (currentStep === 2 && selectedGroupToMoveTo?.value) {
			const body: MoveContactsToGroupBody = {
				fromGroupId: groupId,
				toGroupId: selectedGroupToMoveTo?.value,
				moveAndDelete: true,
			}
			await triggerMoveContactsToGroup(body)
				.unwrap()
				.then(() => onSuccess("successMessage"))
		}
	}

	return (
		<div className='flex flex-1 flex-col justify-evenly gap-6 p-2 sm:justify-between'>
			{canGoToPrevStep && <BackButton className='absolute start-1.5 top-2' onClick={goToPrevStep} />}

			{currentStep === 1 ? (
				<p>{t("message")}</p>
			) : (
				<SelectGroupsPopover
					size='lg'
					className='!w-full !max-w-full'
					isMulti={false}
					selection={selectedGroupToMoveTo}
					updateSelection={setSelectedGroupToMoveTo}
				/>
			)}

			<Footer>
				{currentStep === 1 && (
					<Button variant='outline' className='sm:w-[144px]' onClick={goToNextStep} disabled={!canGoToNextStep}>
						{t("actions.move")}
					</Button>
				)}

				<Button
					onClick={handleDelete}
					disabled={currentStep === 2 && !selectedGroupToMoveTo}
					loading={isDeleteLoading || isMoveLoading}
					className='sm:w-[144px]'>
					{currentStep === 1 ? t("actions.delete") : t("actions.move-with-delete")}
				</Button>
			</Footer>
		</div>
	)
}

export default DeleteGroupDialogContent
