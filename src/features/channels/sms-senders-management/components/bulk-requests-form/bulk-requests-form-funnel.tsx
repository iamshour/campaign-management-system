//#region Import
import type { TemplateType } from "@/features/templates/common/types"

import SelectSingleTemplateTypePopover from "@/features/templates/common/components/select-single-template-type-popover"
import { Button, Form } from "@/ui"
import { type Control, useFieldArray } from "react-hook-form"
import { useTranslation } from "react-i18next"
import * as z from "zod"

import { useBulkRequestsFormContext } from "./bulk-requests-form-context"
import BulkRequestsFormField from "./bulk-requests-form-field"
import { type BulkRequestsFormSchemaType, defaultEmptyField } from "./configs"
//#endregion

interface BulkRequestsFormFunnelProps {
	bulkListingsGroups: z.infer<BulkRequestsFormSchemaType>["bulkListingsGroups"]

	control: Control<z.infer<BulkRequestsFormSchemaType>>
}

const BulkRequestsFormFunnel = ({ bulkListingsGroups, control }: BulkRequestsFormFunnelProps) => {
	const { funnelKey } = useBulkRequestsFormContext()

	const { t } = useTranslation("senders-management", { keyPrefix: "components.senderRequestFunnel.actions" })

	const { append, fields, remove, update } = useFieldArray({ control, name: "bulkListingsGroups" })

	const onTypeSelect = (selectedType: TemplateType | undefined) => {
		if (!selectedType) return

		bulkListingsGroups?.forEach((field, idx) => {
			if (field.templateType === selectedType) {
				update(idx, { listingsFields: field.listingsFields, templateType: "" as TemplateType })
			}
		})
	}

	return (
		<>
			{fields?.map(({ id }, SenderRequestsGroupsIdx) => (
				<div className='flex w-full flex-col gap-4 rounded-xl bg-white p-4' key={id}>
					<Form.Field
						control={control}
						name={`bulkListingsGroups.${SenderRequestsGroupsIdx}.templateType`}
						render={({ field }) => (
							<Form.Item label='Template Type' required size='lg'>
								<SelectSingleTemplateTypePopover
									onValueChange={(selectedType) => {
										onTypeSelect(selectedType)
										field.onChange(selectedType)
									}}
									value={field.value}
								/>
							</Form.Item>
						)}
					/>

					<BulkRequestsFormField
						control={control}
						removeType={fields?.length > 1 ? () => remove(SenderRequestsGroupsIdx) : undefined}
						SenderRequestsGroupsIdx={SenderRequestsGroupsIdx}
					/>
				</div>
			))}

			<Button
				className='me-auto mt-2 w-max shrink-0 gap-2 bg-primary-600'
				// Max number of allowed types === 3 (PROMOTIONAL - TRANSACTIONAL - OTP)
				disabled={fields?.length >= 3}
				onClick={() =>
					append([{ listingsFields: [defaultEmptyField[funnelKey as keyof typeof defaultEmptyField]] } as any])
				}
				size='sm'
				type='button'>
				<span className='text-lg'>+</span>
				{t("addType")}
			</Button>
		</>
	)
}

export default BulkRequestsFormFunnel
