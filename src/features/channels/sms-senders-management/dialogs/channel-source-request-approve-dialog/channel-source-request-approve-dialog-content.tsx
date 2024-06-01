//#region Import
import type { ChannelSourceRequest } from "@/features/channels/sms-senders-management/types/data.types"

import getCountryName from "@/core/utils/get-country-name"
import { useUpdateChannelSourceRequestActionMutation } from "@/features/channels/sms-senders-management/api"
import { Button } from "@/ui"
import toast from "react-hot-toast"
import { Trans, useTranslation } from "react-i18next"
//#endregion

export interface ChannelSourceRequestApproveDialogContentProps
	extends Pick<ChannelSourceRequest, "channelSourceName" | "channelSourceRequestId" | "country"> {
	/**
	 * Callback function used to close the dialog
	 */
	closeDialog: () => void
}

const ChannelSourceRequestApproveDialogContent = ({
	channelSourceName,
	channelSourceRequestId,
	closeDialog,
	country,
}: ChannelSourceRequestApproveDialogContentProps) => {
	const { t } = useTranslation("senders-management", { keyPrefix: "dialogs.channelSourceRequestApprove" })

	const [triggerUpdateChannelSourceRequestAction, { isLoading }] = useUpdateChannelSourceRequestActionMutation()

	const handleSubmit = async () => {
		await triggerUpdateChannelSourceRequestAction({ action: "APPROVE", channelSourceRequestId }).unwrap()

		toast.success(t("successToast"))

		closeDialog()
	}

	return (
		<div className='flex flex-1 flex-col justify-between gap-8 overflow-y-auto p-2'>
			<p>
				<Trans
					i18nKey={`senders-management:dialogs.channelSourceRequestApprove.message`}
					values={{ country: getCountryName(country), name: channelSourceName }}
				/>
			</p>

			<Button className='ms-auto w-full shrink-0 px-10 sm:w-max' loading={isLoading} onClick={handleSubmit}>
				{t("submit")}
			</Button>
		</div>
	)
}

export default ChannelSourceRequestApproveDialogContent
