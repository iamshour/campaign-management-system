import React from "react"
import { twMerge } from "tailwind-merge"

interface DisplayErrorProps extends Pick<React.HTMLAttributes<HTMLDivElement>, "className"> {
	error: any
}

const DisplayError = ({ error, className }: DisplayErrorProps) => {
	console.log("Error From Display Error Component: ", error)

	return (
		<>
			<div className={twMerge("grid h-full w-full place-content-center bg-white px-4", className)}>
				<h1 className='uppercase tracking-widest text-gray-500'>404 | Not Found</h1>
			</div>

			{/* <Button className='bg-red-700 p-3 text-sm' onClick={() => window.location.reload()} title='reload'>
            <RadixIconsReload />
        </Button> */}
		</>
	)
}

export default DisplayError
