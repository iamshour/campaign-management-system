//#region Import
import { Select } from "@/ui"
import MdiInformationVariantCircle from "~icons/mdi/information-variant-circle"

import type { TemplateType } from "../types"

import templateTypesOptions from "../constants/template-types-options"
//#endregion

interface SelectSingleTemplateTypeProps<T extends TemplateType | undefined> {
	onValueChange: (selectedType: T) => void
	placeholder: string
	readOnly?: boolean
	value: T
}

const SelectSingleTemplateType = ({
	onValueChange,
	placeholder,
	readOnly,
	value,
}: SelectSingleTemplateTypeProps<TemplateType | undefined>) => {
	return (
		<Select onValueChange={onValueChange} value={value}>
			<Select.Trigger
				className='w-full text-base font-normal text-[#9899A7]'
				hasValue={!!value?.length}
				readOnly={readOnly}
				size='lg'>
				<Select.Value placeholder={placeholder} />
			</Select.Trigger>
			<Select.Content sideOffset={4}>
				{templateTypesOptions.map(({ label, value }) => (
					<Select.Item
						className='static flex w-full flex-row items-center justify-between'
						key={value}
						showCheck={false}
						value={value}>
						<Select.Text className='flex-1'>{label}</Select.Text>
						<span title='Lorem ipsum dolor sit amet consectetur adipisicing elit.'>
							<MdiInformationVariantCircle className='text-sm text-primary-600' />
						</span>
					</Select.Item>
				))}
			</Select.Content>
		</Select>
	)
}

export default SelectSingleTemplateType
