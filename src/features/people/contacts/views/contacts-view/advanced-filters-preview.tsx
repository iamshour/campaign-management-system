//#region Import
import Tooltip from "@package/ui/src/tooltip"
import { useTranslation } from "react-i18next"
import { v4 as newId } from "uuid"

import useSelector from "@/core/hooks/useSelector"
//#endregion

const AdvancedFiltersPreview = () => {
	const { t } = useTranslation("contacts")

	const advancedFilters = useSelector(({ advancedTable }) => advancedTable["contacts"]?.filters?.advancedFilters)
	const appliedSegment = advancedFilters?.segment?.label
	const appliedConditions = advancedFilters?.conditions

	return (
		<div className='pt-3'>
			<div className='-mx-4 flex whitespace-nowrap bg-[#2DAEF51C] px-4 py-1 font-bold text-[#054060]'>
				{t("components.advancedFiltersPreview.title")}
				{appliedSegment && (
					<Tooltip>
						<Tooltip.Trigger asChild>
							<span className='cursor-default overflow-hidden text-ellipsis ps-2'>
								{' "'}
								{appliedSegment}
								{'"'}
							</span>
						</Tooltip.Trigger>
						<Tooltip.Content content={appliedSegment} side={"top"} sideOffset={0} />
					</Tooltip>
				)}
			</div>

			{appliedConditions?.length == 0 && (
				<div className={"my-4 grid h-[200px] w-full place-content-center rounded-lg bg-white px-4"}>
					<h1 className='uppercase tracking-widest text-gray-500'>
						{t("components.advancedFiltersPreview.message.noResults")}
					</h1>
				</div>
			)}

			{/* TODO: handle rule text on filters bar close (add animation + remove flex wrap for rule sentence) */}
			<div>
				{appliedConditions?.map((condition) => (
					<div key={newId()} className='my-3 w-full whitespace-nowrap rounded-lg bg-white px-3 py-2'>
						{condition.rules.map((rule) => (
							<div
								key={newId()}
								className=' my-3 flex w-full flex-row flex-wrap break-all rounded-lg bg-[#edf3f7] px-3 py-2'>
								<span className='pe-2 text-[#2DAEF5]'>{rule.attribute}</span>
								<span className='pe-2'>{rule.condition}</span>
								<span className='text-[#2DAEF5]'>
									{rule?.group?.label ?? rule?.segment?.label ?? rule?.country ?? rule?.specification ?? ""}
								</span>
							</div>
						))}
					</div>
				))}
			</div>
		</div>
	)
}

export default AdvancedFiltersPreview
