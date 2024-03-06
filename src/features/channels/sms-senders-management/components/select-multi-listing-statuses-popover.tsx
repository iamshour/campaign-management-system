//#region Import
import type { SmsListingStatus } from "@/features/channels/common/types"

import smsListingStatusesLocaleMap from "@/features/channels/common/constants/sms-listing-statuses-locale-map"
import { MultiSelectPopover } from "@/ui"
import { useTranslation } from "react-i18next"
//#endregion

interface selectMultiListingStatusesPopoverProps
	extends Omit<React.ComponentPropsWithoutRef<typeof MultiSelectPopover>, "options" | "value"> {
	value?: SmsListingStatus[]
}

const SelectMultiListingStatusesPopover = ({
	label,
	placeholder,
	value,
	...props
}: selectMultiListingStatusesPopoverProps) => {
	const { t } = useTranslation("senders-management")

	return (
		<MultiSelectPopover
			label={label ?? t("components.selectMultiListingStatusesPopover.label")}
			options={Object.entries(smsListingStatusesLocaleMap).map(([value, label]) => ({ label: t(label), value }))}
			placeholder={placeholder ?? t("components.selectMultiListingStatusesPopover.placeholder")}
			value={value?.length ? value?.map((op) => ({ label: t(smsListingStatusesLocaleMap[op]), value: op })) : []}
			{...props}
		/>
	)
}

export default SelectMultiListingStatusesPopover
