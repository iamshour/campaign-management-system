//#region Import
import { useUpdateSmsListingStatusMutation } from "@/features/channels/sms-senders-management/api"
import { Button, Form, Textarea, useForm } from "@/ui"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslation } from "react-i18next"

import SmsListingActionReasonSchema, {
	type SmsLisintgActionReasonSchemaType,
} from "../../schemas/sms-listing-action-reason-schema"
//#endregion

export interface ListingRequestRejectDialogContentProps {
	/**
	 * Callback function used to close the dialog
	 */
	closeDialog: () => void

	/**
	 * Listing request Id
	 */
	id: string

	/**
	 * Boolean used to check if request would only be rejected, or would also be blocked as well
	 */
	withBlock?: boolean
}

const ListingRequestRejectDialogContent = ({ closeDialog, id, withBlock }: ListingRequestRejectDialogContentProps) => {
	const { t } = useTranslation("senders-management", {
		keyPrefix: withBlock ? "dialogs.listingRequestRejectAndBlock" : "dialogs.listingRequestReject",
	})

	const form = useForm<SmsLisintgActionReasonSchemaType>({
		defaultValues: {
			actionReason: undefined,
		},
		resolver: zodResolver(SmsListingActionReasonSchema),
	})

	const [triggerUpdateSmsListing, { isLoading }] = useUpdateSmsListingStatusMutation()

	const onSubmit = async ({ actionReason }: SmsLisintgActionReasonSchemaType) => {
		await triggerUpdateSmsListing({
			actionReason,
			requestAction: withBlock ? "REJECTED_BLOCKED" : "REJECTED",
			requestId: id,
		}).unwrap()

		closeDialog()
	}

	return (
		<Form {...form}>
			<form className='flex h-full flex-col justify-between gap-8 p-2' onSubmit={form.handleSubmit(onSubmit)}>
				<p>{t("message")}</p>

				<Form.Field
					control={form.control}
					name='actionReason'
					render={({ field }) => (
						<Form.Item className='col-span-2'>
							<Form.Label>{t("textarea.label")}</Form.Label>
							<Form.Control>
								<Textarea className='h-[100px] rounded-md text-sm' placeholder={t("textarea.placeholder")} {...field} />
							</Form.Control>
							<Form.Message />
						</Form.Item>
					)}
				/>

				<Button className='ms-auto w-max px-10' loading={isLoading} type='submit'>
					{t("submit")}
				</Button>
			</form>
		</Form>
	)
}

export default ListingRequestRejectDialogContent
