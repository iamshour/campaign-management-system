//#region Import
import IconTooltip from "@/core/components/icon-tooltip/icon-tooltip"
import TextareaPopover from "@/core/components/textarea-popover/textarea-popover"
import SmsSenderRequestSchema, {
	type SmsSenderRequestSchemaType,
} from "@/features/channels/sms-senders/schemas/sms-sender-request-schema"
import SelectSingleTemplateType from "@/features/templates/common/components/select-single-template-type"
import { Footer, Form, SelectCountryPopover, Textarea, useForm } from "@/ui"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslation } from "react-i18next"

import SenderNameInput from "./sender-name-input"
//#endregion

interface SmsSenderRequestFormProps {
	children: React.ReactNode

	defaultValues?: Partial<SmsSenderRequestSchemaType>
}

const SmsSenderRequestForm = ({ children, defaultValues }: SmsSenderRequestFormProps) => {
	const { t } = useTranslation("sms-senders")

	const form = useForm<SmsSenderRequestSchemaType>({
		defaultValues,
		mode: "onChange",
		resolver: zodResolver(SmsSenderRequestSchema),
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
									{t("fields.name")} *
									<IconTooltip content={t("components.smsSenderRequestForm.labels.name.iconTooltip")} />
								</Form.Label>
								<SenderNameInput onChange={field.onChange} readOnly={!!defaultValues?.sender} value={field.value} />
								<Form.Message />
							</Form.Item>
						)}
					/>

					<Form.Field
						control={form.control}
						name='type'
						render={({ field }) => (
							<Form.Item className='w-full max-w-[340px]'>
								<Form.Label>{t("fields.types")} *</Form.Label>
								<SelectSingleTemplateType
									onValueChange={field.onChange}
									placeholder={t("components.smsSenderRequestForm.placeholders.type")}
									readOnly={!!defaultValues?.type}
									value={field.value}
								/>
								<Form.Message />
							</Form.Item>
						)}
					/>

					<Form.Field
						control={form.control}
						name='targetCountry'
						render={({ field }) => (
							<Form.Item>
								<Form.Label>{t("fields.targetCountry")} *</Form.Label>
								<SelectCountryPopover
									className='[&>*]:text-base [&>*]:font-normal'
									onChange={(country) => field.onChange(country)}
									readOnly={!!defaultValues?.targetCountry}
									size='lg'
									value={field.value}
								/>
								<Form.Message />
							</Form.Item>
						)}
					/>

					<Form.Field
						control={form.control}
						name='note'
						render={({ field }) => (
							<Form.Item>
								<Form.Label>{t("fields.note")}</Form.Label>
								<TextareaPopover
									onValueChange={(v) => field.onChange(v)}
									placeholder={t("components.smsSenderRequestForm.placeholders.note")}
									size='lg'
									triggerProps={{ className: "text-base" }}
									value={field.value}
								/>
								<Form.Message />
							</Form.Item>
						)}
					/>

					<Form.Field
						control={form.control}
						name='sampleContent'
						render={({ field }) => (
							<Form.Item className='col-span-2'>
								<Form.Label>{t("fields.sampleContent")} *</Form.Label>
								<Textarea
									maxLength={500}
									onChange={field.onChange}
									placeholder={t("components.smsSenderRequestForm.placeholders.sampleContent")}
									rows={3}
									value={field.value}
								/>
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

export default SmsSenderRequestForm
