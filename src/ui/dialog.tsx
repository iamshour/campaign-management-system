//#region Import
import {
	Dialog as RootDialog,
	Trigger,
	Content,
	Overlay,
	Close,
	Title,
	Description,
	Portal,
	DialogClose,
	type DialogProps,
	type DialogContentProps,
	type DialogDescriptionProps,
} from "@radix-ui/react-dialog"
import { Suspense } from "react"
import { twMerge } from "tailwind-merge"

import Separator from "./separator"
import Skeleton from "./skeleton"

import RadixIconsCross2 from "~icons/radix-icons/cross-2"
//#endregion

/**
 * Dialog Component
 * @component
 *
 * @example
 * // Example 1: Basic usage
 *      <Dialog>
 *        <Dialog.Trigger asChild>
 *          <Button>About Dialog</Button>
 *        </Dialog.Trigger>
 *        <Dialog.Content title="About Trelllo">
 *           <div className="mt-4 space-y-3 text-gray-600">
 *             <p>This is a React app built with Radix UI!</p>
 *             <p>Technologies used:</p>
 *             <ul className="list-disc ps-4">
 *               <li>Radix UI Dialog</li>
 *              <li>Next.js</li>
 *              <li>Tailwind CSS</li>
 *            </ul>
 *          </div>
 *        </Dialog.Content>
 *       </Dialog>
 *
 * @param props - Dialog component props
 * @param props.children - Dialog Child Components to be used, such as Trigger, Content, Description, Close
 * @param props.open - Optional Boolean to use for a Controlled Dialog
 * @param props.defaultOpen - Default State of Dialog, whether open by default or closed
 * @param props.onOpenChange - Optional function to use to trigger Dialog's presence in a controlled component
 */
const Dialog = ({ children, ...dialogProps }: DialogProps) => <RootDialog {...dialogProps}>{children}</RootDialog>

const DialogDescription = ({ className, ...props }: DialogDescriptionProps) => (
	<Description className={twMerge("text-sm text-slate-500", className)} {...props} />
)
const DialogContent = ({
	className,
	withCloseBtn = true,
	children,
	title,
	...props
}: DialogContentProps & { withCloseBtn?: boolean; title?: string; children?: React.ReactNode }) => (
	<Portal>
		<Overlay className='fixed inset-0 z-50 bg-white/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0'>
			<Content
				className={twMerge(
					"fixed left-[50%] top-[50%] z-50 flex max-h-[90vh] max-w-[85vw] translate-x-[-50%] translate-y-[-50%] flex-col gap-4 overflow-hidden rounded-xl border border-slate-200 bg-white p-3 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:p-4",
					className
				)}
				{...props}>
				{!!title?.length && (
					<header className='flex flex-col space-y-1.5 text-center sm:text-start'>
						<Title className='select-none pb-3 text-center text-lg leading-none tracking-tight'>{title}</Title>
						<Separator className='!mt-0' />
					</header>
				)}

				<Suspense fallback={<Skeleton className='h-full' />}>{children}</Suspense>

				{withCloseBtn && (
					<Close className='absolute end-4 top-4 rounded-sm opacity-70 !outline-0 transition-basic hover:opacity-100 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:pointer-events-none'>
						<RadixIconsCross2 className='h-4 w-4' />
						<span className='sr-only'>Close Dialog</span>
					</Close>
				)}
			</Content>
		</Overlay>
	</Portal>
)

Dialog.Trigger = Trigger
Dialog.Description = DialogDescription
Dialog.Content = DialogContent
Dialog.Close = DialogClose

export default Dialog
