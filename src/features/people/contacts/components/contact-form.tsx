//#region Import
import SelectGroupsWithCreatePopover from "@/features/people/groups/components/select-groups-with-create-popover"
import { Footer, Form, Input, PhoneInput, Textarea, useForm, UseFormReturn } from "@/ui"
import { cleanObject, getListOfKey } from "@/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslation } from "react-i18next"

import type { ContactSchemaType } from "../schemas/contact-schema"
import type { AddNewContactBody } from "../types"

import ContactSchema from "../schemas/contact-schema"
import { parsePhoneNumberDto } from "../utils"
import SelectTagsPopover from "./select-tags-popover/select-tags-popover"
//#endregion

interface ContactFormProps {
	children: React.ReactNode

	defaultValues?: ContactSchemaType

	onSubmit: (data: AddNewContactBody, form: UseFormReturn<ContactSchemaType>) => void
}

const ContactForm = ({ children, defaultValues, onSubmit }: ContactFormProps) => {
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
		const cleanBody: AddNewContactBody = cleanObject({
			...restOfData,
			groups: getListOfKey(groups, "value"),
			phoneNumberDto: parsePhoneNumberDto(phoneNumber),
		})

		onSubmit(cleanBody, form)
	}

	return (
		<Form {...form}>
			<form
				className='h-full w-full overflow-y-auto p-2'
				onSubmit={(e) => {
					e.preventDefault()

					/**
					 * Submit form only if submit is triggered by buttons inside the contact form (having data-form="contact-form")
					 * This is a fix for: contact form being submitted when the submit button of "Create Group" popover is clicked
					 */
					const submitterButton = (e?.nativeEvent as SubmitEvent)?.submitter

					if (submitterButton?.dataset?.form === "contact-form") form.handleSubmit(onFormSubmit)()
				}}>
				{form?.formState?.errors?.root?.type === "required" && (
					<Form.Message className='pb-2.5 ps-2'>{form?.formState?.errors?.root?.message}</Form.Message>
				)}

				<div className='w-full space-y-3 pb-4 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0 sm:pb-8'>
					<Form.Field
						control={form.control}
						name='firstName'
						render={({ field }) => (
							<Form.Item>
								<Form.Label>{t("fields.firstName")}</Form.Label>
								<Form.Control>
									<Input placeholder={t("components.contactForm.placeholders.firstName")} size='lg' {...field} />
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
									<Input placeholder={t("components.contactForm.placeholders.lastName")} size='lg' {...field} />
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
									<Input placeholder={t("components.contactForm.placeholders.email")} size='lg' {...field} />
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
									onCreateSuccess={(newGroup) =>
										form.setValue("groups", field?.value?.length ? [...field.value, newGroup] : [newGroup])
									}
									selection={field.value || []}
									size='lg'
									updateSelection={(items) => form.setValue("groups", items)}
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
									creatable
									isMulti
									selection={field.value?.map((value) => ({ label: value, value })) || []}
									size='lg'
									updateSelection={(items) =>
										form.setValue(
											"tags",
											items?.map(({ value }) => value)
										)
									}
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
