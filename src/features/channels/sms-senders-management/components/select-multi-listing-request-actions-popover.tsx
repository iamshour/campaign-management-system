//#region Import
import type { ChannelSourceRequestAction } from "@/features/channels/common//types/data.types"

import smsListingRequestsActionsLocalMap from "@/features/channels/common/constants/sms-listing-request-actions-local-map"
import { SelectMultiOptionsPopover } from "@/ui"
import { useTranslation } from "react-i18next"
//#endregion

interface SelectMultiListingRequestActionsPopoverProps
	extends Omit<React.ComponentPropsWithoutRef<typeof SelectMultiOptionsPopover>, "options" | "value"> {
	value?: ChannelSourceRequestAction[]
}

const SelectMultiListingRequestActionsPopover = ({
	label,
	placeholder,
	value,
	...props
}: SelectMultiListingRequestActionsPopoverProps) => {
	const { t } = useTranslation("senders-management")

	return (
		<SelectMultiOptionsPopover
			label={label ?? t("components.selectMultiListingRequestActionPopover.label")}
			options={Object.entries(smsListingRequestsActionsLocalMap)?.map(([value, label]) => ({ label: t(label), value }))}
			placeholder={placeholder ?? t("components.selectMultiListingRequestActionPopover.placeholder")}
			value={value?.length ? value?.map((op) => ({ label: t(smsListingRequestsActionsLocalMap[op]), value: op })) : []}
			{...props}
		/>
	)
}

export default SelectMultiListingRequestActionsPopover
