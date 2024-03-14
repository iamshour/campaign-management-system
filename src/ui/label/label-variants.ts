//#region Import
import { cva, type VariantProps } from "class-variance-authority"
//#endregion

const labelVariants = cva(
	`block whitespace-nowrap text-sm text-start font-medium leading-none text-[#393A3B] prevent-selection peer-disabled:cursor-not-allowed 
	peer-disabled:opacity-60 data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-60 aria-[invalid=true]:text-red-500`,
	{
		defaultVariants: { size: "default" },
		variants: {
			size: {
				default: "pb-1.5 ps-1.5",
				lg: "pb-2 ps-2",
				sm: "pb-1 ps-1",
				xs: "pb-0.5 ps-0.5",
			},
		},
	}
)

export default labelVariants

export type LabelVariantsType = VariantProps<typeof labelVariants>
