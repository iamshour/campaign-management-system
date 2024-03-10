//#region Import
import InputWithSearch from "@/core/components/input-with-search/input-with-search"
import useGetChannelType from "@/core/hooks/useGetChannelType"
import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import { useGetChannelSourcesQuery } from "@/features/channels/common/api"
import { forwardRef, useState } from "react"
import { useTranslation } from "react-i18next"
//#endregion

interface SenderNameInputProps extends Omit<React.ComponentPropsWithoutRef<typeof InputWithSearch>, "fetchState"> {}

const SenderNameInput = forwardRef<React.ElementRef<typeof InputWithSearch>, SenderNameInputProps>(
	({ onChange, value, ...props }, ref) => {
		const { t } = useTranslation("sms-senders", { keyPrefix: "components.smsSenderRequestForm.placeholders" })

		const { channelType } = useGetChannelType()

		const [shouldFetch, setShouldFetch] = useState<boolean>(false)

		const { suggestions } = useGetChannelSourcesQuery(
			{ channelType, limit: 4, name: value, offset: 0 },
			{
				selectFromResult: ({ data, ...rest }) => ({
					suggestions: data?.list?.map(({ channelSourceName }) => channelSourceName),
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
