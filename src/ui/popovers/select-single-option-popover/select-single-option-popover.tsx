//#region Import
import { Label, OptionType, Select } from "@/ui"
import { twMerge } from "tailwind-merge"
//#endregion

interface SelectSingleOptionPopoverProps<T extends string> extends React.ComponentPropsWithoutRef<typeof Select<T>> {
	"aria-invalid"?: React.ComponentPropsWithoutRef<typeof Select.Trigger>["aria-invalid"]
	className?: string
	contentProps?: React.ComponentPropsWithoutRef<typeof Select.Content>
	label?: string
	options: (OptionType &
		Partial<Pick<React.ComponentPropsWithoutRef<typeof Select.Item>, "children" | "className" | "showCheck">>)[]
	placeholder?: string
	size?: React.ComponentPropsWithoutRef<typeof Select.Trigger>["size"]
	triggerProps?: React.ComponentPropsWithoutRef<typeof Select.Trigger>
}

const SelectSingleOptionPopover = <T extends string>({
	className,
	contentProps,
	label,
	options,
	placeholder,
	required,
	size,
	triggerProps,
	...props
}: SelectSingleOptionPopoverProps<T>) => (
	<div className={twMerge("relative w-[340px] max-w-full", className)}>
		{!!label?.length && (
			<Label size={size}>
				{label} {required && "*"}
			</Label>
		)}

		<Select {...props}>
			<Select.Trigger
				aria-invalid={props["aria-invalid"]}
				className={twMerge("w-full text-sm font-normal", triggerProps?.className)}
				hasValue={!!props?.value?.length}
				size={size}>
				<Select.Value placeholder={placeholder} />
			</Select.Trigger>
			<Select.Content {...contentProps}>
				{options.map(({ children, className, label, showCheck, value }) => (
					<Select.Item
						className={twMerge("static flex w-full flex-row items-center justify-between", className)}
						key={value}
						showCheck={showCheck || false}
						value={value}>
						<Select.Text className='flex-1'>{label}</Select.Text>

						{children}
					</Select.Item>
				))}
			</Select.Content>
		</Select>
	</div>
)

export default SelectSingleOptionPopover
