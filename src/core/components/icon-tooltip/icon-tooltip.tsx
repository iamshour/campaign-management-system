//#region Import
import { Tooltip } from "@/ui"
import MdiInformationVariantCircle from "~icons/mdi/information-variant-circle"
//#endregion

const IconTooltip = (props: React.ComponentPropsWithoutRef<typeof Tooltip>) => (
	<Tooltip align='start' alignOffset={8} side='top' sideOffset={0} {...props}>
		<div>
			<MdiInformationVariantCircle className='shrink-0 text-sm text-primary-600' />
		</div>
	</Tooltip>
)

export default IconTooltip
