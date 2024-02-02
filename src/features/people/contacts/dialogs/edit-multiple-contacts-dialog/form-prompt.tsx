import { Form, Input } from "@/ui"
import { useTranslation } from "react-i18next"

type DialogFormData = { prompt?: number; tags: string[]; groups: string[] }

interface FormPromptProps extends Pick<React.ComponentPropsWithoutRef<typeof Form.Field<DialogFormData>>, "control"> {
	label: string
}

const FormPrompt = ({ label, ...props }: FormPromptProps) => {
	const { t } = useTranslation("ui")

	return (
		<Form.Field
			name='prompt'
			{...props}
			render={({ field }) => (
				<Form.Item className='mb-2 w-full'>
					<Form.Label>{label}</Form.Label>
					<Form.Control>
						<Input size='lg' className='w-full' placeholder={t("ui:prompt-input.placeholder")} {...field} />
					</Form.Control>
					<Form.Message />
				</Form.Item>
			)}
		/>
	)
}

export default FormPrompt
