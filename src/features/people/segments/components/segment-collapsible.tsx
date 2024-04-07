//#region Import
import { Collapsible, type IconType } from "@/ui"
//#endregion

interface SegmentCollapsibleProps extends React.ComponentPropsWithoutRef<typeof Collapsible> {
	children: React.ReactNode
	description: string
	icon: IconType
	title: string
}

const SegmentCollapsible = ({ children, description, icon: Icon, title, ...props }: SegmentCollapsibleProps) => (
	<Collapsible {...props} className='w-full rounded-xl bg-[#F7F7F7] p-4'>
		<Collapsible.Trigger
			className={`flex w-full items-start justify-start gap-4 prevent-selection [&>svg:nth-of-type(2)]:me-4 [&>svg:nth-of-type(2)]:ms-auto 
			[&>svg:nth-of-type(2)]:h-6 [&>svg:nth-of-type(2)]:w-6 [&>svg:nth-of-type(2)]:self-center`}
			showArrow>
			<Icon className='text-xl text-primary-600' />

			<div className='flex flex-col items-start gap-1.5'>
				<h3 className='text-xl font-bold'>{title}</h3>
				<h4 className='text-xl font-normal text-[#545454]'>{description}</h4>
			</div>
		</Collapsible.Trigger>

		<Collapsible.Content>{children}</Collapsible.Content>
	</Collapsible>
)

export default SegmentCollapsible
