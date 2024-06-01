//#region Import
import { memo } from "react"

import cn from "../utils/cn"
import spinnerVariants, { type SpinnerVariantsType } from "./spinner-variants"
//#endregion

const Spinner = memo<React.HTMLAttributes<HTMLDivElement> & SpinnerVariantsType>(
	({ className, size, variant, ...props }) => (
		<div {...props} aria-label='loading' className={cn(spinnerVariants({ className, size, variant }))} role='status'>
			<span className='sr-only'>Loading...</span>
		</div>
	)
)

Spinner.displayName = "Spinner"

export default Spinner
