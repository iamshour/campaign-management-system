//#region Import
import GroupSchema, { type GroupSchemaType } from "@/features/people/groups/schemas/group-schema"
import { Footer, Form, Input, useForm, UseFormReturn } from "@/ui"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslation } from "react-i18next"
import { twMerge } from "tailwind-merge"
//#endregion

interface GroupFormProps extends Pick<React.ComponentPropsWithoutRef<typeof Input>, "size"> {
	children: React.ReactNode

	className?: string

	defaultValues?: GroupSchemaType

	onSubmit: (data: GroupSchemaType, form: UseFormReturn<GroupSchemaType>) => void
}

const GroupForm = ({ children, className, defaultValues, onSubmit, size }: GroupFormProps) => {
	const { t } = useTranslation("groups", { keyPrefix: "components.groupsPopover.createNewPopover" })

	const form = useForm<GroupSchemaType>({
		defaultValues,
		resolver: zodResolver(GroupSchema),
	})

	const onFormSubmit = (groupData: GroupSchemaType) => onSubmit(groupData, form)

	return (
		<Form {...form}>
			<form className={twMerge("space-y-4 overflow-y-auto p-2", className)} onSubmit={form.handleSubmit(onFormSubmit)}>
				<Form.Field
					control={form.control}
					name='groupName'
					render={({ field }) => (
						<Form.Item>
							<Form.Label size={size}>{t("fields.name.label")}</Form.Label>
							<Form.Control>
								<Input placeholder={t("fields.description.placeholder")} size={size} {...field} />
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
								<Input placeholder={t("fields.description.placeholder")} size={size} {...field} />
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
