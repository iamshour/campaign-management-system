//#region Import
import { cva, type VariantProps } from "class-variance-authority"
//#endregion

const labelVariants = cva(
	"block whitespace-nowrap text-sm font-medium leading-none text-[#393A3B] prevent-selection peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
	{
		variants: {
			size: {
				xs: "pb-0.5 ps-0.5",
				sm: "pb-1 ps-1",
				default: "pb-1.5 ps-1.5",
				lg: "pb-2 ps-2",
			},
		},
		defaultVariants: { size: "default" },
	}
)

export default labelVariants

export type LabelVariantsType = VariantProps<typeof labelVariants>
