//#region Import
import { memo } from "react"

import cn from "../utils/cn"

import spinnerVariants, { type SpinnerVariantsType } from "./spinner-variants"
//#endregion

const Spinner = memo<React.HTMLAttributes<HTMLDivElement> & SpinnerVariantsType>(
	({ variant, size, className, ...props }) => (
		<div {...props} className={cn(spinnerVariants({ variant, size, className }))} role='status' aria-label='loading'>
			<span className='sr-only'>Loading...</span>
		</div>
	)
)

Spinner.displayName = "Spinner"

export default Spinner
