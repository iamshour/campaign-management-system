//#region Import
import type { AddBulkSmsListingRequestsBody } from "@/features/channels/sms-senders-management/types"

import useGetChannelType from "@/core/hooks/useGetChannelType"
import { useAddBulkSmsListingRequestsMutation } from "@/features/channels/sms-senders-management/api"
import { Button, Footer } from "@/ui"
import { lazy, useState } from "react"
import { useFormContext } from "react-hook-form"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

const SmsListingRequestCreationPreview = lazy(
	() => import("@/features/channels/sms-senders-management/components/sms-listing-request-creation-preview")
)
//#endregion

export interface CreateSmsListingRequestConfirmDialogContentProps
	extends Partial<Pick<React.ComponentPropsWithoutRef<typeof SmsListingRequestCreationPreview>, "data">> {
	/**
	 * Callback function used to close the dialog
	 */
	closeDialog: () => void
}

const CreateSmsListingRequestConfirmDialogContent = ({
	closeDialog,
	data,
}: CreateSmsListingRequestConfirmDialogContentProps) => {
	const { t } = useTranslation("senders-management", { keyPrefix: "dialogs.createSmsListingRequestConfirm" })

	const navigate = useNavigate()

	const { setError } = useFormContext()

	const { channelType } = useGetChannelType()

	const [triggerAddBulkSmsListingRequests, { isLoading }] = useAddBulkSmsListingRequestsMutation()

	const [errorsIdx, setErrorsIdx] = useState<number[]>([])

	const onSubmit = async () => {
		if (!data) return

		const body: AddBulkSmsListingRequestsBody = {
			...data,
			channelSourceRequestRouteList: data.channelSourceRequestRouteList.map((row) => ({
				...row,
				channelSourceListingStatus: undefined,
			})),
		}

		triggerAddBulkSmsListingRequests(body)
			.unwrap()
			.then(() => {
				toast.success("Requests added successfully")

				navigate(`/admin/channels/${channelType}/listing-requests`)
			})
			.catch(() => {
				setErrorsIdx([2])
				setError(`bulkListingsGroups.${1}.listingsFields.${0}.country`, {
					message: "Error on country field",
					type: "backend_error",
				})
			})
	}

	return (
		<>
			{!!data && <SmsListingRequestCreationPreview closeDialog={closeDialog} data={data} errorsIdx={errorsIdx} />}

			<Footer>
				<Button className='px-10' disabled={isLoading} onClick={closeDialog} variant='outline'>
					{t("cancel")}
				</Button>
				<Button className='px-10' disabled={isLoading} loading={isLoading} onClick={onSubmit} type='button'>
					{t("submit")}
				</Button>
			</Footer>
		</>
	)
}

export default CreateSmsListingRequestConfirmDialogContent
