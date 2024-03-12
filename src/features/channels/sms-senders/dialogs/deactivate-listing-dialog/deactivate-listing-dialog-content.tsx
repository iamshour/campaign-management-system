//#region Import
import type { ChannelSourceListing } from "@/features/channels/common/types/data.types"

import { useToggleChannelSourceListingActivationMutation } from "@/features/channels/sms-senders/api"
import { Button } from "@/ui"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
//#endregion

export interface DeactivateListingDialogContentProps extends Pick<ChannelSourceListing, "id"> {
	/**
	 * Callback function used to close the dialog
	 */
	closeDialog: () => void
}

const DeactivateListingDialogContent = ({ closeDialog, id }: DeactivateListingDialogContentProps) => {
	const { t } = useTranslation("sms-senders", { keyPrefix: "dialogs.deactivateListingDialog" })

	const [triggerToggleChannelSourceListingActivation, { isLoading }] = useToggleChannelSourceListingActivationMutation()

	const deactivateListing = async () => {
		await triggerToggleChannelSourceListingActivation({ active: false, listingId: id }).unwrap()

		toast.success(t(`message.success`))

		closeDialog()
	}

	return (
		<div className='p-2'>
			<p>{t("text")}</p>
			<Button className='ms-auto mt-8 block px-12' disabled={isLoading} onClick={deactivateListing} type='button'>
				{t("buttons.confirm")}
			</Button>
		</div>
	)
}

export default DeactivateListingDialogContent
