//#region Import
import type { SmsListingType } from "@/features/channels/common/types"

import { useActivateSmsListingMutation } from "@/features/channels/sms-senders/api"
import { Button } from "@/ui"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
//#endregion

export interface ActivateSmsListingDialogContentProps extends Pick<SmsListingType, "listingId"> {
	/**
	 * Callback function used to close the dialog
	 */
	closeDialog: () => void
}

const ActivateSmsListingDialogContent = ({ closeDialog, listingId }: ActivateSmsListingDialogContentProps) => {
	const { t } = useTranslation("sms-senders", { keyPrefix: "dialogs.activateListingDialog" })

	const [triggerActivateSmsListing, { isLoading }] = useActivateSmsListingMutation()

	const activateListing = async () => {
		await triggerActivateSmsListing(listingId).unwrap()

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

export default ActivateSmsListingDialogContent
