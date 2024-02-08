//#region Import

import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate, useLocation } from "react-router-dom"

import appPaths from "@/core/constants/app-paths"
import { Form, Select, useForm, Footer, Button, Checkbox, Tooltip, Input, Dialog } from "@/ui"

import { smsTemplateLanguagesOptions } from "../../constants/sms-template-languages-options"
import { smsTemplateTypesOptions } from "../../constants/sms-template-types-options"
import SmsTemplateSchema, { type SmsTemplateSchemaType } from "../../schemas/sms-template-schema"
import { AddNewSmsTemplateArgs } from "../../types"
import MobileSmsPreview from "../mobile-sms-preview"

import SmsTemplateBodyTextarea from "./sms-template-body-textarea"

import MdiInformationVariantCircle from "~icons/mdi/information-variant-circle"
import MdiMessageProcessing from "~icons/mdi/message-processing"
//#endregion

export interface SmsTemplateBuilderProps {
	/**
	 * Callback function to be called on form submit
	 */
	onSubmit: (requestBody: Omit<AddNewSmsTemplateArgs, "status">) => void

	/**
	 * Children Nodes to be rendered
	 */
	children: React.ReactNode

	/**
	 * Form default values, will be passed in case of edit, clone and use template. ANd will be undefined in case of create template
	 */
	defaultValue?: SmsTemplateSchemaType
}

const SmsTemplateBuilder = ({ onSubmit, children, defaultValue }: SmsTemplateBuilderProps) => {
	const navigate = useNavigate()
	const { state } = useLocation()

	const form = useForm<SmsTemplateSchemaType>({
		resolver: zodResolver(SmsTemplateSchema),
		values: defaultValue,
	})
	const { control, watch } = form

	const onFormSubmit = (data: SmsTemplateSchemaType) => {
		onSubmit(data)
	}

	return (
		<div className='flex h-full w-full flex-col overflow-y-auto p-6'>
			<h1 className='mb-6 text-xl font-bold'>Create New Template</h1>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onFormSubmit)} className='flex flex-1 flex-col'>
					<div className='flex flex-1 flex-row flex-wrap justify-between rounded-xl bg-[#F7F7F7] p-6 px-12 lg:flex-nowrap'>
						<div className='ml-8'>
							<div>
								<h1 className='relative text-xl font-bold'>
									<MdiInformationVariantCircle className='absolute -left-9 top-1 text-[#2daef5]' />
									Template Basic Info
								</h1>
								<p className='mb-6 text-[#545454]'>Fill your template basic info</p>

								<div className='flex flex-row flex-wrap gap-x-8 '>
									<Form.Field
										control={control}
										name='name'
										render={({ field }) => (
											<Form.Item className='mt-6'>
												<Form.Label>Template Name *</Form.Label>
												<Form.Control>
													<Input size='lg' placeholder='Enter name' className='bg-white' {...field} />
												</Form.Control>
												<Form.Message />
											</Form.Item>
										)}
									/>

									<Form.Field
										control={control}
										name='type'
										render={({ field }) => (
											<Form.Item className='mt-6'>
												<Form.Label>Template Type *</Form.Label>
												<Form.Control>
													<Select value={field.value} onValueChange={(selectedType) => field.onChange(selectedType)}>
														<Select.Trigger
															className='h-[50px] w-[340px] bg-white !p-4 ring-[#d1d5db] data-[state=open]:ring-primary-300 [&>svg]:!text-[#d1d5db] [&>svg]:data-[state=open]:!text-primary-300'
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
								</div>

								<Form.Field
									control={control}
									name='language'
									render={({ field }) => (
										<Form.Item className='mt-6'>
											<Form.Label>Template Language *</Form.Label>
											<Form.Control>
												<Select
													value={field.value}
													onValueChange={(selectedLanguage) => field.onChange(selectedLanguage)}>
													<Select.Trigger
														className='h-[50px] w-[340px] bg-white !p-4 ring-[#d1d5db] data-[state=open]:ring-primary-300 [&>svg]:!text-[#d1d5db] [&>svg]:data-[state=open]:!text-primary-300'
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

							<div className='mt-8'>
								<h1 className='relative text-xl font-bold'>
									<MdiMessageProcessing className='absolute -left-9 top-1 text-[#2daef5]' />
									Message Text
								</h1>
								<p className='mb-6 text-[#545454]'>Fill your template text</p>

								<SmsTemplateBodyTextarea form={form} />

								<Form.Field
									control={control}
									name='addUnsubscribeLink'
									render={({ field }) => (
										<Form.Item className='mt-4 flex flex-row items-center space-x-2'>
											<Form.Control>
												<Checkbox checked={field.value} onCheckedChange={(checked) => field.onChange(checked)} />
											</Form.Control>
											<Form.Label className='flex flex-row items-center pb-0'>
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
							</div>
						</div>

						<MobileSmsPreview message={watch("body")} showOptOutLink={watch("addUnsubscribeLink")} />
					</div>

					<Footer className='mt-5 flex flex-row items-end md:justify-between'>
						<Dialog>
							<Dialog.Trigger asChild>
								<Button variant='outline' className='px-10'>
									Cancel
								</Button>
							</Dialog.Trigger>

							<Dialog.Content
								title='Discard Changes'
								className='flex h-[220px] w-[390px] flex-col justify-between p-[30px]'
								onInteractOutside={(e) => e.preventDefault()}>
								Are you sure you want to cancel and discard the changes you made on this template?
								<Button
									variant='default'
									className='ms-auto w-[150px]'
									onClick={() => navigate(state?.from || appPaths.SMS_TEMPLATES)}>
									Confirm
								</Button>
							</Dialog.Content>
						</Dialog>

						<div className='flex flex-row space-x-4'>{children}</div>
					</Footer>
				</form>
			</Form>
		</div>
	)
}

export default SmsTemplateBuilder
