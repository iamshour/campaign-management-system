//#region Import
import type { DataViewKey } from "@/core/components/data-view/types"
import type { ChannelSourceListingFilter } from "@/features/channels/common/types/api.types"
import type { ChannelSource } from "@/features/channels/common/types/data.types"

import { selectFilters, updateFilters } from "@/core/components/data-view/data-view-slice"
import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import CreateChannelSourceRequestDialog from "@/features/channels/sms-senders/dialogs/create-channel-source-request-dialog/create-channel-source-request-dialog"
import templateTypesOptions from "@/features/templates/common/constants/template-types-options"
import { Button } from "@/ui"
import HeroiconsPlus16Solid from "~icons/heroicons/plus-16-solid"
import { useTranslation } from "react-i18next"
//#endregion

interface ChannelSourceViewTopbarProps extends Pick<ChannelSource, "channelSourceName"> {
	dataViewKey: Extract<DataViewKey, "international-sms-channel-source-listings" | "local-sms-channel-source-listings">
}

const ChannelSourceViewTopbar = ({ channelSourceName, dataViewKey }: ChannelSourceViewTopbarProps) => {
	const { t } = useTranslation("sms-senders")

	const dispatch = useDispatch()

	const filters = useSelector<ChannelSourceListingFilter>(
		(state) => selectFilters(state, dataViewKey) as ChannelSourceListingFilter
	)

	return (
		<div className='mb-8 flex flex-row flex-wrap justify-between'>
			<div className='flex flex-row gap-5'>
				{templateTypesOptions?.map((type) => (
					<Button
						className={!filters?.templateTypes?.includes(type.value) ? "bg-[#F7F7F7] font-normal text-black" : ""}
						key={type.value}
						onClick={() => dispatch(updateFilters({ [dataViewKey]: { templateTypes: [type.value] } }))}
						variant='secondary'>
						{t(type.label)}
					</Button>
				))}
			</div>

			<CreateChannelSourceRequestDialog defaultValues={{ sender: channelSourceName }} formType='addRequest'>
				<Button>
					<HeroiconsPlus16Solid />
					{t("views.channelSourceView.actions.addRequest")}
				</Button>
			</CreateChannelSourceRequestDialog>
		</div>
	)
}

export default ChannelSourceViewTopbar
