//#region Import
import type { SmsListingType } from "@/features/channels/common/types"

import getCountryName from "@/core/utils/get-country-name"
import { useUpdateSmsListingStatusMutation } from "@/features/channels/sms-senders-management/api"
import { Button } from "@/ui"
import { useDropdownStateContext } from "@/ui/dropdown/dropdown-state-context"
import { useTranslation } from "react-i18next"
//#endregion

export interface SmsListingActivateDialogContentProps
	extends Pick<SmsListingType, "company" | "country" | "listingId"> {
	/**
	 * Callback function used to close the dialog
	 */
	closeDialog: () => void
}

const SmsListingActivateDialogContent = ({
	closeDialog,
	company,
	country,
	listingId,
}: SmsListingActivateDialogContentProps) => {
	const { t } = useTranslation("senders-management", { keyPrefix: "dialogs.smsListingActivate" })

	const { closeDropdown } = useDropdownStateContext()

	const [triggerUpdateSmsListing, { isLoading }] = useUpdateSmsListingStatusMutation()

	const onSubmit = async () => {
		await triggerUpdateSmsListing({
			listingId,
			status: "APPROVED",
		}).unwrap()

		closeDropdown()
		closeDialog()
	}

	return (
		<div className='flex flex-1 flex-col justify-between gap-6 overflow-y-auto p-2'>
			<p className='flex-1'>{t("message", { company, country: getCountryName(country) })}</p>

			<Button className='ms-auto w-max shrink-0 px-10' loading={isLoading} onClick={onSubmit}>
				{t("submit")}
			</Button>
		</div>
	)
}

export default SmsListingActivateDialogContent
