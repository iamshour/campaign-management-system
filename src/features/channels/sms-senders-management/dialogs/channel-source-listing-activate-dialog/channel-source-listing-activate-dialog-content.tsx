//#region Import
import type { ChannelSourceListing } from "@/features/channels/common/types/data.types"

import getCountryName from "@/core/utils/get-country-name"
import { useUpdateChannelSourceListingStatusMutation } from "@/features/channels/sms-senders-management/api"
import { Button } from "@/ui"
import { useDropdownStateContext } from "@/ui/dropdown/dropdown-state-context"
import toast from "react-hot-toast"
import { Trans, useTranslation } from "react-i18next"
//#endregion

export interface ChannelSourceListingActivateDialogContentProps extends Pick<ChannelSourceListing, "country" | "id"> {
	/**
	 * Callback function used to close the dialog
	 */
	closeDialog: () => void
}

const ChannelSourceListingActivateDialogContent = ({
	closeDialog,
	country,
	id,
}: ChannelSourceListingActivateDialogContentProps) => {
	const { t } = useTranslation("senders-management", { keyPrefix: "dialogs.channelSourceListingActivate" })

	const { closeDropdown } = useDropdownStateContext()

	const [triggerUpdateChannelSourceListingStatus, { isLoading }] = useUpdateChannelSourceListingStatusMutation()

	const onSubmit = async () => {
		await triggerUpdateChannelSourceListingStatus({
			channelSourceListingId: id,
			channelSourceListingStatus: "APPROVED",
		}).unwrap()

		toast.success(t("successToast"))

		closeDropdown()
		closeDialog()
	}

	return (
		<div className='flex flex-1 flex-col justify-between gap-6 overflow-y-auto p-2'>
			<p>
				<Trans
					i18nKey='senders-management:dialogs.channelSourceListingActivate.message'
					values={{ country: getCountryName(country) }}
				/>
			</p>

			<Button className='ms-auto w-full shrink-0 px-10 sm:w-max' loading={isLoading} onClick={onSubmit}>
				{t("submit")}
			</Button>
		</div>
	)
}

export default ChannelSourceListingActivateDialogContent
