//#region Import
import { Tooltip } from "@/ui"

import MdiInformationVariantCircle from "~icons/mdi/information-variant-circle"
//#endregion

const IconTooltip = ({ content }: { content: string }) => (
	<Tooltip>
		<Tooltip.Trigger asChild>
			<div>
				<MdiInformationVariantCircle className='shrink-0 text-sm text-primary-600' />
			</div>
		</Tooltip.Trigger>

		<Tooltip.Content side='top' align='start' sideOffset={0} alignOffset={8} content={content} />
	</Tooltip>
)

export default IconTooltip
