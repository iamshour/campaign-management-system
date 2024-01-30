//#region Import
import { twMerge } from "@package/ui"
import Badge from "@package/ui/src/badge"
import NotFoundError from "@package/ui/src/errors/notfound-error"
import Input from "@package/ui/src/input/input"
import Label from "@package/ui/src/label"
import PhoneInputReadonly from "@package/ui/src/phone-input/phone-input-readonly"
import Skeleton from "@package/ui/src/skeleton"
import Textarea from "@package/ui/src/textarea"
import { format, getListOfKey } from "@package/utils"
import { useTranslation } from "react-i18next"

import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import { useGetContactByIdQuery } from "@/features/people/contacts/api"
//#endregion

const ViewContactDialogContent = ({ id }: { id: string }) => {
	const { t } = useTranslation("contacts")

	const { data, isFetching, isError } = useGetContactByIdQuery(id, baseQueryConfigs)

	if (isFetching) return <Skeleton className='h-full' />

	if (!isFetching && (isError || !data)) return <NotFoundError />

	return (
		<div className='space-y-2 overflow-y-auto p-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0 sm:p-4'>
			<ReadonlyInputField label={t("fields.firstName")} value={data?.firstName || "N/A"} />
			<ReadonlyInputField label={t("fields.lastName")} value={data?.lastName || "N/A"} />
			<ReadonlyInputField label={t("fields.email")} value={data?.email || "N/A"} />

			<ReadonlyFieldLayout label={t("fields.phoneNumber")}>
				<PhoneInputReadonly value={data?.phoneNumber || "N/A"} className='w-[calc(340px-54px-8px)]' size='lg' />
			</ReadonlyFieldLayout>

			<ReadonlyFieldLayout label={t("fields.groups")}>
				<OptionsReadonlyField options={getListOfKey(data?.groups, "name") ?? []} />
			</ReadonlyFieldLayout>

			<ReadonlyFieldLayout label={t("fields.tags")}>
				<OptionsReadonlyField options={data?.tags || []} />
			</ReadonlyFieldLayout>

			<ReadonlyInputField label={t("fields.country")} value={data?.country || "N/A"} />
			<ReadonlyInputField
				label={t("fields.createdAt")}
				value={data?.createdAt?.length ? format(new Date(data?.createdAt), "MM-dd-yyyy") : "N/A"}
			/>

			<ReadonlyFieldLayout label={t("fields.note")} className='col-span-2'>
				<Textarea value={data?.note || "N/A"} readOnly className='rounded-lg' />
			</ReadonlyFieldLayout>
		</div>
	)
}

export default ViewContactDialogContent

const ReadonlyFieldLayout = ({
	label,
	children,
	className,
	...props
}: { label: string; children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) => (
	<div className={twMerge("w-full", className)} aria-label={label} {...props}>
		<Label htmlFor={label} size='lg'>
			{label}
		</Label>
		{children}
	</div>
)

const ReadonlyInputField = ({ label, value }: Record<"value" | "label", string>) => (
	<ReadonlyFieldLayout label={label}>
		{/* eslint-disable-next-line  */}
		<Input size='lg' id={label} aria-label={value} value={value} readOnly autoFocus={false} />
	</ReadonlyFieldLayout>
)

const OptionsReadonlyField = ({ options }: { options: string[] }) => (
	<div className='flex h-[50px] w-[340px] max-w-full items-center justify-start gap-1 overflow-x-auto rounded-lg border border-gray-300 px-3 py-2.5 text-base text-gray-400'>
		{!options?.filter(Boolean)?.length ? (
			<>N/A</>
		) : (
			options?.map((option, idx) => (
				<Badge
					key={option + idx}
					title={option}
					className='min-w-max max-w-[100ch] truncate rounded-md px-1 py-0.5 font-normal'>
					{option}
				</Badge>
			))
		)}
	</div>
)
