//#region Import
import { cva, type VariantProps } from "class-variance-authority"
//#endregion

const spinnerVariants = cva("inline-block border-2 animate-spin rounded-full border-current border-t-transparent", {
	defaultVariants: { size: "md", variant: "primary" },
	variants: {
		size: {
			lg: "h-16 w-16",
			md: "h-8 w-8",
			sm: "h-4 w-4",
			xl: "h-24 w-24",
		},
		variant: {
			light: "text-white",
			primary: "text-primary-600",
		},
	},
})

export default spinnerVariants

export type SpinnerVariantsType = VariantProps<typeof spinnerVariants>
