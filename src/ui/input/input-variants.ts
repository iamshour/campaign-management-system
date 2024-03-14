//#region Import
import { cva, type VariantProps } from "class-variance-authority"
//#endregion

const inputVariants = cva(
	"inline-block h-full w-full transition-basic [&_svg]:shrink-0 read-only:pointer-events-none !outline-0 border-0 text-gray-800 placeholder:text-gray-400",
	{
		defaultVariants: { size: "default", variant: "default" },
		variants: {
			size: {
				default: "h-10 p-4 text-sm rounded-md",
				lg: "h-[50px] p-4 text-base rounded-lg",
				sm: "h-8 px-2.5 text-sm rounded-md",
				xs: "h-6 p-1.5 text-xs rounded-sm",
			},
			variant: {
				default: `bg-transparent ring-gray-300 autofill:shadow-[0_0_0_30px_white_inset] ring-1
					 !ring-inset focus:ring-2 active:ring-2 focus-within:ring-2 data-[hasvalue=true]:invalid:ring-1 invalid:ring-1 aria-[invalid=true]:!ring-1 focus:ring-primary-500 
					 active:ring-primary-500 focus-within:ring-primary-500 data-[hasvalue=true]:ring-primary-500 data-[hasvalue=true]:invalid:ring-red-500 invalid:ring-red-500 
					 aria-[invalid=true]:!ring-red-500`,
				light: `bg-white ring-gray-300 autofill:shadow-[0_0_0_30px_white_inset] ring-1
					 !ring-inset focus:ring-2 active:ring-2 focus-within:ring-2 data-[hasvalue=true]:invalid:ring-1 invalid:ring-1 aria-[invalid=true]:!ring-1 focus:ring-primary-500 
					 active:ring-primary-500 focus-within:ring-primary-500 data-[hasvalue=true]:ring-primary-500 data-[hasvalue=true]:invalid:ring-red-500 invalid:ring-red-500 
					 aria-[invalid=true]:!ring-red-500`,
				underlined: `bg-transparent !rounded-none border-b-gray-300 autofill:shadow-[0_0_0_30px_white_inset] border-b 
				!ring-0 focus:!ring-0 focus-within:!ring-0 focus-within:border-b-primary-500 focus:border-b-primary-500 active:border-b-primary-500 data-[hasvalue=true]:border-b-primary-500
				 data-[hasvalue=true]:invalid:border-b-red-500`,
			},
		},
	}
)

export default inputVariants

export type InputVariantsType = VariantProps<typeof inputVariants>
