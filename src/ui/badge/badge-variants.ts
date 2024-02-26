//#region Import
import { cva, VariantProps } from "class-variance-authority"
//#endregion

const badgeVariants = cva(
	"h-max w-max py-0.5 truncate rounded-lg border border-slate-200 text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2",
	{
		defaultVariants: {
			size: "default",
			variant: "default",
		},
		variants: {
			size: {
				default: "px-2",
				lg: "px-2 text-sm",
				sm: "px-1",
				xs: "px-0.5",
			},
			variant: {
				default: "border-transparent bg-[#b8ddf2] text-slate-900 hover:bg-[#b8ddf2]/80",
				destructive: "border-transparent bg-red-500 text-slate-50 hover:bg-red-500/80",
				outline: "text-slate-950",
				secondary: "border-transparent bg-slate-100 text-slate-900 hover:bg-slate-100/80",
			},
		},
	}
)

export default badgeVariants

export type BadgeVariantsType = VariantProps<typeof badgeVariants>
