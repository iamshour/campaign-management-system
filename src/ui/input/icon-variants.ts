//#region Import
import { cva, type VariantProps } from "class-variance-authority"
//#endregion

const iconVariants = cva(
	"pointer-events-none w-max absolute inset-y-1/2 -translate-y-1/2 shrink-0 transition-[color] duration-300 flex-center",
	{
		defaultVariants: { size: "default", variant: "default" },
		variants: {
			size: {
				default: "text-sm",
				lg: "text-base",
				sm: "text-sm",
				xs: "text-xs",
			},
			variant: {
				default: "text-gray-400 group-focus-within:text-primary-600 data-[hasvalue=true]:text-primary-600",
				light: "text-gray-400 group-focus-within:text-primary-600 data-[hasvalue=true]:text-primary-600",
				underlined: "text-gray-400 group-focus-within:text-primary-600 data-[hasvalue=true]:text-primary-600",
			},
		},
	}
)

export default iconVariants

export type IconVariantsType = VariantProps<typeof iconVariants>
