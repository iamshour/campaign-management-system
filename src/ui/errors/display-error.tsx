//#region Import
import { twMerge } from "tailwind-merge"

import Button from "../button"

import RadixIconsReload from "~icons/radix-icons/reload"
//#endregion

interface DisplayErrorProps extends Pick<React.HTMLAttributes<HTMLDivElement>, "className"> {
	error?: {
		status: number
		data: {
			message: string
			statusCode: number
		}
	}

	/**
	 * Bool check that handles whether to render a reload/reset button
	 */
	showReloadButton?: boolean

	/**
	 *
	 * @returns Custom callback function passed to reload button
	 */
	onReload?: () => void
}

const DisplayError = ({ error, className, showReloadButton, onReload }: DisplayErrorProps) => {
	console.log("Error From Display Error Component: ", error)

	return (
		<div className={twMerge("grid h-full w-full place-content-center gap-4 bg-white px-4", className)}>
			<h4 className='uppercase tracking-widest text-gray-500'>
				<span>{error?.status || "404"}</span> |{" "}
				{!!error?.status && error?.status !== 404 ? "Server Error" : "Not found"}
			</h4>

			{/* Render a Reload Button, only if the bool check was passed OR a callback function: `onReload` was passed    */}
			{(!!showReloadButton || !!onReload) && (
				<Button
					variant='outline-grey'
					onClick={() => {
						window.location.reload()
						!!onReload && onReload()
					}}
					title='Reset'>
					<RadixIconsReload />
				</Button>
			)}
		</div>
	)
}

export default DisplayError
