//#region Import
import Badge from "../badge"
import type { OptionType } from "../types"
//#endregion

interface MultiSelectionBadgesProps extends Pick<React.ComponentPropsWithoutRef<typeof Badge>, "size"> {
	/**
	 * List of selected options by user, to be displayed in badges
	 */
	selectedOptions: OptionType[]

	children: React.ReactNode
}

const MultiSelectionBadges = ({ selectedOptions, children, size }: MultiSelectionBadgesProps) => (
	<div className='h-full flex-1 truncate py-2.5 text-start'>
		<div className='flex h-full items-center gap-1'>
			{!selectedOptions?.length ? (
				children
			) : selectedOptions.length > 2 ? (
				<Badge size={size}>{selectedOptions.length} selected</Badge>
			) : (
				selectedOptions.map((option) => (
					<Badge size={size} key={option.value} title={option.label}>
						{option.label}
					</Badge>
				))
			)}
		</div>
	</div>
)

export default MultiSelectionBadges

{
	/* {maxLimitReached && <span className='text-xs'>{t("comboBox.message.maxLimitReached")}</span>} */
}
