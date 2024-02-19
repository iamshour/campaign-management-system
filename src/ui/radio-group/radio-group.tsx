//#region Import
import { Root, Indicator, Item, type RadioGroupProps as DefaultRadioGroupProps } from "@radix-ui/react-radio-group"
import { twMerge } from "tailwind-merge"

import TablerCircleFilled from "~icons/tabler/circle-filled"
//#endregion

type RadioGroupProps<ValueType extends string> = Omit<DefaultRadioGroupProps, "value" | "onValueChange"> & {
	value?: ValueType
	onValueChange?: (value: ValueType) => void
}

function RadioGroup<ValueType extends string>({ value, onValueChange, ...props }: RadioGroupProps<ValueType>) {
	return (
		<Root value={value} onValueChange={onValueChange} className='flex flex-row justify-start space-x-5' {...props} />
	)
}

const RadioGroupItem = ({ className, children, value, ...props }: React.ComponentPropsWithoutRef<typeof Item>) => (
	<Item
		className={twMerge(
			"flex !h-max w-max cursor-pointer items-center space-x-3 rounded-md border border-[#D9D9D9] px-3 py-2 !outline-none transition-basic data-[state=checked]:border-primary-700 hover:bg-primary-50/50 data-[state=unchecked]:hover:border-primary-700 focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
			className
		)}
		value={value}
		id={value}
		{...props}>
		<span className='h-4 w-4 shrink-0 rounded-full border border-[#D9D9D9]'>
			<Indicator className='h-full w-full flex-center'>
				<TablerCircleFilled className='h-2.5 w-2.5 shrink-0 fill-current text-[#4cb0e6]' />
			</Indicator>
		</span>

		<span className='text-inherit prevent-selection'>{children}</span>
	</Item>
)

RadioGroup.Item = RadioGroupItem

export default RadioGroup
