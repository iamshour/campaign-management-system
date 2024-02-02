//#region Import
import { Button, Footer, Form, Input, useForm } from "@blueai/ui"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMemo, useState } from "react"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useLocation, useNavigate } from "react-router-dom"

import appPaths from "@/core/constants/app-paths"

import { useCreateSegmentMutation, useUpdateSegmentMutation } from "../api"
import SegmentCollapsible from "../components/segment-collapsible"
import SegmentsFunnelEditable from "../components/segments-funnel-editable"
import { emptySegmentCondition } from "../constants/preset-segments"
import SegmentSchema, { type SegmentSchemaType } from "../schemas/segment-schema"
import type { Segment, SegmentConditionType, createSegmentArgsType } from "../types"
import { areConditionsValid } from "../utils"

import MdiFileDocument from "~icons/mdi/file-document"
import MdiInformationVariantCircle from "~icons/mdi/information-variant-circle"
//#endregion

interface EditableSegmentViewProps {
	/**
	 * Prop indicating to where this component is used
	 * Either for creating a new Segment or editing a preiously created one
	 */
	view: "editSegment" | "createSegment"

	/**
	 * Default Values passed if this view is used to edit a previously created segment. @default {}
	 */
	defaultValues?: Pick<Segment, "id" | "name" | "description"> & {
		conditions?: SegmentConditionType[]
	}
}

const EditableSegmentView = ({ defaultValues, view }: EditableSegmentViewProps) => {
	const { state } = useLocation()
	const { t } = useTranslation("segments", { keyPrefix: "views.editableSegmentView" })

	const navigate = useNavigate()

	const [conditions, setConditions] = useState<SegmentConditionType[]>(
		defaultValues?.conditions ?? [emptySegmentCondition]
	)

	const form = useForm<SegmentSchemaType>({
		resolver: zodResolver(SegmentSchema),
		values: {
			name: defaultValues?.name ?? "",
			description: defaultValues?.description,
		},
	})

	const [triggerCreateSegment, { isLoading: isCreateSegmentLoading }] = useCreateSegmentMutation()
	const [triggerUpdateSegment, { isLoading: isUpdateSegmentLoading }] = useUpdateSegmentMutation()

	const areFunnelConditionsValid = useMemo(
		() => form.formState.isValid && areConditionsValid(conditions),
		[conditions, form.formState.isValid]
	)

	const onSucess = (message: string) => {
		navigate(state?.from || appPaths.SEGMENTS)
		toast.success(message)
	}

	const onFormSubmit = async (data: SegmentSchemaType) => {
		if (!areFunnelConditionsValid || !view) return

		const transformedBody: createSegmentArgsType = {
			...data,
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

		if (view === "createSegment") {
			await triggerCreateSegment(transformedBody)
				.unwrap()
				.then(() => onSucess("Segment created successfully!"))
		} else {
			// else, updating
			await triggerUpdateSegment({ ...transformedBody, id: defaultValues?.id as string })
				.unwrap()
				.then(() => onSucess("Segment updated successfully!"))
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onFormSubmit)} className='flex h-full w-full flex-col gap-4 p-6'>
				<h2 className='text-[21px] font-medium'>{t(`title.${view}`)}</h2>

				<div className='flex flex-col gap-4 overflow-y-auto pe-2'>
					<SegmentCollapsible
						open
						title={t("items.basicInfo.title")}
						description={t(`items.basicInfo.description.${view}`)}
						icon={MdiInformationVariantCircle}>
						<div className='flex gap-8 p-2 pt-8'>
							<Form.Field
								control={form.control}
								name='name'
								render={({ field }) => (
									<Form.Item>
										<Form.Label>{t("items.basicInfo.fields.name.label")} *</Form.Label>
										<Form.Control>
											<Input
												className='bg-white'
												size='lg'
												placeholder={t("items.basicInfo.fields.name.placeholder")}
												{...field}
											/>
										</Form.Control>
										<Form.Message />
									</Form.Item>
								)}
							/>
							<Form.Field
								control={form.control}
								name='description'
								render={({ field }) => (
									<Form.Item>
										<Form.Label>{t("items.basicInfo.fields.description.label")}</Form.Label>
										<Form.Control>
											<Input
												className='bg-white'
												size='lg'
												placeholder={t("items.basicInfo.fields.description.placeholder")}
												{...field}
											/>
										</Form.Control>
										<Form.Message />
									</Form.Item>
								)}
							/>
						</div>
					</SegmentCollapsible>

					<SegmentCollapsible
						title={t(`items.conditions.title`)}
						description={t(`items.conditions.description.${view}`)}
						icon={MdiFileDocument}>
						<SegmentsFunnelEditable conditions={conditions} setConditions={setConditions} />
					</SegmentCollapsible>
				</div>

				<Footer className='flex-1 items-end'>
					<Button type='reset' variant='outline' onClick={() => navigate(state?.from || appPaths.SEGMENTS)}>
						{t("actions.cancel")}
					</Button>

					<Button
						type='submit'
						disabled={!areFunnelConditionsValid}
						loading={isCreateSegmentLoading || isUpdateSegmentLoading}>
						{t(`actions.submit.${view}`)}
					</Button>
				</Footer>
			</form>
		</Form>
	)
}

export default EditableSegmentView
