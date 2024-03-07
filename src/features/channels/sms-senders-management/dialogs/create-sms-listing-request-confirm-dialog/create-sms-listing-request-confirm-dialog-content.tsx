//#region Import
import useGetChannelType from "@/core/hooks/useGetChannelType"
import { Button, Footer } from "@/ui"
import { lazy, useState } from "react"
import { useFormContext } from "react-hook-form"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

import type { AddBulkSmsListingRequestsBody } from "../../types"

import { useAddBulkSmsListingRequestsMutation } from "../../api"
const SmsListingRequestCreationPreview = lazy(
	() =>
		import(
			"@/features/channels/sms-senders-management/components/sms-listing-request-create-peview/sms-listing-request-create-peview"
		)
)
//#endregion

export interface CreateSmsListingRequestConfirmDialogContentProps
	extends Pick<React.ComponentPropsWithoutRef<typeof SmsListingRequestCreationPreview>, "data"> {
	open: boolean

	setHighlightedErrorRow: React.Dispatch<React.SetStateAction<string | undefined>>

	setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateSmsListingRequestConfirmDialogContent = ({
	data,
	setHighlightedErrorRow,
	setOpen,
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
				// TODO: set errors in form and in state
				setHighlightedErrorRow(`bulkListingsGroups.${1}.listingsFields.${0}`)
				setErrorsIdx([2])
				setError(`bulkListingsGroups.${1}.listingsFields.${0}.country`, {
					message: "Error on country field",
					type: "backend_error",
				})
			})
	}

	return (
		<>
			<SmsListingRequestCreationPreview closeDialog={() => setOpen(false)} data={data} errorsIdx={errorsIdx} />

			<Footer>
				<Button className='px-10' disabled={isLoading} onClick={() => setOpen(false)} variant='outline'>
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
