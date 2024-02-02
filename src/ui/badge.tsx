import { cva, type VariantProps } from "class-variance-authority"

import cn from "./utils/cn"

const badgeVariants = cva(
	"h-max w-max py-0.5 truncate rounded-lg border border-slate-200 text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2",
	{
		variants: {
			variant: {
				default: "border-transparent bg-[#b8ddf2] text-slate-900 hover:bg-[#b8ddf2]/80",
				secondary: "border-transparent bg-slate-100 text-slate-900 hover:bg-slate-100/80",
				destructive: "border-transparent bg-red-500 text-slate-50 hover:bg-red-500/80",
				outline: "text-slate-950",
			},
			size: {
				xs: "px-0.5",
				sm: "px-1",
				default: "px-2",
				lg: "px-2 text-sm",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
)

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>

const Badge = ({ className, variant, size, ...props }: BadgeProps) => (
	<span {...props} className={cn(badgeVariants({ variant, size, className }))} />
)

export default Badge
