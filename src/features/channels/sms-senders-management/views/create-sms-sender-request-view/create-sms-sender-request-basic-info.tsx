//#region Import
import IconTooltip from "@/core/components/icon-tooltip/icon-tooltip"
import SelectCompanyPopover from "@/features/channels/sms-senders-management/components/select-company-popover/select-company-popover"
import SenderNameInput from "@/features/channels/sms-senders/components/sender-name-input"
import { Form, Input } from "@/ui"
import { Control } from "react-hook-form"
import { useTranslation } from "react-i18next"

//#endregion

interface CreateSmsSenderRequestBasicInfoProps {
	control: Control<{ basicInfo: Record<"company" | "email" | "sender", string> }>
}

const CreateSmsSenderRequestBasicInfo = ({ control }: CreateSmsSenderRequestBasicInfoProps) => {
	const { t } = useTranslation("sms-senders")

	return (
		<div className='flex w-full flex-wrap gap-4'>
			<Form.Field
				control={control}
				name={`basicInfo.company`}
				render={({ field }) => (
					<Form.Item>
						<SelectCompanyPopover
							isMulti={false}
							selection={{ label: field.value, value: field.value }}
							size='lg'
							updateSelection={(op) => field.onChange(op?.value)}
						/>
						<Form.Message />
					</Form.Item>
				)}
			/>

			<Form.Field
				control={control}
				name='basicInfo.email'
				render={({ field }) => (
					<Form.Item>
						<Form.Label>
							Client Email
							{/* {t("fields.firstName")} */}
						</Form.Label>
						<Form.Control>
							<Input
								className='rounded-lg bg-white'
								// placeholder={t("components.contactForm.placeholders.firstName")}
								placeholder='Enter email'
								size='lg'
								{...field}
							/>
						</Form.Control>
						<Form.Message />
					</Form.Item>
				)}
			/>

			<Form.Field
				control={control}
				name='basicInfo.sender'
				render={({ field }) => (
					<Form.Item>
						<Form.Label className='flex h-[20px] flex-row items-center gap-2'>
							{t("fields.name")} *
							<IconTooltip content='tooltip content here...' />
						</Form.Label>
						<SenderNameInput className='rounded-lg bg-white' onChange={field.onChange} value={field.value} />
						<Form.Message />
					</Form.Item>
				)}
			/>
		</div>
	)
}

export default CreateSmsSenderRequestBasicInfo
