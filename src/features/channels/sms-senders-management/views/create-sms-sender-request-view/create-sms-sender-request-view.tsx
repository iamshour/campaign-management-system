//#region Import
import type { BulkListingsFunnelBase } from "@/features/channels/sms-senders-management/components/bulk-listings-funnel/types"

import getChannelType from "@/core/utils/get-channel-type"
import BulkListingsFunnel from "@/features/channels/sms-senders-management/components/bulk-listings-funnel/bulk-listings-funnel"
import { emptyBulkListingsGroup } from "@/features/channels/sms-senders-management/components/bulk-listings-funnel/bulk-listings-funnel-configs"
import { Button, Footer, Form } from "@/ui"
import SectionHeading from "@/ui/section-heading/section-heading"
import MdiInformationVariantCircle from "~icons/mdi/information-variant-circle"
import { type SubmitHandler, useForm } from "react-hook-form"
import { useLocation } from "react-router-dom"

import CreateSmsSenderRequestBasicInfo from "./create-sms-sender-request-basic-info"
//#endregion

export type SmsSenderRequestsForm = {
	basicInfo: Record<"email" | "name" | "sender", string>
} & BulkListingsFunnelBase

interface CreateSmsSenderRequestViewProps {
	onSubmit: SubmitHandler<SmsSenderRequestsForm>
}

const CreateSmsSenderRequestView = ({ onSubmit }: CreateSmsSenderRequestViewProps) => {
	const { pathname, state } = useLocation()

	const form = useForm<SmsSenderRequestsForm>({
		defaultValues: {
			basicInfo: {},

			bulkListingsGroups: [emptyBulkListingsGroup],
		},
	})

	const channel = getChannelType(pathname)

	return (
		<div className='flex h-full w-full flex-col gap-6 overflow-hidden p-6'>
			<header>
				<h3 className='text-xl font-medium'>Create Sender ID request</h3>
			</header>

			<Form {...form}>
				<form className='flex h-full flex-col gap-4 overflow-hidden' onSubmit={form.handleSubmit(onSubmit)}>
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
						/>
					</div>

					<Footer>
						<Button
							as='link'
							to={state?.from || `/admin/channels/${channel?.type}-${channel?.name}/listing-requests`}
							variant='outline'>
							Cancel
						</Button>
						<Button type='submit'>Add</Button>
					</Footer>
				</form>
			</Form>
		</div>
	)
}

export default CreateSmsSenderRequestView
