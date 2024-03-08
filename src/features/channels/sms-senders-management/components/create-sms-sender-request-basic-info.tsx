//#region Import
import IconTooltip from "@/core/components/icon-tooltip/icon-tooltip"
import SelectCompanyPopover from "@/features/channels/sms-senders-management/components/select-company-popover/select-company-popover"
import SenderNameInput from "@/features/channels/sms-senders/components/sender-name-input"
import { Form, type OptionType } from "@/ui"
import { Control, useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"

import SelectCompanyUsersPopover from "./select-company-users-popover/select-company-users-popover"
//#endregion

export type CreateSmsSenderRequestBasicInfoType = {
	basicInfo: Record<"company" | "email", OptionType> & { sender: string }
}

interface CreateSmsSenderRequestBasicInfoProps {
	control: Control<CreateSmsSenderRequestBasicInfoType>
}

const CreateSmsSenderRequestBasicInfo = ({ control }: CreateSmsSenderRequestBasicInfoProps) => {
	const { t } = useTranslation("channels-common")

	const { getValues, setValue } = useFormContext()

	const selectedCompanyId = getValues("basicInfo.company")?.value

	return (
		<div className='flex w-full flex-wrap gap-4'>
			<Form.Field
				control={control}
				name={`basicInfo.company`}
				render={({ field }) => (
					<Form.Item>
						<SelectCompanyPopover
							isMulti={false}
							selection={field.value}
							size='lg'
							updateSelection={(option) => {
								field.onChange(option)

								// Clearing User Email when changing
								setValue("basicInfo.email", undefined)
							}}
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
						<SelectCompanyUsersPopover
							companyId={selectedCompanyId}
							disabled={!selectedCompanyId}
							isMulti={false}
							selection={field.value}
							size='lg'
							updateSelection={field.onChange}
						/>
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
							{t("fields.sender")} *
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
