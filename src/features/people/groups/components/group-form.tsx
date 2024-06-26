//#region Import
import GroupSchema, { type GroupSchemaType } from "@/features/people/groups/schemas/group-schema"
import { Form, Input, useForm, UseFormReturn } from "@/ui"
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
			<form
				className={twMerge("flex h-full w-full flex-col justify-between gap-6 overflow-y-auto p-2", className)}
				onSubmit={form.handleSubmit(onFormSubmit)}>
				<div className='flex flex-1 flex-col gap-4 '>
					<Form.Field
						control={form.control}
						name='groupName'
						render={({ field }) => (
							<Form.Item label={t("fields.name.label")} size={size}>
								<Input placeholder={t("fields.name.placeholder")} {...field} />
							</Form.Item>
						)}
					/>
					<Form.Field
						control={form.control}
						name='groupDescription'
						render={({ field }) => (
							<Form.Item label={t("fields.description.label")} size={size}>
								<Input placeholder={t("fields.description.placeholder")} {...field} />
							</Form.Item>
						)}
					/>
				</div>

				{children}
			</form>
		</Form>
	)
}

export default GroupForm
