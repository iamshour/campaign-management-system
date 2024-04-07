//#region Import
import LucideChevronLeft from "~icons/lucide/chevron-left"
import { forwardRef } from "react"
import { useTranslation } from "react-i18next"
import { twMerge } from "tailwind-merge"

import Button from "../button/button"
//#endregion

const BackButton = forwardRef<React.ElementRef<typeof Button>, React.ComponentPropsWithoutRef<typeof Button>>(
	({ className, ...props }, ref) => {
		const { t } = useTranslation("ui", { keyPrefix: "buttons" })

		return (
			<Button
				className={twMerge("bg-transparent px-1.5 font-normal hover:bg-transparent hover:text-primary-900", className)}
				ref={ref}
				size='sm'
				variant='ghost'
				{...props}>
				{props?.children ? (
					props?.children
				) : (
					<>
						<LucideChevronLeft className='rtl:rotate-180' />
						{t("back")}
					</>
				)}
			</Button>
		)
	}
)

BackButton.displayName = "BackButton"

export default BackButton
