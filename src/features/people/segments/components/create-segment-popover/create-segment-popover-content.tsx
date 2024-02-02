//#region Import
import { zodResolver } from "@hookform/resolvers/zod"
import { useMemo } from "react"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"

import { useAdvancedFiltersDialogContext } from "@/features/people/contacts/dialogs/advanced-filters-dialog/advanced-filters-dialog-context"
import { useCreateSegmentMutation } from "@/features/people/segments/api"
import SegmentSchema, { type SegmentSchemaType } from "@/features/people/segments/schemas/segment-schema"
import { createSegmentArgsType } from "@/features/people/segments/types"
import { areConditionsValid } from "@/features/people/segments/utils"
import { useForm, Button, Footer, Form, Input } from "@/ui"
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

	const onSubmit = async ({ name, description }: SegmentSchemaType) => {
		if (!areEditableConditionsValid) return

		const body: createSegmentArgsType = {
			name,
			description,
			contactSegmentConditionList: conditions?.map((condition) => ({
				id: condition?.id,
				contactSegmentRuleList: condition?.rules?.map((rule) => ({
					id: rule?.id,
					contactSegmentRuleAttribute: rule?.attribute,
					contactSegmentRuleCondition: rule?.condition,
					specification: rule?.specification,
					country: rule?.country,
					groupId: rule?.group?.value,
					contactSegmentId: rule?.segment?.value,
				})),
			})),
		}

		await triggerCreateSegment(body)
			.unwrap()
			.then(() => {
				toast.success(t("successMessage"))
				onClose()
			})
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
				<Form.Field
					control={form.control}
					name='name'
					render={({ field }) => (
						<Form.Item>
							<Form.Label size={"default"}>{t("fields.name.label")}*</Form.Label>
							<Form.Control>
								<Input size={"default"} placeholder={t("fields.name.placeholder")} {...field} />
							</Form.Control>
							<Form.Message />
						</Form.Item>
					)}
				/>
				<Form.Field
					control={form.control}
					name='description'
					render={({ field }) => (
						<Form.Item className='pb-4'>
							<Form.Label size={"default"}>{t("fields.description.label")}</Form.Label>
							<Form.Control>
								<Input size={"default"} placeholder={t("fields.description.placeholder")} {...field} />
							</Form.Control>
							<Form.Message />
						</Form.Item>
					)}
				/>

				<Footer>
					<Button type='submit' loading={isCreateSegmentLoading} className='px-6' variant='secondary' size='sm'>
						{t("actions.create")}
					</Button>
				</Footer>
			</form>
		</Form>
	)
}

export default CreateSegmentPopoverContent
