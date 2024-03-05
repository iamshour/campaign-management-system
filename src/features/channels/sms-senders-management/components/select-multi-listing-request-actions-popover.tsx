//#region Import
import { MultiSelectPopover } from "@/ui"
import { useTranslation } from "react-i18next"

import type { RequestActionType } from "../types"

import smsListingRequestsActionsLocalMap from "../constants/sms-listing-request-actions-local-map"
//#endregion

interface SelectMultiListingRequestActionsPopoverProps
	extends Omit<React.ComponentPropsWithoutRef<typeof MultiSelectPopover>, "options" | "value"> {
	value?: RequestActionType[]
}

const SelectMultiListingRequestActionsPopover = ({
	label,
	value,
	...props
}: SelectMultiListingRequestActionsPopoverProps) => {
	const { t } = useTranslation("senders-management")

	return (
		<MultiSelectPopover
			{...props}
			label={label ?? t("components.selectMultiListingRequestActionPopover.label")}
			options={Object.entries(smsListingRequestsActionsLocalMap)?.map(([value, label]) => ({ label: t(label), value }))}
			value={
				value?.length
					? value?.map((op) => ({ label: t(smsListingRequestsActionsLocalMap[op as RequestActionType]), value: op }))
					: []
			}
		/>
	)
}

export default SelectMultiListingRequestActionsPopover
