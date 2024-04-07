//#region Import
import type { OptInOptedOutChannelSourceListBody } from "@/features/channels/sms-senders-management/types/api.types"

import { useDataViewContext } from "@/core/components/data-view/data-view-context"
import { clearSelection } from "@/core/components/data-view/data-view-slice"
import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import getSearchFilter from "@/core/utils/get-search-filter"
import { useOptInOptedOutChannelSourceListMutation } from "@/features/channels/sms-senders-management/api"
import { Button } from "@/ui"
import { useDropdownStateContext } from "@/ui/dropdown/dropdown-state-context"
import { cleanObject } from "@/utils"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"
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

	const { channelSourceId } = useParams()

	const { dataViewKey } = useDataViewContext<
		any,
		"international-sms-channel-source-opted-out-list" | "local-sms-channel-source-opted-out-list"
	>()

	const { closeDropdown } = useDropdownStateContext()

	const { filters, searchTerm, selection } = useSelector(({ dataView }) => dataView[dataViewKey])

	const [triggerOptInOptedOutChannelSourceList, { isLoading }] = useOptInOptedOutChannelSourceListMutation()

	const onSubmit = async () => {
		if (!channelSourceId) return

		const body: OptInOptedOutChannelSourceListBody = {
			channelSourceId,
			channelSourceOptOutFilter: filters,
			channelSourceOptOutSearchFilter: getSearchFilter<["recipient"]>(searchTerm, ["recipient"]),
			optedOutIds: id?.length ? [id] : !!selection && selection !== "ALL" ? selection : undefined,
		}

		// Cleaning Body from all undefined/empty/nullish objects/nested objects
		const cleanBody = cleanObject(body)

		await triggerOptInOptedOutChannelSourceList(cleanBody).unwrap()

		// Clearing Selection list if contacts were selected using their Ids
		if (cleanBody?.optedOutIds) dispatch(clearSelection(dataViewKey))

		if (closeDropdown !== undefined) closeDropdown()

		closeDialog()
	}

	return (
		<div className='flex flex-1 flex-col justify-between gap-8 overflow-x-auto p-2'>
			<p>{t("message")}</p>

			<Button className='ms-auto w-full shrink-0 px-10 sm:w-max' loading={isLoading} onClick={onSubmit}>
				{t("submit")}
			</Button>
		</div>
	)
}

export default OptInSmsSenderDialogContent
