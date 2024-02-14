//#region Import
import { zodResolver } from "@hookform/resolvers/zod"
import { useFormContext } from "react-hook-form"
import { z } from "zod"

import SmsIndustryTemplateSchema from "@/features/industries/schemas/sms-industry-template-schema"
import { smsTemplateLanguagesOptions } from "@/features/templates/sms-templates/constants/sms-template-languages-options"
import { smsTemplateTypesOptions } from "@/features/templates/sms-templates/constants/sms-template-types-options"
import DiscardTemplateChangesDialog from "@/features/templates/sms-templates/dialogs/discard-template-changes-dialog/discard-template-changes-dialog"
import SmsTemplateSchema from "@/features/templates/sms-templates/schemas/sms-template-schema"
import { Form, Select, useForm, Footer, Button, Checkbox, Tooltip, Input, Separator, twMerge } from "@/ui"
import SectionHeading from "@/ui/section-heading/section-heading"

import MobileSmsPreview from "../mobile-sms-preview"

import SmsTemplateBodyTextarea from "./sms-template-body-textarea"

import MdiInformationVariantCircle from "~icons/mdi/information-variant-circle"
import MdiMessageProcessing from "~icons/mdi/message-processing"
//#endregion

type SchemaType = typeof SmsTemplateSchema | typeof SmsIndustryTemplateSchema

export interface SmsTemplateBuilderProps<TData extends SchemaType = typeof SmsTemplateSchema> {
	/**
	 * Component's top label. @default "Create New Template"
	 */
	label: string

	/**
	 * Callback function to be called on form submit
	 */
	onSubmit: (requestBody: z.infer<TData>) => void

	/**
	 * Form default values, will be passed in case of edit, clone and use template. ANd will be undefined in case of create template
	 */
	defaultValues?: z.infer<TData>

	/**
	 * Custom Schema to be passed. Useful when using this component for creating a prebuilt Template
	 */
	schema?: TData

	/**
	 * Additional Nodes to be rendered
	 */
	children?: React.ReactNode
}

function SmsTemplateBuilder<TData extends SchemaType = typeof SmsTemplateSchema>({
	label,
	onSubmit,
	children,
	defaultValues,
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
				<form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-1 flex-col overflow-hidden'>
					{children}
				</form>
			</Form>
		</div>
	)
}

const SmsTemplateBuilderBody = ({ children }: { children?: React.ReactNode }) => {
	const { control, watch } = useFormContext()

	return (
		<div className='flex flex-1 flex-row flex-wrap justify-between gap-8 overflow-y-auto rounded-xl bg-[#F7F7F7] p-6 px-8 lg:flex-nowrap'>
			<div className='w-full max-w-[800px] flex-grow space-y-8 overflow-y-auto pe-2 sm:pe-4'>
				<div className='space-y-8'>
					<SectionHeading
						icon={MdiInformationVariantCircle}
						label='Template Basic Info'
						description='Fill your template basic info'
					/>

					<div className='flex flex-row flex-wrap gap-6'>
						<Form.Field
							control={control}
							name='name'
							render={({ field }) => (
								<Form.Item className='w-full max-w-[340px]'>
									<Form.Label>Template Name *</Form.Label>
									<Form.Control>
										<Input size='lg' placeholder='Enter name' className='w-full bg-white' {...field} />
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
									<Form.Label>Template Type *</Form.Label>
									<Form.Control>
										<Select value={field.value} onValueChange={(selectedType) => field.onChange(selectedType)}>
											<Select.Trigger
												className='h-[50px] w-full bg-white !p-4 ring-[#d1d5db] data-[state=open]:ring-primary-300 [&>svg]:!text-[#d1d5db] [&>svg]:data-[state=open]:!text-primary-300'
												hasValue={!!field.value?.length}>
												<Select.Value placeholder='Select type' />
											</Select.Trigger>
											<Select.Content sideOffset={8}>
												{smsTemplateTypesOptions.map(({ value, label }) => (
													<Select.Item
														key={value}
														value={value}
														className='static flex w-full flex-row items-center justify-between'>
														<Select.Text className='flex-1 '>{label}</Select.Text>
														<MdiInformationVariantCircle className='text-sm text-primary-600' />
													</Select.Item>
												))}
											</Select.Content>
										</Select>
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
									<Form.Label>Template Language *</Form.Label>
									<Form.Control>
										<Select value={field.value} onValueChange={(selectedLanguage) => field.onChange(selectedLanguage)}>
											<Select.Trigger
												className='h-[50px] w-full bg-white !p-4 ring-[#d1d5db] data-[state=open]:ring-primary-300 [&>svg]:!text-[#d1d5db] [&>svg]:data-[state=open]:!text-primary-300'
												hasValue={!!field.value?.length}>
												<Select.Value placeholder='Select language' />
											</Select.Trigger>
											<Select.Content sideOffset={8}>
												{smsTemplateLanguagesOptions.map(({ value, label }) => (
													<Select.Item key={value} value={value}>
														<Select.Text>{label}</Select.Text>
													</Select.Item>
												))}
											</Select.Content>
										</Select>
									</Form.Control>
									<Form.Message />
								</Form.Item>
							)}
						/>
					</div>
				</div>

				<Separator className='h-[2px]' />

				<SectionHeading icon={MdiMessageProcessing} label='Message Text' description='Fill your template text' />

				<SmsTemplateBodyTextarea />

				<Form.Field
					control={control}
					name='addUnsubscribeLink'
					render={({ field }) => (
						<Form.Item className='flex flex-row items-center space-x-2'>
							<Form.Control>
								<Checkbox checked={field.value} onCheckedChange={(checked) => field.onChange(checked)} />
							</Form.Control>
							<Form.Label
								className={twMerge(
									"flex cursor-pointer flex-row items-center pb-0 transition-basic hover:text-primary-900",
									!!field.value && "text-primary-900"
								)}>
								Add Unsubscribe link
								<Tooltip key='tooltip'>
									<Tooltip.Trigger asChild>
										<span>
											<MdiInformationVariantCircle className='ml-1 text-sm text-primary-600' />
										</span>
									</Tooltip.Trigger>
									<Tooltip.Content
										content='End-users may click this link to stop receiving promotional messages'
										side='top'
										align='start'
										sideOffset={10}
									/>
								</Tooltip>
							</Form.Label>
							<Form.Message />
						</Form.Item>
					)}
				/>

				{children}
			</div>

			<MobileSmsPreview message={watch("body")} showOptOutLink={watch("addUnsubscribeLink")} />
		</div>
	)
}

const SmsTemplateBuilderFooter = ({ children }: { children?: React.ReactNode }) => (
	<Footer className='mt-5 flex flex-row items-end md:justify-between'>
		<DiscardTemplateChangesDialog>
			<Button variant='outline' className='px-10'>
				Cancel
			</Button>
		</DiscardTemplateChangesDialog>

		<div className='flex flex-row space-x-4'>{children}</div>
	</Footer>
)

SmsTemplateBuilder.Body = SmsTemplateBuilderBody
SmsTemplateBuilder.Footer = SmsTemplateBuilderFooter

export default SmsTemplateBuilder
