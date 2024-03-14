//#region Import
import type { ChannelSourceListingStatus } from "@/features/channels/common/types/data.types"

import channelSourceStatusesOptions from "@/features/channels/sms-senders-management/constants/channel-source-statuses-options"
import { SelectSingleOptionPopover } from "@/ui"
import { useTranslation } from "react-i18next"
//#endregion

interface SelectSingleListingStatusPopoverProps
	extends Omit<
		React.ComponentPropsWithoutRef<
			typeof SelectSingleOptionPopover<Extract<ChannelSourceListingStatus, "APPROVED" | "BLOCKED">>
		>,
		"className" | "options" | "triggerProps"
	> {
	readOnly?: boolean
}

/**
 * @IMPORTANT
 * This component is only used in the form for creating bulk listings.
 *
 * Status options are filtered since users can only choose to create a listing in approved or blocked status.
 */
const SelectSingleListingStatusPopover = ({
	label,
	placeholder,
	readOnly,
	...props
}: SelectSingleListingStatusPopoverProps) => {
	const { t } = useTranslation("senders-management")

	return (
		<SelectSingleOptionPopover
			{...props}
			label={label || `${t("components.selectSingleListingStatusPopover.label")}`}
			options={channelSourceStatusesOptions
				.filter((status) => ["APPROVED", "BLOCKED"].includes(status.value))
				.map(({ label, value }) => ({
					label: t(label),
					value,
				}))}
			placeholder={placeholder || t("components.selectSingleListingStatusPopover.placeholder")}
			triggerProps={{ className: "text-base", readOnly }}
		/>
	)
}

export default SelectSingleListingStatusPopover
