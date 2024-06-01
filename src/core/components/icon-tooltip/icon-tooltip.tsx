//#region Import
import { Tooltip } from "@/ui"
import MdiInformationVariantCircle from "~icons/mdi/information-variant-circle"
import { twMerge } from "tailwind-merge"
//#endregion

interface IconTooltipProps extends React.ComponentPropsWithoutRef<typeof Tooltip> {
	triggerClassName?: string
}

const IconTooltip = ({ triggerClassName, ...props }: IconTooltipProps) => (
	<Tooltip align='start' alignOffset={8} side='top' sideOffset={0} {...props}>
		<span className={twMerge("text-sm", triggerClassName)}>
			<MdiInformationVariantCircle className='shrink-0 text-primary-600' />
		</span>
	</Tooltip>
)

export default IconTooltip
