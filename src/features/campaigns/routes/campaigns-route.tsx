//#region Import
import appPaths from "@/core/constants/app-paths"
import RadixIconsGear from "~icons/radix-icons/gear"
import { Link } from "react-router-dom"
//#endregion

const CampaignsRoute = () => {
	return (
		<div className='flex flex-col p-6'>
			<div className='inline-flex items-center gap-2'>
				<p className='text-lg font-bold'>Page Under Construction</p>
				<RadixIconsGear />
			</div>

			<p className='text-gray-600'>
				Navigate to{" "}
				<Link className='font-medium underline transition-colors hover:text-primary-700' to={appPaths.CONTACTS}>
					Contacts
				</Link>{" "}
				Page to view more content.
			</p>
		</div>
	)
}

export default CampaignsRoute
