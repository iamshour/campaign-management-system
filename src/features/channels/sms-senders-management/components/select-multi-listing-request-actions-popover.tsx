//#region Import
import type { RequestActionType } from "@/features/channels/common/types"

import smsListingRequestsActionsLocalMap from "@/features/channels/common/constants/sms-listing-request-actions-local-map"
import { MultiSelectPopover } from "@/ui"
import { useTranslation } from "react-i18next"
//#endregion

interface SelectMultiListingRequestActionsPopoverProps
	extends Omit<React.ComponentPropsWithoutRef<typeof MultiSelectPopover>, "options" | "value"> {
	value?: RequestActionType[]
}

const SelectMultiListingRequestActionsPopover = ({
	label,
	placeholder,
	value,
	...props
}: SelectMultiListingRequestActionsPopoverProps) => {
	const { t } = useTranslation("senders-management")

	return (
		<MultiSelectPopover
			label={label ?? t("components.selectMultiListingRequestActionPopover.label")}
			options={Object.entries(smsListingRequestsActionsLocalMap)?.map(([value, label]) => ({ label: t(label), value }))}
			placeholder={placeholder ?? t("components.selectMultiListingRequestActionPopover.placeholder")}
			value={value?.length ? value?.map((op) => ({ label: t(smsListingRequestsActionsLocalMap[op]), value: op })) : []}
			{...props}
		/>
	)
}

export default SelectMultiListingRequestActionsPopover
