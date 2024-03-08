//#region Import
import { Root } from "@radix-ui/react-label"
import { forwardRef } from "react"

import cn from "../utils/cn"
import labelVariants, { type LabelVariantsType } from "./label-variants"
//#endregion

interface LabelProps extends React.ComponentPropsWithoutRef<typeof Root>, LabelVariantsType {
	disabled?: boolean
}

const Label = forwardRef<React.ElementRef<typeof Root>, LabelProps>(({ className, disabled, size, ...props }, ref) => (
	<Root className={cn(labelVariants({ className, size }))} data-disabled={disabled} ref={ref} {...props} />
))

Label.displayName = Root.displayName

export default Label
