//#region Import
import { UseFormReturn, useForm, Footer, Form, Input, PhoneInput, Textarea } from "@/ui"
import { cleanObject, getListOfKey } from "@/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslation } from "react-i18next"

import SelectGroupsWithCreatePopover from "@/features/people/groups/components/select-groups-with-create-popover"

import type { ContactSchemaType } from "../schemas/contact-schema"
import ContactSchema from "../schemas/contact-schema"
import type { AddNewContactArgs } from "../types"
import { parsePhoneNumberDto } from "../utils"

import SelectTagsPopover from "./select-tags-popover"
//#endregion

interface ContactFormProps {
	onSubmit: (data: AddNewContactArgs, form: UseFormReturn<ContactSchemaType>) => void

	children: React.ReactNode

	defaultValues?: ContactSchemaType
}

const ContactForm = ({ children, onSubmit, defaultValues }: ContactFormProps) => {
	const { t } = useTranslation("contacts")

	const form = useForm<ContactSchemaType>({
		resolver: zodResolver(ContactSchema),
		values: defaultValues ?? {},
	})

	/**
	 * Submit Handler, which handles sending data/body to the server. Used to check form validity, and returns body to be used for both create and edit contact mutations
	 * @param param0 data collected by react-hook-form, used to be sent to the server, but will transformed first to match body shape. @template ContactSchemaType
	 */
	const onFormSubmit = ({ groups, phoneNumber, ...restOfData }: ContactSchemaType) => {
		// Checking if Either email or phoneNumber exists (Only one is required)
		if (!phoneNumber?.length && !restOfData?.email?.length) {
			form.setError("root", {
				message: t("components.contactForm.message.phoneOrEmailWarning"),
				type: "required",
			})

			return
		}

		// Reshaping Data to be sent to match Backend's POST/PUT API's body, whilst also cleaning it from any undefined/nullish/empty values
		const cleanBody: AddNewContactArgs = cleanObject({
			...restOfData,
			phoneNumberDto: parsePhoneNumberDto(phoneNumber),
			groups: getListOfKey(groups, "value"),
		})

		onSubmit(cleanBody, form)
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onFormSubmit)} className='h-full w-full overflow-y-auto p-2'>
				{form?.formState?.errors?.root?.type === "required" && (
					<Form.Message className='ps-4'>{form?.formState?.errors?.root?.message}</Form.Message>
				)}

				<div className='w-full space-y-3 pb-4 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0 sm:pb-8'>
					<Form.Field
						control={form.control}
						name='firstName'
						render={({ field }) => (
							<Form.Item>
								<Form.Label>{t("fields.firstName")}</Form.Label>
								<Form.Control>
									<Input size='lg' placeholder={t("components.contactForm.placeholders.firstName")} {...field} />
								</Form.Control>
								<Form.Message />
							</Form.Item>
						)}
					/>
					<Form.Field
						control={form.control}
						name='lastName'
						render={({ field }) => (
							<Form.Item>
								<Form.Label>{t("fields.lastName")}</Form.Label>
								<Form.Control>
									<Input size='lg' placeholder={t("components.contactForm.placeholders.lastName")} {...field} />
								</Form.Control>
								<Form.Message />
							</Form.Item>
						)}
					/>

					<Form.Field
						control={form.control}
						name='email'
						render={({ field }) => (
							<Form.Item>
								<Form.Label>{t("fields.email")}</Form.Label>
								<Form.Control>
									<Input size='lg' placeholder={t("components.contactForm.placeholders.email")} {...field} />
								</Form.Control>
								<Form.Message />
							</Form.Item>
						)}
					/>

					<Form.Field
						control={form.control}
						name='phoneNumber'
						render={({ field }) => (
							<Form.Item>
								<Form.Label>{t("fields.phoneNumber")}</Form.Label>
								<Form.Control>
									<PhoneInput size='lg' {...field} className='w-[340px]' />
								</Form.Control>
								<Form.Message />
							</Form.Item>
						)}
					/>

					<Form.Field
						control={form.control}
						name='groups'
						render={({ field }) => (
							<Form.Item>
								<SelectGroupsWithCreatePopover
									isMulti
									selection={field.value || []}
									updateSelection={(items) => form.setValue("groups", items)}
									onCreateSuccess={(newGroup) =>
										form.setValue("groups", field?.value?.length ? [...field.value, newGroup] : [newGroup])
									}
									size='lg'
								/>
								<Form.Message />
							</Form.Item>
						)}
					/>

					<Form.Field
						control={form.control}
						name='tags'
						render={({ field }) => (
							<Form.Item>
								<SelectTagsPopover
									isCreatable
									isMulti
									selection={field.value?.map((value) => ({ label: value, value })) || []}
									updateSelection={(items) =>
										form.setValue(
											"tags",
											items?.map(({ value }) => value)
										)
									}
									size='lg'
								/>
								<Form.Message />
							</Form.Item>
						)}
					/>

					<Form.Field
						control={form.control}
						name='note'
						render={({ field }) => (
							<Form.Item className='col-span-2'>
								<Form.Label>{t("fields.note")}</Form.Label>
								<Form.Control>
									<Textarea
										maxLength={500}
										placeholder={t("components.contactForm.placeholders.note")}
										rows={3}
										{...field}
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

export default ContactForm
