//#region Import
import type { OptionType } from "@/ui/types"

import { Select } from "@/ui"
import { twMerge } from "tailwind-merge"

import type { CommonSelectPopoverProps } from "../types"
//#endregion

interface SelectSingleOptionPopoverProps<T extends string>
	extends CommonSelectPopoverProps,
		React.ComponentPropsWithoutRef<typeof Select<T>> {
	options: (OptionType &
		Partial<Pick<React.ComponentPropsWithoutRef<typeof Select.Item>, "children" | "className" | "showCheck">>)[]
}

const SelectSingleOptionPopover = <T extends string>({
	"aria-invalid": invalid,
	contentProps,
	options,
	placeholder,
	size,
	triggerProps,
	...props
}: SelectSingleOptionPopoverProps<T>) => (
	<Select {...props}>
		<Select.Trigger
			aria-invalid={invalid}
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
)

export default SelectSingleOptionPopover
