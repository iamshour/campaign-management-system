//#region Import
import {
	Root,
	Trigger,
	Content,
	List,
	type TabsProps as DefaultTabsProps,
	type TabsContentProps,
	type TabsListProps,
	type TabsTriggerProps,
} from "@radix-ui/react-tabs"
import { Suspense, forwardRef } from "react"
import { twMerge } from "tailwind-merge"

import Skeleton from "../skeleton/skeleton"
//#endregion

type TabsProps<ValueType extends string> = Omit<DefaultTabsProps, "value" | "onValueChange"> & {
	value?: ValueType
	onValueChange?: (value: ValueType) => void
}

function Tabs<ValueType extends string>({ value, onValueChange, className, ...props }: TabsProps<ValueType>) {
	return (
		<Root
			value={value}
			// Typecasting the onValueChange to escape ts error
			onValueChange={onValueChange as (v: string) => void}
			className={twMerge("flex h-full w-full flex-col gap-4 overflow-y-auto", className)}
			{...props}
		/>
	)
}

const TabsList = ({ className, ...props }: TabsListProps) => (
	<List
		className={twMerge(
			"inline-flex h-10 w-max items-center justify-center rounded-md bg-slate-100 p-1 text-slate-500",
			className
		)}
		{...props}
	/>
)

const TabsTrigger = forwardRef<React.ElementRef<typeof Trigger>, TabsTriggerProps>(({ className, ...props }, ref) => (
	<Trigger
		ref={ref}
		className={twMerge(
			"inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all data-[state=active]:bg-white data-[state=active]:text-slate-950 data-[state=active]:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
			className
		)}
		{...props}
	/>
))

TabsTrigger.displayName = "TabsTrigger"

const TabsContent = ({
	className,
	children,
	skeletonClassName,
	...props
}: TabsContentProps & { skeletonClassName?: string }) => (
	<Content
		className={twMerge(
			"h-full flex-1 overflow-hidden ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2",
			className
		)}
		{...props}>
		<Suspense
			fallback={<Skeleton className={twMerge("h-full w-full max-w-full rounded-xl bg-white", skeletonClassName)} />}>
			{children}
		</Suspense>
	</Content>
)

Tabs.List = TabsList
Tabs.Trigger = TabsTrigger
Tabs.Content = TabsContent

export default Tabs
