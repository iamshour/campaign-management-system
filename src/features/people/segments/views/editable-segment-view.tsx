//#region Import
import appPaths from "@/core/constants/app-paths"
import { Button, Footer, Form, Input, useForm } from "@/ui"
import { zodResolver } from "@hookform/resolvers/zod"
import MdiFileDocument from "~icons/mdi/file-document"
import MdiInformationVariantCircle from "~icons/mdi/information-variant-circle"
import { useMemo, useState } from "react"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useLocation, useNavigate } from "react-router-dom"

import type { CreateSegmentBody, Segment, SegmentConditionType } from "../types"

import { useCreateSegmentMutation, useUpdateSegmentMutation } from "../api"
import SegmentCollapsible from "../components/segment-collapsible"
import SegmentsFunnelEditable from "../components/segments-funnel-editable/segments-funnel-editable"
import { emptySegmentCondition } from "../constants/preset-segments"
import SegmentSchema, { type SegmentSchemaType } from "../schemas/segment-schema"
import { areConditionsValid } from "../utils"
//#endregion

interface EditableSegmentViewProps {
	/**
	 * Default Values passed if this view is used to edit a previously created segment. @default {}
	 */
	defaultValues?: Pick<Segment, "description" | "id" | "name"> & {
		conditions?: SegmentConditionType[]
	}

	/**
	 * Prop indicating to where this component is used
	 * Either for creating a new Segment or editing a preiously created one
	 */
	view: "createSegment" | "editSegment"
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
			description: defaultValues?.description,
			name: defaultValues?.name ?? "",
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

		const transformedBody: CreateSegmentBody = {
			...data,
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
		}

		if (view === "createSegment") {
			await triggerCreateSegment(transformedBody).unwrap()
			onSucess("Segment created successfully!")
		} else {
			// else, updating
			await triggerUpdateSegment({ ...transformedBody, id: defaultValues?.id as string }).unwrap()
			onSucess("Segment updated successfully!")
		}
	}

	return (
		<Form {...form}>
			<form className='flex h-full w-full flex-col gap-4 p-6' onSubmit={form.handleSubmit(onFormSubmit)}>
				<h2 className='text-[21px] font-medium'>{t(`title.${view}`)}</h2>

				<div className='flex flex-col gap-4 overflow-y-auto pe-2'>
					<SegmentCollapsible
						description={t(`items.basicInfo.description.${view}`)}
						icon={MdiInformationVariantCircle}
						open
						title={t("items.basicInfo.title")}>
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
												placeholder={t("items.basicInfo.fields.name.placeholder")}
												size='lg'
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
												placeholder={t("items.basicInfo.fields.description.placeholder")}
												size='lg'
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
						description={t(`items.conditions.description.${view}`)}
						icon={MdiFileDocument}
						title={t(`items.conditions.title`)}>
						<SegmentsFunnelEditable conditions={conditions} setConditions={setConditions} />
					</SegmentCollapsible>
				</div>

				<Footer className='flex-1 items-end'>
					<Button as='link' to={state?.from || appPaths.SEGMENTS} type='reset' variant='outline'>
						{t("actions.cancel")}
					</Button>

					<Button
						disabled={!areFunnelConditionsValid}
						loading={isCreateSegmentLoading || isUpdateSegmentLoading}
						type='submit'>
						{t(`actions.submit.${view}`)}
					</Button>
				</Footer>
			</form>
		</Form>
	)
}

export default EditableSegmentView
