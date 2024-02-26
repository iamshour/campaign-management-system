//#region Import
import type { OptionType } from "@/ui"
//#endregion

interface SegmentRuleReadonlyProps extends OptionType {
	showBadge?: boolean
}

const SegmentRuleReadonly = ({ label, showBadge, value }: SegmentRuleReadonlyProps) => (
	<div className='w-max max-w-full'>
		<h4 className='mb-1 truncate ps-1.5 text-sm font-bold'>{label}</h4>

		<div className='flex h-[40px] w-[340px] max-w-full items-center truncate rounded-md border border-[#E0E0E0] p-4 text-sm'>
			{showBadge ? <span className='h-max w-max rounded-md bg-primary-400 p-1 text-xs'>{value}</span> : value}
		</div>
	</div>
)

export default SegmentRuleReadonly
