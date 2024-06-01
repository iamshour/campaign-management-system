//#region Import
import type { ChannelSourceListingStatus } from "@/features/channels/common/types/data.types"

import smsListingStatusesLocaleMap from "@/features/channels/common/constants/sms-listing-statuses-locale-map"
import { Label, SelectMultiOptionsPopover } from "@/ui"
import { useTranslation } from "react-i18next"
//#endregion

interface selectMultiListingStatusesPopoverProps
	extends Omit<React.ComponentPropsWithoutRef<typeof SelectMultiOptionsPopover>, "options" | "value"> {
	label?: string
	value?: ChannelSourceListingStatus[]
}

const SelectMultiListingStatusesPopover = ({
	label,
	placeholder,
	value,
	...props
}: selectMultiListingStatusesPopoverProps) => {
	const { t } = useTranslation("senders-management")

	return (
		<div className='relative w-full max-w-[340px]'>
			<Label>{label || t("components.selectMultiListingStatusesPopover.label")}</Label>

			<SelectMultiOptionsPopover
				options={Object.entries(smsListingStatusesLocaleMap).map(([value, label]) => ({ label: t(label), value }))}
				placeholder={placeholder ?? t("components.selectMultiListingStatusesPopover.placeholder")}
				value={value?.length ? value?.map((op) => ({ label: t(smsListingStatusesLocaleMap[op]), value: op })) : []}
				{...props}
			/>
		</div>
	)
}

export default SelectMultiListingStatusesPopover
