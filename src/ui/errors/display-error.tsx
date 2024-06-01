//#region Import
import { type ErrorObject, getErrorMessage } from "@/core/lib/redux-toolkit/helpers"
import RadixIconsReload from "~icons/radix-icons/reload"
import { twMerge } from "tailwind-merge"

import Button from "../button/button"
//#endregion

interface DisplayErrorProps extends Pick<React.HTMLAttributes<HTMLDivElement>, "className"> {
	error?: ErrorObject

	/**
	 *
	 * @returns Custom callback function passed to reload button
	 */
	onReload?: () => void

	/**
	 * Bool check that handles whether to render a reload/reset button
	 */
	showReloadButton?: boolean
}

const DisplayError = ({ className, error = { status: 500 }, onReload, showReloadButton }: DisplayErrorProps) => {
	const message = getErrorMessage(error)

	return (
		<div className={twMerge("grid h-full w-full place-content-center gap-4 bg-white px-4", className)}>
			<h4 className='uppercase tracking-widest text-gray-500'>
				<span>{error?.status || "500"}</span> | {message}
			</h4>

			{/* Render a Reload Button, only if the bool check was passed OR a callback function: `onReload` was passed    */}
			{(!!showReloadButton || !!onReload) && (
				<Button
					onClick={() => {
						window.location.reload()
						!!onReload && onReload()
					}}
					title='Reset'
					variant='outline-grey'>
					<RadixIconsReload />
				</Button>
			)}
		</div>
	)
}

export default DisplayError
