//#region Import
import type { ListingError } from "@/features/channels/sms-senders-management/components/sms-listing-request-creation-preview"
import type { AddBulkSmsListingRequestsBody } from "@/features/channels/sms-senders-management/types"

import useGetChannelType from "@/core/hooks/useGetChannelType"
import { useAddBulkSmsListingRequestsMutation } from "@/features/channels/sms-senders-management/api"
import { Button, Footer } from "@/ui"
import { lazy, useState } from "react"
import { useFormContext } from "react-hook-form"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

import getBulkCreationErrorsList from "../../utils/get-bulk-creation-errors-list"

const SmsListingRequestCreationPreview = lazy(
	() => import("@/features/channels/sms-senders-management/components/sms-listing-request-creation-preview")
)
//#endregion

export interface CreateChannelSourceRequestConfirmDialogContentProps
	extends Partial<Pick<React.ComponentPropsWithoutRef<typeof SmsListingRequestCreationPreview>, "data">> {
	/**
	 * Callback function used to close the dialog
	 */
	closeDialog: () => void
}

const CreateChannelSourceRequestConfirmDialogContent = ({
	closeDialog,
	data,
}: CreateChannelSourceRequestConfirmDialogContentProps) => {
	const { t } = useTranslation("senders-management", { keyPrefix: "dialogs.createSmsListingRequestConfirm" })

	const navigate = useNavigate()

	const { setError } = useFormContext()

	const { channelTypeInUrl } = useGetChannelType()

	const [triggerAddBulkSmsListingRequests, { isLoading }] = useAddBulkSmsListingRequestsMutation()

	const [errors, setErrors] = useState<ListingError[]>([])

	const onSubmit = async () => {
		if (!data) return

		const body: AddBulkSmsListingRequestsBody = {
			...data,
			channelSourceRequestRouteList: data.channelSourceRequestRouteList.map((row) => ({
				...row,
				errorKey: undefined,
			})),
		}

		await triggerAddBulkSmsListingRequests(body)
			.unwrap()
			.then(() => {
				toast.success("Requests added successfully")

				navigate(`/admin/channels/${channelTypeInUrl}/listing-requests`)
			})
			.catch((error) => {
				if (error?.data?.statusCode === 4011303 && error?.data?.data !== undefined) {
					const errors = getBulkCreationErrorsList({ data, errorsData: error?.data?.data, setError })

					setErrors(errors)
				}
			})
	}

	return (
		<>
			{!!data && <SmsListingRequestCreationPreview closeDialog={closeDialog} data={data} errors={errors} />}

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

export default CreateChannelSourceRequestConfirmDialogContent
