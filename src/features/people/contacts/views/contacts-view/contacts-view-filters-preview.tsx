//#region Import
import type { DataViewFilterType } from "@/core/components/data-view/types"

import { selectFilters } from "@/core/components/data-view/data-view-slice"
import useSelector from "@/core/hooks/useSelector"
import { Tooltip } from "@/ui"
import { useTranslation } from "react-i18next"
import { v4 as newId } from "uuid"
//#endregion

/**
 * Component used to display Applied advanced Filters inside Filters bar of Contacts View Component
 */
const ContactsViewFiltersPreview = () => {
	const { t } = useTranslation("contacts")

	const filters = useSelector<DataViewFilterType["contacts"]>(
		(state) => selectFilters(state, "contacts") as DataViewFilterType["contacts"]
	)

	const appliedSegment = filters?.advancedFilters?.segment?.label

	const appliedConditions = filters?.advancedFilters?.conditions

	return (
		<div className='pt-3'>
			<div className='-mx-4 flex whitespace-nowrap bg-[#2DAEF51C] px-4 py-1 font-bold text-[#054060]'>
				{t("components.advancedFiltersPreview.title")}
				{appliedSegment && (
					<Tooltip content={appliedSegment} side={"top"} sideOffset={0}>
						<span className='cursor-default overflow-hidden text-ellipsis ps-2'>
							{' "'}
							{appliedSegment}
							{'"'}
						</span>
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
					<div className='my-3 w-full whitespace-nowrap rounded-lg bg-white px-3 py-2' key={newId()}>
						{condition.rules.map((rule) => (
							<div
								className=' my-3 flex w-full flex-row flex-wrap break-all rounded-lg bg-[#edf3f7] px-3 py-2'
								key={newId()}>
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

export default ContactsViewFiltersPreview
