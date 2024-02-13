//#region Import
import ContactsEmptySvg from "@/assets/contacts-empty.svg?react"
//#endregion

const ExportsEmptyView = () => {
	return (
		<div className='flex h-full w-full flex-col p-4'>
			<div className='h-full flex-1 flex-col gap-[14px] flex-center'>
				<ContactsEmptySvg className='mb-[30px]' />
				<h3 className='text-center text-xl font-bold sm:text-[22px]'>You don&apos;t have exports yet</h3>
				<p className='mb-6 text-center'>Create new segment to collect your contacts</p>
			</div>
		</div>
	)
}

export default ExportsEmptyView
