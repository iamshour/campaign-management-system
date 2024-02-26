//#region Import
import type { AddNewIndustryBody, IndustryType } from "@/features/industries/types"

import industriesIconsMap from "@/features/industries/constants/industries-icons-map"
import { Button, ColorInput, Footer, Form, Input, Select, useForm } from "@/ui"
import { cleanObject } from "@/utils"
import { zodResolver } from "@hookform/resolvers/zod"

import type { IndustrySchemaType } from "../schemas/industry-schema"

import IndustrySchema from "../schemas/industry-schema"
import IndustryIcon from "./industry-icon"
//#endregion

interface IndustryFormProps {
	children: React.ReactNode

	defaultValues?: Pick<IndustryType, "color" | "description" | "icon" | "name">

	onSubmit: (data: AddNewIndustryBody) => void
}

const IndustryForm = ({ children, defaultValues, onSubmit }: IndustryFormProps) => {
	const form = useForm<IndustrySchemaType>({
		resolver: zodResolver(IndustrySchema),
		values: defaultValues,
	})

	/**
	 * Submit Handler, which handles sending data/body to the server. It will return body to be used for both create and edit industry mutations
	 * @param param0 data collected by react-hook-form, used to be sent to the server. @template IndustrySchemaType
	 */
	const onFormSubmit = (data: IndustrySchemaType) => {
		const cleanBody: AddNewIndustryBody = cleanObject(data)

		onSubmit(cleanBody)
	}

	return (
		<Form {...form}>
			<form
				className='flex h-full w-full flex-col justify-between overflow-y-auto '
				onSubmit={form.handleSubmit(onFormSubmit)}>
				<div className='flex h-full w-full flex-col gap-y-6 overflow-y-auto p-2 pb-2'>
					{form?.formState?.errors?.root?.type === "required" && (
						<Form.Message className='ps-4'>{form?.formState?.errors?.root?.message}</Form.Message>
					)}

					<Form.Field
						control={form.control}
						name='name'
						render={({ field }) => (
							<Form.Item>
								<Form.Label>Industry Name *</Form.Label>
								<Form.Control>
									<Input placeholder='Enter name' size='lg' {...field} />
								</Form.Control>
								<Form.Message />
							</Form.Item>
						)}
					/>

					<Form.Field
						control={form.control}
						name='description'
						render={({ field }) => (
							<Form.Item>
								<Form.Label>Industry Description *</Form.Label>
								<Form.Control>
									<Input placeholder='Enter description' size='lg' {...field} />
								</Form.Control>
								<Form.Message />
							</Form.Item>
						)}
					/>

					<div className='w-full space-y-3 pb-4 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0 sm:pb-8'>
						<Form.Field
							control={form.control}
							name='icon'
							render={({ field }) => (
								<Form.Item>
									<Form.Label>Icon *</Form.Label>
									<Form.Control>
										<Select value={field.value}>
											<Select.Trigger className='w-full text-base' hasValue={!!field.value?.length} size='lg'>
												<Select.Value placeholder='Select type'>
													{!!field.value?.length && <IndustryIcon className='h-[26px] w-[26px]' icon={field.value} />}
												</Select.Value>
											</Select.Trigger>

											<Select.Content className='flex max-w-[340px] flex-row flex-wrap justify-between gap-1'>
												{Object.entries(industriesIconsMap).map(([iconName, Icon]) => (
													<Button
														className='cursor-pointer rounded-lg border border-transparent p-1 hover:border-primary-300 hover:bg-primary-100/50'
														key={iconName}
														onClick={() => field.onChange(iconName)}
														type='button'
														variant='ghost'>
														<Icon className='h-[26px] w-[26px]' />
													</Button>
												))}
											</Select.Content>
										</Select>
									</Form.Control>
									<Form.Message />
								</Form.Item>
							)}
						/>
						<Form.Field
							control={form.control}
							name='color'
							render={({ field }) => (
								<Form.Item>
									<Form.Label>Icon Color *</Form.Label>
									<Form.Control>
										<ColorInput {...field} onChange={(e) => field.onChange(e.target.value)} value={field.value} />
									</Form.Control>
									<Form.Message />
								</Form.Item>
							)}
						/>
					</div>
				</div>

				<Footer>{children}</Footer>
			</form>
		</Form>
	)
}

export default IndustryForm
