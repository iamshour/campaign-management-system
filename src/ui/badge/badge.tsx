//#region Import
import cn from "../utils/cn"
import badgeVariants, { type BadgeVariantsType } from "./badge-variants"
//#endregion

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & BadgeVariantsType

const Badge = ({ className, size, variant, ...props }: BadgeProps) => (
	<span {...props} className={cn(badgeVariants({ className, size, variant }))} />
)

export default Badge
