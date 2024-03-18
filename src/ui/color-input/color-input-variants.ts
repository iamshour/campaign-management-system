//#region Import
import { cva, type VariantProps } from "class-variance-authority"
//#endregion

const colorVariants = cva(
	`inline-block w-full bg-transparent !outline-0 ring-1 !ring-inset ring-gray-300 transition-basic invalid:ring-1 invalid:ring-red-500 
    focus-within:ring-2 focus-within:ring-primary-500 aria-[invalid=true]:!ring-1 aria-[invalid=true]:!ring-red-500 data-[hasvalue=true]:ring-primary-500
data-[hasvalue=true]:invalid:ring-red-500 focus:ring-2 focus:ring-primary-500
active:ring-2 active:ring-primary-500 [&_svg]:shrink-0`,
	{
		defaultVariants: { size: "default" },
		variants: {
			size: {
				default: "h-10 p-4 text-sm rounded-md",
				lg: "h-[50px] p-2 text-base rounded-lg",
				sm: "h-8 px-2.5 text-sm rounded-md",
				xs: "h-6 p-1.5 text-xs rounded-sm",
			},
		},
	}
)

export default colorVariants

export type ColorVariantsType = VariantProps<typeof colorVariants>
