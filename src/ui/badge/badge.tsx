//#region Import
import cn from "../utils/cn"

import badgeVariants, { type BadgeVariantsType } from "./badge-variants"
//#endregion

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & BadgeVariantsType

const Badge = ({ className, variant, size, ...props }: BadgeProps) => (
	<span {...props} className={cn(badgeVariants({ variant, size, className }))} />
)

export default Badge
