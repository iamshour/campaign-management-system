//#region Import
import SmsIndustryTemplateSchema from "@/features/industries/schemas/sms-industry-template-schema"
import SelectSingleLanguagePopover from "@/features/templates/common/components/select-single-language-popover"
import SelectSingleTemplateTypePopover from "@/features/templates/common/components/select-single-template-type-popover"
import DiscardTemplateChangesDialog from "@/features/templates/sms-templates/dialogs/discard-template-changes-dialog/discard-template-changes-dialog"
import SmsTemplateSchema from "@/features/templates/sms-templates/schemas/sms-template-schema"
import { Button, Footer, Form, Input, Separator, useForm } from "@/ui"
import SectionHeading from "@/ui/section-heading/section-heading"
import { zodResolver } from "@hookform/resolvers/zod"
import MdiInformationVariantCircle from "~icons/mdi/information-variant-circle"
import MdiMessageProcessing from "~icons/mdi/message-processing"
import { useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { z } from "zod"

import MobileSmsPreview from "../mobile-sms-preview"
import SmsTemplateBodyTextarea from "./sms-template-body-textarea"
//#endregion

type SchemaType = typeof SmsIndustryTemplateSchema | typeof SmsTemplateSchema

export interface SmsTemplateBuilderProps<TData extends SchemaType = typeof SmsTemplateSchema> {
	/**
	 * Additional Nodes to be rendered
	 */
	children?: React.ReactNode

	/**
	 * Form default values, will be passed in case of edit, clone and use template. ANd will be undefined in case of create template
	 */
	defaultValues?: z.infer<TData>

	/**
	 * Component's top label. @default "Create New Template"
	 */
	label: string

	/**
	 * Callback function to be called on form submit
	 */
	onSubmit: (requestBody: z.infer<TData>) => void

	/**
	 * Custom Schema to be passed. Useful when using this component for creating a prebuilt Template
	 */
	schema?: TData
}

function SmsTemplateBuilder<TData extends SchemaType = typeof SmsTemplateSchema>({
	children,
	defaultValues,
	label,
	onSubmit,
	schema,
}: SmsTemplateBuilderProps<TData>) {
	const form = useForm<z.infer<TData>>({
		resolver: zodResolver(schema ?? SmsTemplateSchema),
		values: defaultValues,
	})

	return (
		<div className='flex h-full w-full flex-col p-6'>
			<h1 className='mb-6 text-xl font-bold'>{label}</h1>
			<Form {...form}>
				<form className='flex flex-1 flex-col overflow-hidden' onSubmit={form.handleSubmit(onSubmit)}>
					{children}
				</form>
			</Form>
		</div>
	)
}

const SmsTemplateBuilderBody = ({ children }: { children?: React.ReactNode }) => {
	const { t } = useTranslation("templates-common", { keyPrefix: "components.smsTemplateBuilder" })

	const { control, watch } = useFormContext()

	return (
		<div className='flex flex-1 flex-row flex-wrap justify-between gap-8 overflow-y-auto rounded-xl bg-[#F7F7F7] p-6 px-8 lg:flex-nowrap'>
			<div className='w-full max-w-[800px] flex-grow space-y-8 overflow-y-auto pe-2 sm:pe-4'>
				<div className='space-y-8'>
					<SectionHeading
						description={t("sectionHeadings.basicInfo.description")}
						icon={MdiInformationVariantCircle}
						label={t("sectionHeadings.basicInfo.label")}
					/>

					<div className='flex flex-row flex-wrap gap-6 ps-2'>
						<Form.Field
							control={control}
							name='name'
							render={({ field }) => (
								<Form.Item className='w-full max-w-[340px]'>
									<Form.Label>{t("fields.name.label")} *</Form.Label>
									<Form.Control>
										<Input
											className='w-full bg-white'
											placeholder={t("fields.name.placeholder")}
											size='lg'
											{...field}
										/>
									</Form.Control>
									<Form.Message />
								</Form.Item>
							)}
						/>

						<Form.Field
							control={control}
							name='type'
							render={({ field }) => (
								<Form.Item className='w-full max-w-[340px]'>
									<Form.Control>
										<SelectSingleTemplateTypePopover
											label={t("fields.type.label")}
											onValueChange={field.onChange}
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
							control={control}
							name='language'
							render={({ field }) => (
								<Form.Item className='w-full max-w-[340px]'>
									<Form.Control>
										<SelectSingleLanguagePopover
											label={t("fields.language.label")}
											onValueChange={field.onChange}
											required
											size='lg'
											value={field.value}
										/>
									</Form.Control>
									<Form.Message />
								</Form.Item>
							)}
						/>
					</div>
				</div>

				<Separator className='h-[2px]' />

				<SectionHeading
					description={t("sectionHeadings.messageText.description")}
					icon={MdiMessageProcessing}
					label={t("sectionHeadings.messageText.label")}
				/>

				<SmsTemplateBodyTextarea />

				{children}
			</div>

			<MobileSmsPreview message={watch("body")} />
		</div>
	)
}

const SmsTemplateBuilderFooter = ({ children }: { children?: React.ReactNode }) => {
	const { t } = useTranslation("templates-common", { keyPrefix: "components.smsTemplateBuilder.actions" })

	return (
		<Footer className='mt-5 flex flex-row items-end md:justify-between'>
			<DiscardTemplateChangesDialog>
				<Button className='px-10' variant='outline'>
					{t("cancel")}
				</Button>
			</DiscardTemplateChangesDialog>

			<div className='flex flex-row space-x-4'>{children}</div>
		</Footer>
	)
}

SmsTemplateBuilder.Body = SmsTemplateBuilderBody
SmsTemplateBuilder.Footer = SmsTemplateBuilderFooter

export default SmsTemplateBuilder
