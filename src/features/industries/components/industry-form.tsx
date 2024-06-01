//#region Import
import type { AddNewIndustryBody, IndustryType } from "@/features/industries/types"

import { ColorInput, Footer, Form, Input, useForm } from "@/ui"
import { cleanObject } from "@/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslation } from "react-i18next"

import type { IndustrySchemaType } from "../schemas/industry-schema"

import IndustrySchema from "../schemas/industry-schema"
import SelectIconPopover from "./select-icon-popover"
//#endregion

interface IndustryFormProps {
	children: React.ReactNode

	defaultValues?: Pick<IndustryType, "color" | "description" | "industryIcon" | "name">

	onSubmit: (data: AddNewIndustryBody) => void
}

const IndustryForm = ({ children, defaultValues, onSubmit }: IndustryFormProps) => {
	const { t } = useTranslation("industries", { keyPrefix: "fields" })

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
					<Form.Field
						control={form.control}
						name='name'
						render={({ field }) => (
							<Form.Item label={t("name.label")} required size='lg'>
								<Input placeholder={t("name.placeholder")} {...field} />
							</Form.Item>
						)}
					/>

					<Form.Field
						control={form.control}
						name='description'
						render={({ field }) => (
							<Form.Item label={t("description.label")} required size='lg'>
								<Input placeholder={t("description.placeholder")} {...field} />
							</Form.Item>
						)}
					/>

					<div className='w-full space-y-3 pb-4 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0 sm:pb-8'>
						<Form.Field
							control={form.control}
							name='industryIcon'
							render={({ field }) => (
								<Form.Item label={t("icon.label")} required size='lg'>
									<SelectIconPopover
										onValueChange={(icon) => icon && field.onChange(icon)}
										placeholder={t("icon.placeholder")}
										value={field.value}
									/>
								</Form.Item>
							)}
						/>
						<Form.Field
							control={form.control}
							name='color'
							render={({ field }) => (
								<Form.Item label={t("color.label")} required size='lg'>
									<ColorInput {...field} onChange={(e) => field.onChange(e.target.value)} value={field.value} />
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
