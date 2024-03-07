//#region Import
import type { BulkListingsFunnelBase } from "@/features/channels/sms-senders-management/components/bulk-listings-funnel/types"

import useGetChannelType from "@/core/hooks/useGetChannelType"
import BulkListingsFunnel from "@/features/channels/sms-senders-management/components/bulk-listings-funnel/bulk-listings-funnel"
import { emptyBulkListingsGroup } from "@/features/channels/sms-senders-management/components/bulk-listings-funnel/bulk-listings-funnel-configs"
import CreateSmsSenderRequestBasicInfo from "@/features/channels/sms-senders-management/components/create-sms-sender-request-basic-info/create-sms-sender-request-basic-info"
import { ExtendedAddBulkSmsListingRequestsBody } from "@/features/channels/sms-senders-management/components/sms-listing-request-create-peview/sms-listing-request-create-peview"
import CreateSmsListingRequestConfirmDialog from "@/features/channels/sms-senders-management/dialogs/create-sms-listing-request-confirm-dialog/create-sms-listing-request-confirm-dialog"
import formatAddBulkSmsListingRequestsBody from "@/features/channels/sms-senders-management/utils/format-add-bulk-sms-listing-requests-body"
import { Button, Footer, Form } from "@/ui"
import SectionHeading from "@/ui/section-heading/section-heading"
import MdiInformationVariantCircle from "~icons/mdi/information-variant-circle"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useLocation } from "react-router-dom"
//#endregion

export type SmsSenderRequestsForm = {
	basicInfo: Record<"company" | "email" | "sender", string>
} & BulkListingsFunnelBase

const CreateSmsSenderRequestView = () => {
	const { state } = useLocation()

	const form = useForm<SmsSenderRequestsForm>({
		defaultValues: {
			basicInfo: {},

			bulkListingsGroups: [emptyBulkListingsGroup],
		},
	})

	const { name, type } = useGetChannelType()

	const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false)

	const [formattedData, setFormattedData] = useState<ExtendedAddBulkSmsListingRequestsBody>()

	const [highlightedErrorRow, setHighlightedErrorRow] = useState<string>()

	useEffect(() => {
		const onErrorListingFormKey = setTimeout(() => {
			if (highlightedErrorRow !== undefined) setHighlightedErrorRow(undefined)
		}, 2000)

		return () => clearTimeout(onErrorListingFormKey)
	}, [highlightedErrorRow])

	const onValidationSuccess = (data: SmsSenderRequestsForm) => {
		const formattedData = formatAddBulkSmsListingRequestsBody(data, type!)

		setFormattedData(formattedData)
		setConfirmDialogOpen(true)
	}

	return (
		<div className='flex h-full w-full flex-col gap-6 overflow-hidden p-6'>
			<header>
				<h3 className='text-xl font-medium'>Create Sender ID request</h3>
			</header>

			<Form {...form}>
				<form className='flex h-full flex-col gap-4 overflow-hidden' onSubmit={form.handleSubmit(onValidationSuccess)}>
					<div className='flex w-full flex-1 flex-col gap-6 overflow-y-auto rounded-xl bg-[#F7F7F7] p-4'>
						<SectionHeading
							description='Fill your sender ID info'
							icon={MdiInformationVariantCircle}
							label='Sender ID Basic Info'
						/>
						<CreateSmsSenderRequestBasicInfo control={form.control as any} />
						<BulkListingsFunnel
							bulkListingsGroups={form.getValues().bulkListingsGroups}
							control={form.control as any}
							highlightedErrorRow={highlightedErrorRow}
						/>
					</div>

					<Footer>
						<Button as='link' to={state?.from || `/admin/channels/${type}-${name}/listing-requests`} variant='outline'>
							Cancel
						</Button>

						<Button type='submit'>Add</Button>

						{confirmDialogOpen && formattedData && (
							<CreateSmsListingRequestConfirmDialog
								data={formattedData}
								open={confirmDialogOpen}
								setHighlightedErrorRow={setHighlightedErrorRow}
								setOpen={setConfirmDialogOpen}
							/>
						)}
					</Footer>
				</form>
			</Form>
		</div>
	)
}

export default CreateSmsSenderRequestView
