//#region Import
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslation } from "react-i18next"
import { twMerge } from "tailwind-merge"

import GroupSchema, { type GroupSchemaType } from "@/features/people/groups/schemas/group-schema"
import { Footer, Form, Input, UseFormReturn, useForm } from "@/ui"
//#endregion

interface GroupFormProps {
	onSubmit: (data: GroupSchemaType, form: UseFormReturn<GroupSchemaType>) => void

	children: React.ReactNode

	defaultValues?: GroupSchemaType

	className?: string

	size?: React.ComponentPropsWithoutRef<typeof Input>["size"]
}

const GroupForm = ({ children, onSubmit, defaultValues, className, size }: GroupFormProps) => {
	const { t } = useTranslation("groups", { keyPrefix: "components.groupsPopover.createNewPopover" })

	const form = useForm<GroupSchemaType>({
		resolver: zodResolver(GroupSchema),
		defaultValues,
	})

	const onFormSubmit = (groupData: GroupSchemaType) => onSubmit(groupData, form)

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onFormSubmit)} className={twMerge("space-y-4 overflow-y-auto p-2", className)}>
				<Form.Field
					control={form.control}
					name='groupName'
					render={({ field }) => (
						<Form.Item>
							<Form.Label size={size}>{t("fields.name.label")}</Form.Label>
							<Form.Control>
								<Input size={size} placeholder={t("fields.description.placeholder")} {...field} />
							</Form.Control>
							<Form.Message />
						</Form.Item>
					)}
				/>
				<Form.Field
					control={form.control}
					name='groupDescription'
					render={({ field }) => (
						<Form.Item className='pb-4'>
							<Form.Label size={size}>{t("fields.description.label")}</Form.Label>
							<Form.Control>
								<Input size={size} placeholder={t("fields.description.placeholder")} {...field} />
							</Form.Control>
							<Form.Message />
						</Form.Item>
					)}
				/>
				<Footer>{children}</Footer>
			</form>
		</Form>
	)
}

export default GroupForm
