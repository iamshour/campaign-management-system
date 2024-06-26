//#region Import
import IconTooltip from "@/core/components/icon-tooltip/icon-tooltip"
import TextareaPopover from "@/core/components/textarea-popover/textarea-popover"
import ChannelSourceRequestSchema, {
	type ChannelSourceRequestSchemaType,
} from "@/features/channels/common/schemas/channel-source-request-schema"
import SelectSingleTemplateTypePopover from "@/features/templates/common/components/select-single-template-type-popover"
import { Footer, Form, SelectCountryPopover, Textarea, useForm } from "@/ui"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslation } from "react-i18next"

import SenderNameInput from "./sender-name-input"
//#endregion

interface ChannelSourceRequestFormProps {
	children: React.ReactNode

	defaultValues?: Partial<Pick<ChannelSourceRequestSchemaType, "country" | "sender" | "templateType">>
}

const ChannelSourceRequestForm = ({ children, defaultValues }: ChannelSourceRequestFormProps) => {
	const { t } = useTranslation("sms-senders")

	const form = useForm<ChannelSourceRequestSchemaType>({
		defaultValues,
		mode: "onChange",
		resolver: zodResolver(ChannelSourceRequestSchema),
	})

	return (
		<Form {...form}>
			<form className='flex h-full w-full flex-col justify-between overflow-y-auto p-2'>
				<div className='w-full space-y-3 pb-4 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0 sm:pb-8'>
					<Form.Field
						control={form.control}
						name='sender'
						render={({ field }) => (
							<Form.Item label={<SenderNameLable />} size='lg'>
								<SenderNameInput
									{...field}
									onChange={field.onChange}
									readOnly={!!defaultValues?.sender}
									value={field.value}
								/>
							</Form.Item>
						)}
					/>

					<Form.Field
						control={form.control}
						name='templateType'
						render={({ field }) => (
							<Form.Item className='w-full max-w-[340px]' label={t("channels-common:fields.type")} required size='lg'>
								<SelectSingleTemplateTypePopover
									onValueChange={field.onChange}
									readOnly={!!defaultValues?.templateType}
									value={field.value}
								/>
							</Form.Item>
						)}
					/>

					<Form.Field
						control={form.control}
						name='country'
						render={({ field }) => (
							<Form.Item label={t("channels-common:fields.country")} required size='lg'>
								<SelectCountryPopover
									onChange={field.onChange}
									readOnly={!!defaultValues?.country}
									value={field.value}
								/>
							</Form.Item>
						)}
					/>

					<Form.Field
						control={form.control}
						name='note'
						render={({ field }) => (
							<Form.Item label={t("channels-common:fields.note")} size='lg'>
								<TextareaPopover
									onValueChange={field.onChange}
									placeholder={t("components.channelSourceRequestForm.placeholders.note")}
									triggerProps={{ className: "text-base" }}
									value={field.value}
								/>
							</Form.Item>
						)}
					/>

					<Form.Field
						control={form.control}
						name='sampleContent'
						render={({ field }) => (
							<Form.Item className='col-span-2 max-w-full' label={t("channels-common:fields.sampleContent")} required>
								<Textarea
									maxLength={500}
									onChange={field.onChange}
									placeholder={t("components.channelSourceRequestForm.placeholders.sampleContent")}
									rows={3}
									value={field.value}
								/>
							</Form.Item>
						)}
					/>
				</div>

				<Footer>{children}</Footer>
			</form>
		</Form>
	)
}

export default ChannelSourceRequestForm

const SenderNameLable = () => {
	const { t } = useTranslation("channels-common")

	return (
		<>
			{t("fields.sender")} *
			<IconTooltip
				content={t("sms-senders:components.channelSourceRequestForm.senderTooltip")}
				triggerClassName='absolute ms-1 text-xs'
			/>
		</>
	)
}
