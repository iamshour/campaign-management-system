//#region Import
import LucideCheck from "~icons/lucide/check"
import { Fragment, useCallback } from "react"
import { twMerge } from "tailwind-merge"

import type { OptionType } from "../types"

import Button from "../button/button"
import Separator from "../separator/separator"
//#endregion

interface MultiSelectPopoverContentProps {
	onValueChange: (value: OptionType[]) => void
	options: OptionType[]
	value: OptionType[]
}

const MultiSelectPopoverContent = ({ onValueChange, options, value }: MultiSelectPopoverContentProps) => {
	const isSelected = useCallback((entry: string) => value?.some((obj) => obj?.value === entry), [value])

	const onSelect = (option: OptionType) => {
		if (isSelected(option?.value)) return onValueChange(value?.filter((obj) => obj?.value !== option?.value))

		// Else, wasn't selected...
		return onValueChange([...value, option])
	}

	return (
		<div className='flex w-full flex-col items-start justify-start gap-1'>
			{options?.map((op, idx) => (
				<Fragment key={op?.value}>
					<Button
						className='w-full justify-start rounded-sm font-normal hover:bg-primary-50/45'
						onClick={() => onSelect(op)}
						size='sm'
						variant='ghost'>
						<div
							className={twMerge(
								"me-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary transition-all duration-100",
								isSelected(op?.value) ? "bg-primary text-white" : "opacity-50 [&_svg]:invisible"
							)}>
							<LucideCheck className='h-4 w-4' />
						</div>
						<span className='truncate'>{op?.label}</span>
					</Button>

					{idx !== options?.length - 1 && <Separator className='bg-opacity-50' />}
				</Fragment>
			))}
		</div>
	)
}

export default MultiSelectPopoverContent
