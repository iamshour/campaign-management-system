//#region Import
import { cva, type VariantProps } from "class-variance-authority"
//#endregion

const buttonVariants = cva(
	`group relative border prevent-selection border-transparent rounded-md inline-flex items-center gap-2 truncate overflow-hidden justify-center text-sm font-medium ring-offset-white 
	outline-0 transition-basic focus-visible:ring-2 focus-visible:ring-primary-500 disabled:pointer-events-none disabled:opacity-50 data-[active=true]:pointer-events-none [&_svg]:shrink-0`,
	{
		defaultVariants: { size: "default", variant: "default" },
		variants: {
			size: {
				default: "h-10 gap-2 px-4 text-sm rounded-md",
				lg: "h-[50px] gap-2 px-4 text-lg rounded-lg",
				sm: "h-8 gap-1.5 px-2.5 text-sm rounded-md",
				xs: "h-6 px-1.5 gap-1 text-xs",
			},
			variant: {
				default: "bg-[#054060] text-white hover:bg-opacity-80",
				destructive: "bg-red-500 text-slate-50 hover:bg-opacity-75",
				ghost:
					"hover:bg-primary-50/75 hover:text-primary-950 data-[active=true]:bg-white data-[active=true]:text-black ",
				link: "text-primary-600 underline-offset-4 underline hover:text-opacity-75",
				outline: "border-current bg-white text-primary-600 hover:bg-primary-50 hover:text-primary-800",
				"outline-grey": `border-current bg-white text-gray-400 border-gray-300 hover:bg-primary-50/40 hover:text-primary-800 hover:border-primary-700 data-[hasvalue=true]:border-primary-500
					 data-[hasvalue=true]:text-black data-[active=true]:bg-primary-50 data-[active=true]:text-primary-800 data-[active=true]:border-primary-700`,
				secondary: "bg-primary-600 text-white hover:bg-opacity-75",
				text: "text-primary-700 hover:text-opacity-75",
			},
		},
	}
)

export default buttonVariants

export type ButtonVariantsType = VariantProps<typeof buttonVariants>
