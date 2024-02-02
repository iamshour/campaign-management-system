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
	 *
	 * @returns Custom callback function passed to reload button
	 */
	onReset?: () => void
}

const DisplayError = ({ error, className, onReset }: DisplayErrorProps) => {
	console.log("Error From Display Error Component: ", error)

	return (
		<>
			<div className={twMerge("grid h-full w-full place-content-center gap-4 bg-white px-4", className)}>
				<h1 className='uppercase tracking-widest text-gray-500'>
					<span>{error?.status || "404"}</span> |{" "}
					{!!error?.status && error?.status !== 404 ? "Server Error" : "Not found"}
				</h1>

				{!!onReset && (
					<Button variant='outline-secondary' onClick={onReset} title='Reset'>
						<RadixIconsReload />
					</Button>
				)}
			</div>
		</>
	)
}

export default DisplayError
