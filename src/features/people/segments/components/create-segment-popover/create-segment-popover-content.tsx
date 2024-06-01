//#region Import
import { useAdvancedFiltersDialogContext } from "@/features/people/contacts/dialogs/advanced-filters-dialog/advanced-filters-dialog-context"
import { useCreateSegmentMutation } from "@/features/people/segments/api"
import SegmentSchema, { type SegmentSchemaType } from "@/features/people/segments/schemas/segment-schema"
import { CreateSegmentBody } from "@/features/people/segments/types"
import { areConditionsValid } from "@/features/people/segments/utils"
import { Button, Form, Input, useForm } from "@/ui"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMemo } from "react"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
//#endregion

export interface CreateSegmentPopoverContentProps {
	/**
	 * Callback function used to close the popover
	 */
	onClose: () => void
}

const CreateSegmentPopoverContent = ({ onClose }: CreateSegmentPopoverContentProps) => {
	const { t } = useTranslation("segments", { keyPrefix: "components.createSegmentPopover" })

	const form = useForm<SegmentSchemaType>({ resolver: zodResolver(SegmentSchema) })

	const [triggerCreateSegment, { isLoading: isCreateSegmentLoading }] = useCreateSegmentMutation()

	const { conditions } = useAdvancedFiltersDialogContext()

	const areEditableConditionsValid = useMemo(() => areConditionsValid(conditions), [conditions])

	const onSubmit = async ({ description, name }: SegmentSchemaType) => {
		if (!areEditableConditionsValid) return

		const body: CreateSegmentBody = {
			contactSegmentConditionList: conditions?.map((condition) => ({
				contactSegmentRuleList: condition?.rules?.map((rule) => ({
					contactSegmentId: rule?.segment?.value,
					contactSegmentRuleAttribute: rule?.attribute,
					contactSegmentRuleCondition: rule?.condition,
					country: rule?.country,
					groupId: rule?.group?.value,
					id: rule?.id,
					specification: rule?.specification,
				})),
				id: condition?.id,
			})),
			description,
			name,
		}

		await triggerCreateSegment(body).unwrap()

		toast.success(t("successMessage"))
		onClose()
	}

	return (
		<Form {...form}>
			<form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
				<Form.Field
					control={form.control}
					name='name'
					render={({ field }) => (
						<Form.Item label={t("fields.name.label")} required>
							<Input placeholder={t("fields.name.placeholder")} {...field} />
						</Form.Item>
					)}
				/>
				<Form.Field
					control={form.control}
					name='description'
					render={({ field }) => (
						<Form.Item className='pb-4' label={t("fields.description.label")}>
							<Input placeholder={t("fields.description.placeholder")} {...field} />
						</Form.Item>
					)}
				/>

				<Button
					className='ms-auto w-full px-6 sm:w-max'
					loading={isCreateSegmentLoading}
					size='sm'
					type='submit'
					variant='secondary'>
					{t("actions.create")}
				</Button>
			</form>
		</Form>
	)
}

export default CreateSegmentPopoverContent
