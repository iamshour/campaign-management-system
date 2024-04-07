//#region Import
import { type RadioGroupProps as DefaultRadioGroupProps, Indicator, Item, Root } from "@radix-ui/react-radio-group"
import TablerCircleFilled from "~icons/tabler/circle-filled"
import { twMerge } from "tailwind-merge"
//#endregion

type RadioGroupProps<ValueType extends string> = Omit<DefaultRadioGroupProps, "onValueChange" | "value"> & {
	onValueChange?: (value: ValueType) => void
	value?: ValueType
}

function RadioGroup<ValueType extends string>({ onValueChange, value, ...props }: RadioGroupProps<ValueType>) {
	return (
		<Root className='flex flex-row justify-start space-x-5' onValueChange={onValueChange} value={value} {...props} />
	)
}

const RadioGroupItem = ({ children, className, value, ...props }: React.ComponentPropsWithoutRef<typeof Item>) => (
	<Item
		className={twMerge(
			`flex !h-max w-max cursor-pointer items-center space-x-3 rounded-md border border-[#D9D9D9] px-3 py-2 !outline-none transition-basic
			 data-[state=checked]:border-primary-700 hover:bg-primary-50/50 data-[state=unchecked]:hover:border-primary-700 focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50`,
			className
		)}
		id={value}
		value={value}
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
