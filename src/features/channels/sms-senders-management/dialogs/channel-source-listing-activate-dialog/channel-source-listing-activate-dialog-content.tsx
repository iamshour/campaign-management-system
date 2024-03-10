//#region Import
import type { ChannelSourceListing } from "@/features/channels/common/types/data.types"

import getCountryName from "@/core/utils/get-country-name"
// import { updateChannelSourceRequestAction } from "@/features/channels/sms-senders-management/api"
import { Button } from "@/ui"
import { useDropdownStateContext } from "@/ui/dropdown/dropdown-state-context"
import { useTranslation } from "react-i18next"
//#endregion

export interface ChannelSourceListingActivateDialogContentProps
	extends Pick<ChannelSourceListing, "company" | "country" | "id"> {
	/**
	 * Callback function used to close the dialog
	 */
	closeDialog: () => void
}

const ChannelSourceListingActivateDialogContent = ({
	closeDialog,
	company,
	country,
	// eslint-disable-next-line
	id,
}: ChannelSourceListingActivateDialogContentProps) => {
	const { t } = useTranslation("senders-management", { keyPrefix: "dialogs.smsListingActivate" })

	const { closeDropdown } = useDropdownStateContext()

	// const [triggerUpdateSmsListing, { isLoading }] = updateChannelSourceRequestAction()

	const onSubmit = async () => {
		// await triggerUpdateSmsListing({
		// 	listingId,
		// 	status: "APPROVED",
		// }).unwrap()

		closeDropdown()
		closeDialog()
	}

	return (
		<div className='flex flex-1 flex-col justify-between gap-6 overflow-y-auto p-2'>
			<p className='flex-1'>{t("message", { company, country: getCountryName(country) })}</p>

			<Button className='ms-auto w-max shrink-0 px-10' loading={false} onClick={onSubmit}>
				{t("submit")}
			</Button>
		</div>
	)
}

export default ChannelSourceListingActivateDialogContent
