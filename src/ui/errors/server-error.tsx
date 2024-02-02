//#region Import
import { twMerge } from "tailwind-merge"

import Button from "../button"

import RadixIconsReload from "~icons/radix-icons/reload"
//#endregion
interface ServerErrorProps {
	className?: string
}

const ServerError = ({ className }: ServerErrorProps) => (
	<div className={twMerge("flex h-full w-full items-center justify-center", className)}>
		<div className='flex !h-max w-max max-w-md flex-col items-center justify-center gap-4 rounded-md border border-red-800 bg-[rgba(255,0,0,0.03)] p-4'>
			<h1 className='text-center text-xl font-bold text-red-700'>Something Went Wrong!</h1>
			<Button className='bg-red-700 p-3 text-sm' onClick={() => window.location.reload()} title='reload'>
				<RadixIconsReload />
			</Button>
		</div>
	</div>
)

export default ServerError
