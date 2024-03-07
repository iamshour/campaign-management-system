//#region Import
import useGetChannelType from "@/core/hooks/useGetChannelType"
import { Button, Footer } from "@/ui"
import { lazy, useState } from "react"
import { useFormContext } from "react-hook-form"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

import type { AddBulkSmsListingRequestsBody } from "../../types"

import { useAddBulkSmsListingsMutation } from "../../api"
const SmsListingRequestCreationPreview = lazy(
	() =>
		import(
			"@/features/channels/sms-senders-management/components/sms-listing-request-create-peview/sms-listing-request-create-peview"
		)
)
//#endregion

export interface CreateSmsListingConfirmDialogContentProps
	extends Pick<React.ComponentPropsWithoutRef<typeof SmsListingRequestCreationPreview>, "data"> {
	open: boolean

	setHighlightedErrorRow: React.Dispatch<React.SetStateAction<string | undefined>>

	setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateSmsListingConfirmDialogContent = ({
	data,
	setHighlightedErrorRow,
	setOpen,
}: CreateSmsListingConfirmDialogContentProps) => {
	const { t } = useTranslation("senders-management", { keyPrefix: "dialogs.createSmsListingConfirm" })

	const navigate = useNavigate()

	const { setError } = useFormContext()

	const { channelType } = useGetChannelType()

	const [triggerAddBulkSmsListings, { isLoading }] = useAddBulkSmsListingsMutation()

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

		triggerAddBulkSmsListings(body)
			.unwrap()
			.then(() => {
				toast.success("Requests added successfully")

				// TODO: update below url to include sender id (/admin/channels/international-sms/senders/65ddd387c204f09220f1b518)
				navigate(`/admin/channels/${channelType}/senders`)
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

export default CreateSmsListingConfirmDialogContent
