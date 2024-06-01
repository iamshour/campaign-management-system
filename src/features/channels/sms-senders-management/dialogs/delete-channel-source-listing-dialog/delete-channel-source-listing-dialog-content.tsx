//#region Import
import type { ChannelSourceListing } from "@/features/channels/common/types/data.types"

import getCountryName from "@/core/utils/get-country-name"
import { useDeleteChannelSourceListingMutation } from "@/features/channels/sms-senders-management/api"
import { Button } from "@/ui"
import { useDropdownStateContext } from "@/ui/dropdown/dropdown-state-context"
import toast from "react-hot-toast"
import { Trans, useTranslation } from "react-i18next"
//#endregion

export interface DeleteChannelSourceListingDialogContentProps
	extends Pick<ChannelSourceListing, "company" | "country" | "id"> {
	/**
	 * Callback function used to close the dialog
	 */
	closeDialog: () => void

	/**
	 * Channel Source Id, to be deleted
	 */
	id: string
}

const DeleteChannelSourceListingDialogContent = ({
	closeDialog,
	company,
	country,
	id,
}: DeleteChannelSourceListingDialogContentProps) => {
	const { t } = useTranslation("senders-management", { keyPrefix: "dialogs.deleteChannelSourceListing" })

	const { closeDropdown } = useDropdownStateContext()

	const [triggerDeleteChannelSource, { isLoading }] = useDeleteChannelSourceListingMutation()

	const onSubmit = async () => {
		await triggerDeleteChannelSource(id).unwrap()

		toast.success(t("successToast"))

		closeDialog()
		closeDropdown()
	}

	return (
		<div className='flex flex-1 flex-col justify-between gap-6 overflow-y-auto p-2'>
			<p>
				<Trans
					i18nKey='senders-management:dialogs.deleteChannelSourceListing.message'
					values={{ company: company.name, country: getCountryName(country) }}
				/>
			</p>

			<Button className='ms-auto w-full shrink-0 px-10 sm:w-max' loading={isLoading} onClick={onSubmit}>
				{t("submit")}
			</Button>
		</div>
	)
}

export default DeleteChannelSourceListingDialogContent
