//#region Import
import type { TemplateType } from "@/features/templates/common/types"

import SelectSingleTemplateType from "@/features/templates/common/components/select-single-template-type"
import { Button, Form } from "@/ui"
import { type Control, useFieldArray } from "react-hook-form"
import { useTranslation } from "react-i18next"

import type { BulkListingsFunnelBase, BulkListingsGroup } from "./types"

import { emptyBulkListingsGroup } from "./bulk-listings-funnel-configs"
import ListingField from "./listing-field"
//#endregion

interface BulkListingsFunnelProps {
	bulkListingsGroups: BulkListingsGroup[]

	control: Control<BulkListingsFunnelBase>
}

const BulkListingsFunnel = ({ bulkListingsGroups, control }: BulkListingsFunnelProps) => {
	const { t } = useTranslation("senders-management", { keyPrefix: "components.senderRequestFunnel.actions" })

	const { append, fields, remove, update } = useFieldArray({ control, name: "bulkListingsGroups" })

	const onTypeSelect = (selectedType: TemplateType | undefined) => {
		if (!selectedType) return

		bulkListingsGroups?.forEach((field, idx) => {
			if (field.type === selectedType) {
				update(idx, { listingsFields: field.listingsFields, type: undefined })
			}
		})
	}

	return (
		<>
			{fields?.map(({ id }, SenderRequestsGroupsIdx) => (
				<div className='flex w-full flex-col gap-4 rounded-xl bg-white p-4' key={id}>
					<Form.Field
						control={control}
						name={`bulkListingsGroups.${SenderRequestsGroupsIdx}.type`}
						render={({ field }) => (
							<Form.Item className='w-full max-w-[340px]'>
								<Form.Label>Template Type *</Form.Label>
								<SelectSingleTemplateType
									onValueChange={(selectedType) => {
										onTypeSelect(selectedType)
										field.onChange(selectedType)
									}}
									placeholder='Select type'
									value={field.value}
								/>
								<Form.Message />
							</Form.Item>
						)}
					/>

					<ListingField
						control={control}
						// disableNewRequest={disableNewRequest}
						removeType={fields?.length > 1 ? () => remove(SenderRequestsGroupsIdx) : undefined}
						SenderRequestsGroupsIdx={SenderRequestsGroupsIdx}
					/>
				</div>
			))}

			<Button
				className='me-auto mt-2 w-max shrink-0 gap-2 bg-primary-600'
				// Max number of allowed types === 3 (PROMOTIONAL - TRANSACTIONAL - OTP)
				// disabled={fields?.length >= 3 || disableNewRequest}
				disabled={fields?.length >= 3}
				onClick={() => append([emptyBulkListingsGroup])}
				size='sm'
				type='button'>
				<span className='text-lg'>+</span>
				{t("addType")}
			</Button>
		</>
	)
}

export default BulkListingsFunnel
