//#region Import
import useGetChannelType from "@/core/hooks/useGetChannelType"
import BulkListingsFunnel from "@/features/channels/sms-senders-management/components/bulk-listings-funnel/bulk-listings-funnel"
import CreateChannelSourceRequestBasicInfo from "@/features/channels/sms-senders-management/components/create-channel-source-request-basic-info"
import CreateChannelSourceRequestConfirmDialog from "@/features/channels/sms-senders-management/dialogs/create-channel-source-request-confirm-dialog/create-channel-source-request-confirm-dialog"
import formatAddBulkSmsListingRequestsBody from "@/features/channels/sms-senders-management/utils/format-add-bulk-sms-listing-requests-body"
import { Button, Footer, Form } from "@/ui"
import SectionHeading from "@/ui/section-heading/section-heading"
import { ErrorMessage } from "@hookform/error-message"
import { zodResolver } from "@hookform/resolvers/zod"
import MdiInformationVariantCircle from "~icons/mdi/information-variant-circle"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useLocation } from "react-router-dom"

import type { SmsListingRequestCreationPreviewData } from "../components/sms-listing-request-creation-preview"
import type { ChannelSourceRequestBulkSchemaType } from "../schemas/channel-source-request-bulk-schema"

import { emptyBulkListingsGroup } from "../components/bulk-listings-funnel/bulk-listings-funnel-configs"
import ChannelSourceRequestBulkSchema from "../schemas/channel-source-request-bulk-schema"
//#endregion

const CreateChannelSourceRequestRoute = () => {
	const { state } = useLocation()

	const form = useForm<ChannelSourceRequestBulkSchemaType>({
		defaultValues: {
			basicInfo: {},
			bulkListingsGroups: [emptyBulkListingsGroup],
		},
		resolver: zodResolver(ChannelSourceRequestBulkSchema),
	})

	const { channelType, channelTypeInUrl } = useGetChannelType()

	const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false)

	const [formattedData, setFormattedData] = useState<SmsListingRequestCreationPreviewData>()

	const onValidationSubmit = (data: ChannelSourceRequestBulkSchemaType) => {
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
					<div className='flex-1 overflow-hidden rounded-xl bg-[#F7F7F7] p-4'>
						<div className='flex h-full w-full flex-col gap-6 overflow-y-auto'>
							<SectionHeading
								description='Fill your sender info'
								icon={MdiInformationVariantCircle}
								label='Sender ID Basic Info'
							/>

							<CreateChannelSourceRequestBasicInfo control={form.control as any} />

							<BulkListingsFunnel
								bulkListingsGroups={form.getValues().bulkListingsGroups}
								control={form.control as any}
							/>
						</div>
					</div>

					<Footer className='sm:justify-between'>
						<ErrorMessage
							errors={form.formState.errors}
							name='bulkListingsGroups.root'
							render={({ message }) => <p className='-mb-2 pt-2.5 text-base font-medium text-red-500'>{message}</p>}
						/>

						<div className='ms-auto space-x-4'>
							<Button
								as='link'
								to={state?.from || `/admin/channels/${channelTypeInUrl}/listing-requests`}
								variant='outline'>
								Cancel
							</Button>

							<Button className='px-10' type='submit'>
								Add
							</Button>
						</div>
					</Footer>
				</form>

				<CreateChannelSourceRequestConfirmDialog
					data={formattedData}
					onOpenChange={setConfirmDialogOpen}
					open={confirmDialogOpen && !!formattedData}
				/>
			</Form>
		</div>
	)
}

export default CreateChannelSourceRequestRoute

// Used to quickly text above component
// const defaultValues: ChannelSourceRequestBulkSchemaType = {
// 	basicInfo: {
// 		company: { label: "KFC", value: "018dcbb3-d316-7c84-8e34-ee452339c468" },
// 		email: { label: "user@kfc.com", value: "018e1cdf-ee66-7780-b524-bf11973ccd0a" },
// 		sender: "Ali Shour",
// 	},
// 	bulkListingsGroups: [
// 		{
// 			listingsFields: [
// 				{
// 					country: "AC",
// 					sampleContent: "Custom Content here...",
// 				},
// 				{
// 					country: "LB",
// 					sampleContent: "Hey Whatsapp?",
// 				},
// 			],
// 			templateType: "OTP",
// 		},
// 		{
// 			listingsFields: [
// 				{
// 					country: "GF",
// 					sampleContent: "Niceeee",
// 				},
// 				{
// 					country: "AU",
// 					sampleContent: "YOOO",
// 				},
// 				{
// 					country: "AU",
// 					sampleContent: "YOOO",
// 				},
// 				{
// 					country: "AU",
// 					sampleContent: "YOOO",
// 				},
// 				{
// 					country: "AU",
// 					sampleContent: "YOOO",
// 				},
// 				{
// 					country: "AU",
// 					sampleContent: "YOOO",
// 				},
// 				{
// 					country: "AU",
// 					sampleContent: "YOOO",
// 				},
// 				{
// 					country: "AU",
// 					sampleContent: "YOOO",
// 				},
// 				{
// 					country: "AU",
// 					sampleContent: "YOOO",
// 				},
// 				{
// 					country: "AU",
// 					sampleContent: "YOOO",
// 				},
// 				{
// 					country: "AU",
// 					sampleContent: "YOOO",
// 				},
// 				{
// 					country: "AU",
// 					sampleContent: "YOOO",
// 				},
// 				{
// 					country: "AU",
// 					sampleContent: "YOOO",
// 				},
// 				{
// 					country: "AU",
// 					sampleContent: "YOOO",
// 				},
// 				{
// 					country: "AU",
// 					sampleContent: "YOOO",
// 				},
// 				{
// 					country: "AU",
// 					sampleContent: "YOOO",
// 				},
// 				{
// 					country: "AU",
// 					sampleContent: "YOOO",
// 				},
// 				{
// 					country: "AU",
// 					sampleContent: "YOOO",
// 				},
// 				{
// 					country: "AU",
// 					sampleContent: "YOOO",
// 				},
// 				{
// 					country: "AU",
// 					sampleContent: "YOOO",
// 				},
// 			],
// 			templateType: "PROMOTIONAL",
// 		},
// 	],
// }
