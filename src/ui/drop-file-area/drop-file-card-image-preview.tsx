//#region Import
import { memo } from "react"
import { twMerge } from "tailwind-merge"
//#endregion

export const ImagePreview = memo(({ className, file, ...props }: { className?: string; file?: File }) => {
	if (!file) return

	return (
		<img
			{...props}
			alt={"Image Preview"}
			className={twMerge("aspect-[3/2] w-24 rounded-md border border-primary-600 object-cover shadow-sm", className)}
			src={URL.createObjectURL(file)}
		/>
	)
})

ImagePreview.displayName = "ImagePreview"
