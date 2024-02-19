//#region Import
import { cva, type VariantProps } from "class-variance-authority"
//#endregion

const spinnerVariants = cva("inline-block border-2 animate-spin rounded-full border-current border-t-transparent", {
	variants: {
		variant: {
			light: "text-white",
			primary: "text-primary-600",
		},
		size: {
			sm: "h-4 w-4",
			md: "h-8 w-8",
			lg: "h-16 w-16",
			xl: "h-24 w-24",
		},
	},
	defaultVariants: { variant: "primary", size: "md" },
})

export default spinnerVariants

export type SpinnerVariantsType = VariantProps<typeof spinnerVariants>
