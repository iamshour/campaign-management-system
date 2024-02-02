//#region Import
import { Image, Fallback, Root, type AvatarImageProps } from "@radix-ui/react-avatar"
import { forwardRef } from "react"
import { twMerge } from "tailwind-merge"
//#endregion

type CustomAvatarProps = {
	fallback?: string
	fallbackClassName?: string
} & Pick<AvatarImageProps, "src"> &
	Partial<Record<"className" | "imageClassName" | "fallbackClassName" | "alt", string>>

const Avatar = forwardRef<React.ElementRef<typeof Root>, CustomAvatarProps>(
	({ src, alt, fallback, imageClassName, fallbackClassName, className }, ref) => (
		<Root ref={ref} className={twMerge("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}>
			<Image src={src} alt={alt} className={twMerge("aspect-square h-full w-full object-cover", imageClassName)} />

			<Fallback
				className={twMerge(
					"flex h-full w-full items-center justify-center rounded-full bg-slate-300/60",
					fallbackClassName
				)}>
				{fallback}
			</Fallback>
		</Root>
	)
)

Avatar.displayName = Root.displayName

export default Avatar
