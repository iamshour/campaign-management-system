/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
// interface SmsSenderRequestBuilderProps {}
// import SelectSingleTemplateType from "@/features/templates/common/components/select-single-template-type"
import type { TemplateType } from "@/features/templates/common/types"
import type { Country } from "react-phone-number-input"

import TextareaPopover from "@/core/components/textarea-popover/textarea-popover"
import SelectSingleTemplateType from "@/features/templates/common/components/select-single-template-type"
import { Button, Form, SelectCountryPopover, Tooltip } from "@/ui"
import IcBaselineDelete from "~icons/ic/baseline-delete"
import { useFieldArray, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"

// import SmsSenderRequestFunnelSenderRequest from "./sms-sender-request-funnel-type-entry"

export type CountriesGroupEntry = { content?: string; country?: Country }

type SenderRequest = { countriesGroup: CountriesGroupEntry[]; type?: TemplateType }

export type FormValues = {
	senderRequests: SenderRequest[]
}

const SmsSenderRequestFunnel = () => {
	const { t } = useTranslation("senders-management")

	const form = useForm<FormValues>({
		defaultValues: {
			senderRequests: [emptySenderRequest],
		},
	})

	const {
		append,
		fields: senderRequests,
		insert,
		remove,
		update,
	} = useFieldArray({ control: form.control, name: "senderRequests" })

	const addCountry = (SenderRequestIdx: number) => {
		// insert(SenderRequestIdx, { countriesGroup: [...senderRequests[SenderRequestIdx].countriesGroup, emptyCountriesGroupEntry] })

		form.setValue(
			"senderRequests",
			senderRequests?.map((entry, idx) => {
				if (idx === SenderRequestIdx)
					return { ...entry, countriesGroup: [...entry.countriesGroup, emptyCountriesGroupEntry] }

				return entry
			})
		)
	}

	return (
		<Form {...form}>
			<form
				className='flex w-max flex-col items-center gap-4 p-4'
				onSubmit={form.handleSubmit((data) => console.log(data))}>
				<ul className='flex w-max flex-col gap-4'>
					{senderRequests.map(({ countriesGroup, id }, SenderRequestIdx) => (
						<div className='flex flex-col gap-4 rounded-xl bg-white p-4' key={id}>
							<Form.Field
								control={form.control}
								name={`senderRequests.${SenderRequestIdx}.type`}
								render={({ field }) => (
									<Form.Item className='w-full max-w-[340px]'>
										<Form.Label>Template Type *</Form.Label>
										<SelectSingleTemplateType
											onValueChange={(selectedType) => field.onChange(selectedType)}
											placeholder='Select type'
											value={field.value}
										/>
										<Form.Message />
									</Form.Item>
								)}
							/>

							{countriesGroup.map((_, CountriesGroupEntryIdx) => (
								<div className='flex flex-wrap gap-4 rounded-lg bg-[#F7F7F7] p-4' key={CountriesGroupEntryIdx}>
									<Form.Field
										control={form.control}
										name={`senderRequests.${SenderRequestIdx}.countriesGroup.${CountriesGroupEntryIdx}.country`}
										render={({ field }) => (
											<Form.Item>
												<SelectCountryPopover
													label={`${t("sms-senders:fields.targetCountry")} *`}
													onChange={(country) => field.onChange(country)}
													size='lg'
													value={field.value}
												/>
												<Form.Message />
											</Form.Item>
										)}
									/>

									<Form.Field
										control={form.control}
										name={`senderRequests.${SenderRequestIdx}.countriesGroup.${CountriesGroupEntryIdx}.content`}
										render={({ field }) => (
											<Form.Item>
												<TextareaPopover
													label='Sample content *'
													onValueChange={(content) => field.onChange(content)}
													size='lg'
													value={field.value}
												/>
												<Form.Message />
											</Form.Item>
										)}
									/>
								</div>
							))}

							<div className='mt-4 flex w-full items-center justify-between'>
								<Button
									className='w-max'
									// Max Number of allowed rules === 10
									// disabled={rules?.length >= 10}
									onClick={() => addCountry(SenderRequestIdx)}
									size='sm'
									type='button'
									variant='outline'>
									{t("components.senderRequestFunnel.actions.addCountry")}
								</Button>

								{countriesGroup?.length > 1 && (
									<Tooltip>
										<Tooltip.Trigger asChild>
											<Button
												className='h-max w-max p-0 text-xl text-gray-400 hover:bg-transparent hover:text-primary-700'
												// onClick={removeCondition}
												type='button'
												variant='ghost'>
												<IcBaselineDelete />
											</Button>
										</Tooltip.Trigger>

										<Tooltip.Content
											content={t("components.senderRequestFunnel.actions.deleteType")}
											side='left'
											sideOffset={8}
										/>
									</Tooltip>
								)}
							</div>
						</div>
					))}

					{/* USED TO ADD A CONDITION  */}
					<button className='w-full bg-black p-2 text-white' onClick={() => append([emptySenderRequest])} type='button'>
						{t("components.senderRequestFunnel.actions.addType")}
					</button>
				</ul>
				<input className='w-full cursor-pointer bg-green-500 p-2 text-lg' type='submit' />
			</form>
		</Form>
	)
}

export default SmsSenderRequestFunnel

const emptyCountriesGroupEntry: CountriesGroupEntry = { content: undefined, country: undefined }

const emptySenderRequest: { countriesGroup: CountriesGroupEntry[] } = { countriesGroup: [emptyCountriesGroupEntry] }

/* <ul className='flex w-max flex-col gap-4'>
	{fields.map((item, index) => (
		<li className='inline-flex w-max gap-2' key={item.id}>
			<input {...register(`test.${index}.firstName`)} />
			<Controller
				control={control}
				name={`test.${index}.lastName`}
				render={({ field }) => <input {...field} />}
			/>
			<button onClick={() => remove(index)} type='button'>
				Delete
			</button>
		</li>
	))}
</ul>
<button
	className='w-full bg-black p-2 text-white'
	onClick={() => append({ firstName: "bill", lastName: "luo" })}
	type='button'>
	append
</button> */
