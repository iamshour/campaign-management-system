//#region Import
import { Tooltip } from "@/ui"
import MdiInformationVariantCircle from "~icons/mdi/information-variant-circle"
//#endregion

const IconTooltip = ({ content }: { content: string }) => (
	<Tooltip>
		<Tooltip.Trigger asChild>
			<div>
				<MdiInformationVariantCircle className='shrink-0 text-sm text-inherit' />
			</div>
		</Tooltip.Trigger>

		<Tooltip.Content align='start' alignOffset={8} content={content} side='top' sideOffset={0} />
	</Tooltip>
)

export default IconTooltip
