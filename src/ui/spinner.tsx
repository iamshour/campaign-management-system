//#region Import
import { VariantProps, cva } from "class-variance-authority"
import { memo } from "react"

import cn from "./utils/cn"
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

const Spinner = memo<React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof spinnerVariants>>(
	({ variant, size, className, ...props }) => (
		<div {...props} className={cn(spinnerVariants({ variant, size, className }))} role='status' aria-label='loading'>
			<span className='sr-only'>Loading...</span>
		</div>
	)
)

Spinner.displayName = "Spinner"

export default Spinner
