import IcRoundKeyboardDoubleArrowRight from "~icons/ic/round-keyboard-double-arrow-right"

interface LabelledHintsProps extends React.HTMLAttributes<HTMLDivElement> {
	labels: string[]
}

const LabelledHints = ({ labels, ...props }: LabelledHintsProps) => (
	<div {...props}>
		<h3 className='mb-3 text-lg font-medium'>Here you can find hints</h3>

		{!!labels?.length &&
			labels?.map((label, idx) => (
				<div className='flex items-center gap-1' key={`${label}-${idx}`}>
					<IcRoundKeyboardDoubleArrowRight className='shrink-0 text-primary-600' />
					<p className='text-base'>{label}</p>
				</div>
			))}
	</div>
)

export default LabelledHints
