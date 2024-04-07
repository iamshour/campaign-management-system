//#region Import
import type { ChannelSourceListing } from "@/features/channels/common/types/data.types"

import { useToggleChannelSourceListingActivationMutation } from "@/features/channels/sms-senders/api"
import { Button } from "@/ui"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
//#endregion

export interface ActivateListingDialogContentProps extends Pick<ChannelSourceListing, "id"> {
	/**
	 * Callback function used to close the dialog
	 */
	closeDialog: () => void
}

const ActivateListingDialogContent = ({ closeDialog, id }: ActivateListingDialogContentProps) => {
	const { t } = useTranslation("sms-senders", { keyPrefix: "dialogs.activateListingDialog" })

	const [triggerToggleChannelSourceListingActivation, { isLoading }] = useToggleChannelSourceListingActivationMutation()

	const activateListing = async () => {
		await triggerToggleChannelSourceListingActivation({ active: true, listingId: id }).unwrap()

		toast.success(t(`message.success`))

		closeDialog()
	}

	return (
		<div className='p-2'>
			<p>{t("text")}</p>
			<Button className='ms-auto mt-8 block px-12' disabled={isLoading} onClick={activateListing} type='button'>
				{t("buttons.confirm")}
			</Button>
		</div>
	)
}

export default ActivateListingDialogContent
