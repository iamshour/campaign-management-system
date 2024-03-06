import { Form, Textarea, useForm } from "@/ui"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslation } from "react-i18next"

import SmsListingActionReasonSchema, {
	SmsLisintgActionReasonSchemaType,
} from "../schemas/sms-listing-action-reason-schema"

interface ActionReasonFormProps {
	/**
	 * Used to render Submit Button
	 */
	children: React.ReactNode

	/**
	 * Message to be displayed inside Form
	 */
	message: string

	/**
	 * Callback funciton used to return reason
	 */
	onSubmit: (data: SmsLisintgActionReasonSchemaType) => void
}

const ActionReasonForm = ({ children, message, onSubmit }: ActionReasonFormProps) => {
	const { t } = useTranslation("senders-management", { keyPrefix: "components.actionReasonForm" })

	const form = useForm<SmsLisintgActionReasonSchemaType>({
		defaultValues: {
			actionReason: undefined,
		},
		resolver: zodResolver(SmsListingActionReasonSchema),
	})

	return (
		<Form {...form}>
			<form
				className='flex h-full flex-col justify-between gap-8 overflow-hidden p-2'
				onSubmit={form.handleSubmit(onSubmit)}>
				<p className='overflow-y-auto'>{message}</p>

				<Form.Field
					control={form.control}
					name='actionReason'
					render={({ field }) => (
						<Form.Item className='col-span-2'>
							<Form.Label>{t("label")}</Form.Label>
							<Form.Control>
								<Textarea className='h-[100px] rounded-md text-sm' placeholder={t("placeholder")} {...field} />
							</Form.Control>
							<Form.Message />
						</Form.Item>
					)}
				/>

				{children}
			</form>
		</Form>
	)
}

export default ActionReasonForm
