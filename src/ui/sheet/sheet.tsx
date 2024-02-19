//#region Import
import {
	Root,
	Trigger,
	Close,
	Portal,
	Overlay,
	Content,
	Title,
	Description,
	type DialogProps,
	type DialogContentProps,
	type DialogTitleProps,
	type DialogDescriptionProps,
} from "@radix-ui/react-dialog"
import { cva, type VariantProps } from "class-variance-authority"

import cn from "../utils/cn"

import IconamoonCloseBold from "~icons/iconamoon/close-bold"
//#endregion

/**
 * Sheet Component
 * @component
 *
 * @example
 * // Example 1: Basic usage
 *            <Sheet>
 *               <Sheet.Trigger>
 *                  Open Sidebar (Sheet component)
 *               </Sheet.Trigger>
 *               <Sheet.Content>
 *                  <Sheet.Header>
 *                    <Sheet.Title>Are you absolutely sure?</Sheet.Title>
 *                    <Sheet.Description>
 *                      This action cannot be undone. This will permanently delete your account and remove your data from our servers.
 *                    </Sheet.Description>
 *                  </Sheet.Header>
 *                  <Sheet.Footer>
 *                     <Sheet.Cancel>Cancel</Sheet.Cancel>
 *                  </Sheet.Footer>
 *               </Sheet.Content>
 *             </Sheet>
 *
 * @param props - Sheet component props
 * @param props.children - Sheet Child Components to be used, such as Trigger, Content, Header, Footer, Title, Description, Close
 * @param props.open - Optional Boolean to use for a Controlled Dialog
 * @param props.defaultOpen - Default State of Dialog, whether open by default or closed
 * @param props.onOpenChange - Optional function to use to trigger Dialog's presence in a controlled component
 */
const Sheet = (props: DialogProps) => <Root {...props} />

const sheetVariants = cva(
	"fixed z-50 gap-4 bg-white p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
	{
		variants: {
			side: {
				top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
				bottom:
					"inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
				left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
				right:
					"inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
			},
		},
		defaultVariants: {
			side: "right",
		},
	}
)

const SheetContent = ({
	side = "right",
	className,
	children,
	...props
}: DialogContentProps & VariantProps<typeof sheetVariants>) => (
	<Portal>
		<Overlay className='fixed inset-0 z-50 bg-white/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0' />

		<Content {...props} className={cn(sheetVariants({ side }), className)}>
			{children}
			<Close className='absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity data-[state=open]:bg-slate-100 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:pointer-events-none'>
				<IconamoonCloseBold className='h-4 w-4' />
				<span className='sr-only'>Close</span>
			</Close>
		</Content>
	</Portal>
)

const SheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
	<div className={cn("flex flex-col space-y-2 text-center sm:text-start", className)} {...props} />
)

const SheetFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
	<div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
)

const SheetTitle = ({ className, ...props }: DialogTitleProps) => (
	<Title className={cn("text-lg font-semibold text-slate-950", className)} {...props} />
)

const SheetDescription = ({ className, ...props }: DialogDescriptionProps) => (
	<Description className={cn("text-sm text-slate-500", className)} {...props} />
)

Sheet.Trigger = Trigger
Sheet.Content = SheetContent
Sheet.Header = SheetHeader
Sheet.Footer = SheetFooter
Sheet.Title = SheetTitle
Sheet.Description = SheetDescription
Sheet.Close = Close

export default Sheet
