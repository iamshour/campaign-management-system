//#region Import
import TextareaPopover from "@/core/components/textarea-popover/textarea-popover"
import { Button, Form, SelectCountryPopover, Tooltip } from "@/ui"
import IcBaselineDelete from "~icons/ic/baseline-delete"
import { Control, useFieldArray } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { twMerge } from "tailwind-merge"

import type { BulkListingsFunnelBase } from "./types"

import { emptyListingField } from "./bulk-listings-funnel-configs"

//#endregion

interface ListingFieldProps {
	control: Control<BulkListingsFunnelBase>

	/**
	 * Bool check used to disable adding new requests if number of requests hits the specified limit
	 */
	// disableNewRequest: boolean

	highlightedErrorRow?: string

	/**
	 * Callback function used to remove a Group (grouped by type), Only if there's an initial one existing (length of groups > 1)
	 */
	removeType: (() => void) | undefined

	SenderRequestsGroupsIdx: number
}

const ListingField = ({
	control,
	highlightedErrorRow,
	// disableNewRequest,
	removeType,
	SenderRequestsGroupsIdx,
}: ListingFieldProps) => {
	const { t } = useTranslation("senders-management")

	const { append, fields, remove } = useFieldArray({
		control,
		name: `bulkListingsGroups.${SenderRequestsGroupsIdx}.listingsFields`,
	})

	return (
		<>
			{fields.map((_, singleRequestIdx) => (
				<div
					className={twMerge(
						"flex flex-wrap items-center gap-4 rounded-lg bg-[#F7F7F7] p-4",
						highlightedErrorRow ===
							`bulkListingsGroups.${SenderRequestsGroupsIdx}.listingsFields.${singleRequestIdx}` &&
							"duration-5000 animate-pulse bg-red-100"
					)}
					id={`bulkListingsGroups.${SenderRequestsGroupsIdx}.listingsFields.${singleRequestIdx}`}
					key={singleRequestIdx}>
					<Form.Field
						control={control}
						name={`bulkListingsGroups.${SenderRequestsGroupsIdx}.listingsFields.${singleRequestIdx}.country`}
						render={({ field }) => (
							<Form.Item>
								<SelectCountryPopover
									className='[&>button]:text-base [&>button]:font-normal'
									label={`${t("channels-common:fields.country")} *`}
									onChange={field.onChange}
									ref={field.ref}
									size='lg'
									value={field.value}
								/>
								<Form.Message />
							</Form.Item>
						)}
					/>

					<Form.Field
						control={control}
						name={`bulkListingsGroups.${SenderRequestsGroupsIdx}.listingsFields.${singleRequestIdx}.content`}
						render={({ field }) => (
							<Form.Item>
								<TextareaPopover
									className='self-start [&>button]:text-base [&>button]:font-normal'
									label={`${t("channels-common:fields.sampleContent")} *`}
									onValueChange={field.onChange}
									size='lg'
									value={field.value}
								/>
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
			))}

			<div className='mt-4 flex w-full items-center justify-between'>
				<Button
					// disabled={disableNewRequest}
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
