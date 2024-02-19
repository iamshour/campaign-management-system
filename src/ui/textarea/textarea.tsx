//#region Import
import { forwardRef } from "react"
import { twMerge } from "tailwind-merge"
//#endregion

const Textarea = forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
	({ className, value, ...props }, ref) => (
		<textarea
			value={value || ""}
			data-hasvalue={!!value}
			className={twMerge(
				"flex w-full resize-none rounded-xl border-0 bg-transparent p-4 text-base text-gray-800 !outline-0 ring-1 !ring-inset ring-gray-300 transition-basic placeholder:text-gray-400 autofill:shadow-[0_0_0_30px_white_inset] read-only:pointer-events-none read-only:!ring-gray-300 focus-within:ring-2 focus-within:!ring-primary-500 data-[hasvalue=true]:ring-primary-500 data-[hasvalue=true]:invalid:ring-2 data-[hasvalue=true]:invalid:ring-red-500 focus:ring-2 focus:!ring-primary-500 active:ring-2 active:!ring-primary-500 disabled:cursor-not-allowed disabled:opacity-50",
				className
			)}
			ref={ref}
			{...props}
		/>
	)
)
Textarea.displayName = "Textarea"

export default Textarea
