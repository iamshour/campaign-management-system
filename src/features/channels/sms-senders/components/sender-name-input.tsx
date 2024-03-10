//#region Import
import InputWithSearch from "@/core/components/input-with-search/input-with-search"
import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import { useGetSmsSendersQuery } from "@/features/channels/common/api"
import { forwardRef, useState } from "react"
import { useTranslation } from "react-i18next"
//#endregion

interface SenderNameInputProps extends Omit<React.ComponentPropsWithoutRef<typeof InputWithSearch>, "fetchState"> {}

const SenderNameInput = forwardRef<React.ElementRef<typeof InputWithSearch>, SenderNameInputProps>(
	({ onChange, value, ...props }, ref) => {
		const { t } = useTranslation("sms-senders", { keyPrefix: "components.smsSenderRequestForm.placeholders" })

		const [shouldFetch, setShouldFetch] = useState<boolean>(false)

		const { suggestions } = useGetSmsSendersQuery(
			{
				channelType: "SMS_LOCAL", //TODO: use correct channelType
				limit: 4,
				name: value,
				offset: 0,
			},
			{
				selectFromResult: ({ data, ...rest }) => ({
					// TODO: in integration remove below 'filter' and 'slice' since filter and pagination will be done on backend
					suggestions: data?.list
						?.map((sender) => sender.channelSourceName)
						?.filter((senderName) => senderName.includes(value))
						?.slice(0, 4),
					...rest,
				}),

				skip: !shouldFetch,
				...baseQueryConfigs,
			}
		)

		return (
			<InputWithSearch
				fetchState={{ setShouldFetch, suggestions }}
				onChange={onChange}
				placeholder={t("name")}
				ref={ref}
				value={value}
				{...props}
			/>
		)
	}
)

SenderNameInput.displayName = "SenderNameInput"

export default SenderNameInput
