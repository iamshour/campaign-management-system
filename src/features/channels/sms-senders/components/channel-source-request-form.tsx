//#region Import
import IconTooltip from "@/core/components/icon-tooltip/icon-tooltip"
import TextareaPopover from "@/core/components/textarea-popover/textarea-popover"
import ChannelSourceRequestSchema, {
	type ChannelSourceRequestSchemaType,
} from "@/features/channels/sms-senders/schemas/channel-source-request-schema"
import SelectSingleTemplateTypePopover from "@/features/templates/common/components/select-single-template-type-popover"
import { Footer, Form, SelectCountryPopover, Textarea, useForm } from "@/ui"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslation } from "react-i18next"

import SenderNameInput from "./sender-name-input"
//#endregion

interface ChannelSourceRequestFormProps {
	children: React.ReactNode

	defaultValues?: Partial<ChannelSourceRequestSchemaType>
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
							<Form.Item>
								<Form.Label className='flex flex-row items-center gap-2'>
									{t("channels-common:fields.sender")} *
									<IconTooltip content={t("components.channelSourceRequestForm.labels.name.iconTooltip")} />
								</Form.Label>
								<Form.Control>
									<SenderNameInput
										{...field}
										onChange={field.onChange}
										readOnly={!!defaultValues?.sender}
										size='lg'
										value={field.value}
									/>
								</Form.Control>
								<Form.Message />
							</Form.Item>
						)}
					/>

					<Form.Field
						control={form.control}
						name='templateType'
						render={({ field }) => (
							<Form.Item className='w-full max-w-[340px]'>
								<Form.Control>
									<SelectSingleTemplateTypePopover
										onValueChange={field.onChange}
										readOnly={!!defaultValues?.templateType}
										required
										size='lg'
										value={field.value}
									/>
								</Form.Control>
								<Form.Message />
							</Form.Item>
						)}
					/>

					<Form.Field
						control={form.control}
						name='country'
						render={({ field }) => (
							<Form.Item>
								<Form.Label>{t("channels-common:fields.country")} *</Form.Label>
								<Form.Control>
									<SelectCountryPopover
										className='[&>*]:text-base [&>*]:font-normal'
										onChange={field.onChange}
										readOnly={!!defaultValues?.country}
										size='lg'
										value={field.value}
									/>
								</Form.Control>
								<Form.Message />
							</Form.Item>
						)}
					/>

					<Form.Field
						control={form.control}
						name='note'
						render={({ field }) => (
							<Form.Item>
								<Form.Label>{t("channels-common:fields.note")}</Form.Label>
								<Form.Control>
									<TextareaPopover
										onValueChange={field.onChange}
										placeholder={t("components.channelSourceRequestForm.placeholders.note")}
										size='lg'
										triggerProps={{ className: "text-base" }}
										value={field.value}
									/>
								</Form.Control>
								<Form.Message />
							</Form.Item>
						)}
					/>

					<Form.Field
						control={form.control}
						name='sampleContent'
						render={({ field }) => (
							<Form.Item className='col-span-2'>
								<Form.Label>{t("channels-common:fields.sampleContent")} *</Form.Label>
								<Form.Control>
									<Textarea
										maxLength={500}
										onChange={field.onChange}
										placeholder={t("components.channelSourceRequestForm.placeholders.sampleContent")}
										rows={3}
										value={field.value}
									/>
								</Form.Control>
								<Form.Message />
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
