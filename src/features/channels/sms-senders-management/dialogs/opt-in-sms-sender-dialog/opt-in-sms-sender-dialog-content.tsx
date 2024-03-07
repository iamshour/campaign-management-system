//#region Import
import type { OptInSmsSendersBody } from "@/features/channels/sms-senders-management/types"

import { useDataViewContext } from "@/core/components/data-view/data-view-context"
import { clearSelection } from "@/core/components/data-view/data-view-slice"
import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import { useOptInSmsSendersMutation } from "@/features/channels/sms-senders-management/api"
import { Button } from "@/ui"
import { useDropdownStateContext } from "@/ui/dropdown/dropdown-state-context"
import { cleanObject } from "@/utils"
import { useTranslation } from "react-i18next"
//#endregion

export interface OptInSmsSenderDialogContentProps {
	/**
	 * Callback function used to close the dialog
	 */
	closeDialog: () => void

	/**
	 * Sender Id, optional in case of opting multiple selections
	 */
	id?: string
}

const OptInSmsSenderDialogContent = ({ closeDialog, id }: OptInSmsSenderDialogContentProps) => {
	const { t } = useTranslation("senders-management", { keyPrefix: "dialogs.smsOptInSender" })

	const dispatch = useDispatch()

	const { dataViewKey } = useDataViewContext()

	const { closeDropdown } = useDropdownStateContext()

	// Send Filters as part of Payload
	const {
		// filters, searchTerm,
		selection,
	} = useSelector(({ dataView }) => dataView[dataViewKey])

	const [triggerOptInSmsSender, { isLoading }] = useOptInSmsSendersMutation()

	const onSubmit = async () => {
		const body: OptInSmsSendersBody = {
			ids: id?.length ? [id] : !!selection && selection !== "ALL" ? selection : undefined,
			// TODO: Send Search Filters as well as Filters from filters bar (using rtk)
		}

		// Cleaning Body from all undefined/empty/nullish objects/nested objects
		const cleanBody = cleanObject(body)

		await triggerOptInSmsSender(body).unwrap()

		// Clearing Selection list if contacts were selected using their Ids
		if (cleanBody?.ids) dispatch(clearSelection(dataViewKey))

		if (closeDropdown !== undefined) closeDropdown()

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
