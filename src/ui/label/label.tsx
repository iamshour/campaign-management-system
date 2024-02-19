//#region Import
import { Root } from "@radix-ui/react-label"
import { forwardRef } from "react"

import cn from "../utils/cn"

import labelVariants, { type LabelVariantsType } from "./label-variants"
//#endregion

const Label = forwardRef<
	React.ElementRef<typeof Root>,
	React.ComponentPropsWithoutRef<typeof Root> & LabelVariantsType
>(({ className, size, ...props }, ref) => (
	<Root ref={ref} className={cn(labelVariants({ size, className }))} {...props} />
))
Label.displayName = Root.displayName

export default Label
