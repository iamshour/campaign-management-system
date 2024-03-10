//#region Import
import type { BulkListingsFunnelBase } from "@/features/channels/sms-senders-management/components/bulk-listings-funnel/types"

import useGetChannelType from "@/core/hooks/useGetChannelType"
import BulkListingsFunnel from "@/features/channels/sms-senders-management/components/bulk-listings-funnel/bulk-listings-funnel"
// import { emptyBulkListingsGroup } from "@/features/channels/sms-senders-management/components/bulk-listings-funnel/bulk-listings-funnel-configs"
import CreateSmsSenderRequestBasicInfo, {
	type CreateSmsSenderRequestBasicInfoType,
} from "@/features/channels/sms-senders-management/components/create-sms-sender-request-basic-info"
import CreateSmsListingRequestConfirmDialog from "@/features/channels/sms-senders-management/dialogs/create-sms-listing-request-confirm-dialog/create-sms-listing-request-confirm-dialog"
import formatAddBulkSmsListingRequestsBody from "@/features/channels/sms-senders-management/utils/format-add-bulk-sms-listing-requests-body"
import { Button, Footer, Form } from "@/ui"
import SectionHeading from "@/ui/section-heading/section-heading"
import MdiInformationVariantCircle from "~icons/mdi/information-variant-circle"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useLocation } from "react-router-dom"

import type { SmsListingRequestCreationPreviewData } from "../components/sms-listing-request-creation-preview"

import { emptyBulkListingsGroup } from "../components/bulk-listings-funnel/bulk-listings-funnel-configs"
//#endregion

export type SmsSenderRequestsForm = CreateSmsSenderRequestBasicInfoType & BulkListingsFunnelBase

const CreateSmsSenderRequestView = () => {
	const { state } = useLocation()

	const form = useForm<SmsSenderRequestsForm>({
		defaultValues: {
			basicInfo: {},
			bulkListingsGroups: [emptyBulkListingsGroup],
		},
	})

	const { channelType, channelTypeInUrl } = useGetChannelType()

	const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false)

	const [formattedData, setFormattedData] = useState<SmsListingRequestCreationPreviewData>()

	const onValidationSubmit = (data: SmsSenderRequestsForm) => {
		if (!channelType) return

		const formattedData = formatAddBulkSmsListingRequestsBody(data, channelType)

		setFormattedData(formattedData)
		setConfirmDialogOpen(true)
	}

	return (
		<div className='flex h-full w-full flex-col gap-6 overflow-hidden p-6'>
			<header>
				<h3 className='text-xl font-medium'>Create Sender ID request</h3>
			</header>

			<Form {...form}>
				<form className='flex h-full flex-col gap-4 overflow-hidden' onSubmit={form.handleSubmit(onValidationSubmit)}>
					<div className='flex w-full flex-1 flex-col gap-6 overflow-y-auto rounded-xl bg-[#F7F7F7] p-4'>
						<SectionHeading
							description='Fill your sender info'
							icon={MdiInformationVariantCircle}
							label='Sender ID Basic Info'
						/>
						<CreateSmsSenderRequestBasicInfo control={form.control as any} />
						<BulkListingsFunnel
							bulkListingsGroups={form.getValues().bulkListingsGroups}
							control={form.control as any}
						/>
					</div>

					<Footer>
						<Button
							as='link'
							to={state?.from || `/admin/channels/${channelTypeInUrl}/listing-requests`}
							variant='outline'>
							Cancel
						</Button>

						<Button className='px-10' type='submit'>
							Add
						</Button>
					</Footer>
				</form>

				<CreateSmsListingRequestConfirmDialog
					data={formattedData}
					onOpenChange={setConfirmDialogOpen}
					open={confirmDialogOpen && !!formattedData}
				/>
			</Form>
		</div>
	)
}

export default CreateSmsSenderRequestView

// const exampleValue = {
// 	basicInfo: {
// 		company: { label: "kfc", value: "018dc671-f7d1-7e35-9a04-58764ff4c013" },
// 		email: { label: "Ali", value: "018e1cdf-ee66-7780-b524-bf11973ccd0a" },
// 		sender: "Ali Shour",
// 	},
// 	// bulkListingsGroups: [emptyBulkListingsGroup],
// 	bulkListingsGroups: [
// 		{
// 			listingsFields: [
// 				{
// 					content: "Custom Content here...",
// 					country: "AC",
// 				},
// 			],
// 			type: "OTP",
// 		},
// 	],
// }
