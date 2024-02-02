import { twMerge } from "tailwind-merge"

const NotFoundError = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
	return (
		<div {...props} className={twMerge("grid h-screen w-full place-content-center bg-white px-4", className)}>
			<h1 className='uppercase tracking-widest text-gray-500'>404 | Not Found</h1>
		</div>
	)
}

export default NotFoundError
