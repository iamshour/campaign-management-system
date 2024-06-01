//#region Import
import { type AvatarImageProps, Fallback, Image, Root } from "@radix-ui/react-avatar"
import { forwardRef } from "react"
import { twMerge } from "tailwind-merge"
//#endregion

type CustomAvatarProps = {
	fallback?: string
	fallbackClassName?: string
} & Pick<AvatarImageProps, "src"> &
	Partial<Record<"alt" | "className" | "fallbackClassName" | "imageClassName", string>>

const Avatar = forwardRef<React.ElementRef<typeof Root>, CustomAvatarProps>(
	({ alt, className, fallback, fallbackClassName, imageClassName, src }, ref) => (
		<Root className={twMerge("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)} ref={ref}>
			<Image alt={alt} className={twMerge("aspect-square h-full w-full object-cover", imageClassName)} src={src} />

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
