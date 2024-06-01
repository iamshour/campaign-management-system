import { type IconType, Select } from "@/ui"
import React from "react"

import industriesIconsMap, { IndustryIconEnum } from "../constants/industries-icons-map"
import IndustryIcon from "./industry-icon"

interface SelectIconPopoverProps<T extends IndustryIconEnum>
	extends React.ComponentPropsWithoutRef<typeof Select<T>>,
		Pick<React.ComponentPropsWithoutRef<typeof Select.Trigger>, "aria-invalid"> {
	placeholder?: string
}

const SelectIconPopover = <T extends IndustryIconEnum>({ placeholder, ...props }: SelectIconPopoverProps<T>) => (
	<Select {...props}>
		<Select.Trigger
			aria-invalid={props["aria-invalid"]}
			className='w-full text-base'
			hasValue={!!props.value?.length}
			size='lg'>
			<Select.Value aria-invalid placeholder={placeholder}>
				{!!props.value?.length && <IndustryIcon className='h-[26px] w-[26px]' icon={props.value} />}
			</Select.Value>
		</Select.Trigger>

		<Select.Content className='flex max-w-[340px] flex-row flex-wrap gap-1'>
			{(Object.entries(industriesIconsMap) as [IndustryIconEnum, React.LazyExoticComponent<IconType>][])
				// removing `Others` industry icon
				?.filter((icon) => icon[0] !== IndustryIconEnum.FLUENT_WRENCH_SETTINGS_24_REGULAR)
				.map(([iconName, Icon]) => (
					<Select.Item
						className={`inline-block w-max cursor-pointer rounded-lg border border-transparent p-1 text-black hover:border-primary-300
                    hover:bg-primary-100/50 hover:!text-primary-900`}
						key={iconName}
						showCheck={false}
						value={iconName}>
						<Icon className='h-[26px] w-[26px] text-inherit' />
					</Select.Item>
				))}
		</Select.Content>
	</Select>
)

export default SelectIconPopover
