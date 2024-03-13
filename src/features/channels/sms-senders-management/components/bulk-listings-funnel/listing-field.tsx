//#region Import
import TextareaPopover from "@/core/components/textarea-popover/textarea-popover"
import { Button, Form, SelectCountryPopover, Tooltip } from "@/ui"
import { ErrorMessage } from "@hookform/error-message"
import IcBaselineDelete from "~icons/ic/baseline-delete"
import { Control, useFieldArray, useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { twMerge } from "tailwind-merge"

import type { BulkListingsFunnelBase } from "./types"

import { emptyListingField } from "./bulk-listings-funnel-configs"
//#endregion

interface ListingFieldProps {
	control: Control<BulkListingsFunnelBase>

	/**
	 * Callback function used to remove a Group (grouped by type), Only if there's an initial one existing (length of groups > 1)
	 */
	removeType: (() => void) | undefined

	SenderRequestsGroupsIdx: number
}

const ListingField = ({ control, removeType, SenderRequestsGroupsIdx }: ListingFieldProps) => {
	const { t } = useTranslation("senders-management")

	const { append, fields, remove } = useFieldArray({
		control,
		name: `bulkListingsGroups.${SenderRequestsGroupsIdx}.listingsFields`,
	})

	const {
		formState: { errors },
	} = useFormContext()

	return (
		<>
			{fields.map((_, singleRequestIdx) => {
				const bulkListingsGroupsErrors = errors ? errors?.bulkListingsGroups : []

				const errorsInListings = bulkListingsGroupsErrors
					? bulkListingsGroupsErrors[SenderRequestsGroupsIdx as keyof typeof bulkListingsGroupsErrors]
					: undefined

				const errorMessage = errorsInListings
					? (errorsInListings as any)?.listingsFields[singleRequestIdx]?.message
					: undefined

				return (
					<div
						className={twMerge("rounded-lg bg-[#F7F7F7] p-4", !!errorMessage && "bg-red-100/80")}
						key={singleRequestIdx}>
						<div className='flex flex-wrap items-center gap-4'>
							<Form.Field
								control={control}
								name={`bulkListingsGroups.${SenderRequestsGroupsIdx}.listingsFields.${singleRequestIdx}.country`}
								render={({ field }) => (
									<Form.Item>
										<Form.Control>
											<SelectCountryPopover
												className='[&>button]:text-base [&>button]:font-normal'
												label={`${t("channels-common:fields.country")} *`}
												onChange={field.onChange}
												ref={field.ref}
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
								name={`bulkListingsGroups.${SenderRequestsGroupsIdx}.listingsFields.${singleRequestIdx}.sampleContent`}
								render={({ field }) => (
									<Form.Item>
										<Form.Control>
											<TextareaPopover
												className='self-start [&>button]:text-base [&>button]:font-normal'
												label={`${t("channels-common:fields.sampleContent")} *`}
												onValueChange={field.onChange}
												size='lg'
												value={field.value}
											/>
										</Form.Control>
										<Form.Message />
									</Form.Item>
								)}
							/>

							{fields?.length > 1 && (
								<Tooltip content={t("components.senderRequestFunnel.actions.deleteCountry")} side='left' sideOffset={8}>
									<Button
										className='mt-5 h-5 w-5 shrink-0 rounded-full p-0 text-xl'
										onClick={() => remove(singleRequestIdx)}
										type='button'
										variant='destructive'>
										-
									</Button>
								</Tooltip>
							)}
						</div>

						<ErrorMessage
							errors={errors}
							name={`bulkListingsGroups.${SenderRequestsGroupsIdx}.listingsFields.${singleRequestIdx}`}
							render={({ message }) => <p className='-mb-2 pt-2.5 text-xs font-medium text-red-500'>{message}</p>}
						/>
					</div>
				)
			})}

			<div className='mt-4 flex w-full items-center justify-between'>
				<Button
					className='w-max gap-2'
					onClick={() => append([emptyListingField])}
					size='sm'
					type='button'
					variant='outline'>
					<span className='text-lg'>+</span>
					{t("components.senderRequestFunnel.actions.addCountry")}
				</Button>

				{removeType !== undefined && (
					<Tooltip content={t("components.senderRequestFunnel.actions.deleteType")} side='left' sideOffset={8}>
						<Button
							className='h-max w-max p-0 text-xl text-gray-400 hover:bg-transparent hover:text-primary-700'
							onClick={removeType}
							type='button'
							variant='ghost'>
							<IcBaselineDelete />
						</Button>
					</Tooltip>
				)}
			</div>
		</>
	)
}

export default ListingField
