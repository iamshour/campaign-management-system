//#region Import
import type { SmsOptedOutSenderType } from "@/features/channels/sms-senders-management/types"

import { useOptInSmsSendersMutation } from "@/features/channels/sms-senders-management/api"
import { Button } from "@/ui"
import { useDropdownStateContext } from "@/ui/dropdown/dropdown-state-context"
import { useTranslation } from "react-i18next"
//#endregion

export interface OptInSmsSenderDialogContentProps extends Pick<SmsOptedOutSenderType, "id"> {
	/**
	 * Callback function used to close the dialog
	 */
	closeDialog: () => void
}

const OptInSmsSenderDialogContent = ({ closeDialog, id }: OptInSmsSenderDialogContentProps) => {
	const { t } = useTranslation("senders-management", { keyPrefix: "dialogs.smsOptInSender" })

	const { closeDropdown } = useDropdownStateContext()

	const [triggerOptInSmsSender, { isLoading }] = useOptInSmsSendersMutation()

	const onSubmit = async () => {
		// TODO: Send Search Filters as well as Filters from filters bar (using rtk)
		await triggerOptInSmsSender({ id }).unwrap()

		closeDropdown()
		closeDialog()
	}

	return (
		<div className='flex flex-1 flex-col justify-between gap-8 overflow-x-auto p-2'>
			<p>{t("message")}</p>

			<Button className='ms-auto w-max shrink-0 px-10' loading={isLoading} onClick={onSubmit}>
				{t("submit")}
			</Button>
		</div>
	)
}

export default OptInSmsSenderDialogContent
