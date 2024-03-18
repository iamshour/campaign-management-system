//#region Import
import type { AddBulkChannelSourceRequestsBody } from "@/features/channels/sms-senders-management/types/api.types"

import useGetChannelType from "@/core/hooks/useGetChannelType"
import formatAddBulkSmsListingRequestsBody from "@/features/channels/sms-senders-management/utils/format-add-bulk-sms-listing-requests-body"
import SenderNameInput from "@/features/channels/sms-senders/components/sender-name-input"
import { Button, Footer, Form, SectionHeading, useForm } from "@/ui"
import { ErrorMessage } from "@hookform/error-message"
import { zodResolver } from "@hookform/resolvers/zod"
import MdiInformationVariantCircle from "~icons/mdi/information-variant-circle"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useLocation } from "react-router-dom"
import * as z from "zod"

import type { BulkPreviewData } from "./types"

import BulkRequestsCreationConfirmDialog from "../../dialogs/bulk-requests-creation-confirm-dialog/bulk-requests-creation-confirm-dialog"
import SelectCompanyPopover from "../select-company-popover/select-company-popover"
import SelectCompanyUsersPopover from "../select-company-users-popover/select-company-users-popover"
import { BulkRequestsFormContext } from "./bulk-requests-form-context"
import BulkRequestsFormFunnel from "./bulk-requests-form-funnel"
import {
	type BulkFunnelKey,
	bulkRequestsFormSchema,
	type BulkRequestsFormSchemaType,
	defaultEmptyField,
	fieldsToRender,
} from "./configs"
//#endregion

export interface BulkRequestsFormProps {
	funnelKey: BulkFunnelKey

	onSubmit: <T extends AddBulkChannelSourceRequestsBody>(payloadData: T) => Promise<T>
}

const BulkRequestsForm = ({ funnelKey, onSubmit }: BulkRequestsFormProps) => {
	const { t } = useTranslation("channels-common")

	const { state } = useLocation()

	const { channelType } = useGetChannelType()

	const form = useForm<z.infer<BulkRequestsFormSchemaType>>({
		defaultValues: {
			basicInfo: {},
			bulkListingsGroups: [{ listingsFields: [defaultEmptyField[funnelKey]] }],
		},
		resolver: zodResolver(bulkRequestsFormSchema[funnelKey]),
	})

	const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false)

	const [formattedData, setFormattedData] = useState<BulkPreviewData>()

	const onValidationSubmit = (data: z.infer<BulkRequestsFormSchemaType>) => {
		if (!channelType) return

		const formattedData = formatAddBulkSmsListingRequestsBody(data, channelType)

		setFormattedData(formattedData)
		setConfirmDialogOpen(true)
	}

	const selectedCompanyId = form.getValues("basicInfo.company")?.value

	return (
		<BulkRequestsFormContext.Provider value={{ funnelKey }}>
			<Form {...form}>
				<form className='flex h-full flex-col gap-4 overflow-hidden' onSubmit={form.handleSubmit(onValidationSubmit)}>
					<div className='flex-1 overflow-hidden rounded-xl bg-[#F7F7F7] p-4'>
						<div className='flex h-full w-full flex-col gap-6 overflow-y-auto'>
							<SectionHeading
								description='Fill your sender info'
								icon={MdiInformationVariantCircle}
								label='Sender ID Basic Info'
							/>

							<div className='flex w-full flex-wrap items-start gap-4'>
								<Form.Field
									control={form.control}
									name='basicInfo.company'
									render={({ field }) => (
										<Form.Item label={t("senders-management:components.companyPopover.label")} required size='lg'>
											<SelectCompanyPopover
												selection={field.value}
												updateSelection={(option) => {
													field.onChange(option)
													// Clearing User Email when changing
													form.setValue("basicInfo.email", { label: "", value: "" })
												}}
											/>
										</Form.Item>
									)}
								/>

								{fieldsToRender[funnelKey]?.basic?.includes("email") && (
									<Form.Field
										control={form.control}
										name='basicInfo.email'
										render={({ field }) => (
											<Form.Item label={"senders-management:components.companyUsersPopover.label"} required size='lg'>
												<SelectCompanyUsersPopover
													companyId={selectedCompanyId}
													disabled={!selectedCompanyId}
													selection={field.value}
													updateSelection={field.onChange}
												/>
											</Form.Item>
										)}
									/>
								)}

								{fieldsToRender[funnelKey]?.basic?.includes("sender") && (
									<Form.Field
										control={form.control}
										name='basicInfo.sender'
										render={({ field }) => (
											<Form.Item label={t("fields.sender")} required>
												<SenderNameInput name='sender' onChange={field.onChange} value={field.value} variant='light' />
											</Form.Item>
										)}
									/>
								)}
							</div>

							<BulkRequestsFormFunnel bulkListingsGroups={form.getValues().bulkListingsGroups} control={form.control} />
						</div>
					</div>

					<Footer className='sm:justify-between'>
						<ErrorMessage
							errors={form.formState.errors}
							name='bulkListingsGroups.root'
							render={({ message }) => <p className='-mb-2 pt-2.5 text-base font-medium text-red-500'>{message}</p>}
						/>

						<div className='ms-auto space-x-4'>
							<Button as='link' to={state?.from} variant='outline'>
								Cancel
							</Button>

							<Button className='px-10' type='submit'>
								Add
							</Button>
						</div>
					</Footer>
				</form>

				<BulkRequestsCreationConfirmDialog
					data={formattedData}
					onOpenChange={setConfirmDialogOpen}
					onSubmit={onSubmit}
					open={confirmDialogOpen && !!formattedData}
				/>
			</Form>
		</BulkRequestsFormContext.Provider>
	)
}

export default BulkRequestsForm
