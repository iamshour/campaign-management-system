import SmsSenderRequestFunnel from "../components/sms-sender-request-funnel/sms-sender-request-funnel"

const CreateSmsSenderRequestRoute = () => {
	return (
		<div className='h-full w-full p-4'>
			<div className='h-full w-full bg-[#F7F7F7] p-4 flex-center'>
				<SmsSenderRequestFunnel />
			</div>
		</div>
	)
}

export default CreateSmsSenderRequestRoute
