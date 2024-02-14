//#region Import
import { memo } from "react"
import { twMerge } from "tailwind-merge"
//#endregion

export const ImagePreview = memo(({ file, className, ...props }: { file?: File; className?: string }) => {
	if (!file) return

	return (
		<img
			{...props}
			className={twMerge("aspect-[3/2] w-24 rounded-md border border-primary-600 object-cover shadow-sm", className)}
			src={URL.createObjectURL(file)}
			alt={"Image Preview"}
		/>
	)
})

ImagePreview.displayName = "ImagePreview"
