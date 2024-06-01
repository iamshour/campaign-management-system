//#region Import
import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import { useGetContactByIdQuery } from "@/features/people/contacts/api"
import { Badge, Label, PhoneInputReadonly, ReadonlyInput, Skeleton, Textarea } from "@/ui"
import { getListOfKey } from "@/utils"
import { format } from "date-fns"
import { lazy } from "react"
import { useTranslation } from "react-i18next"
import { twMerge } from "tailwind-merge"

const DisplayError = lazy(() => import("@/ui/errors/display-error"))
//#endregion

const ViewContactDialogContent = ({ id }: { id: string }) => {
	const { t } = useTranslation("contacts")

	const { data, isError, isFetching } = useGetContactByIdQuery(id, baseQueryConfigs)

	if (isFetching) return <Skeleton className='h-full' />

	if (!isFetching && (isError || !data)) return <DisplayError />

	return (
		<div className='space-y-2 overflow-y-auto p-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0 sm:p-4'>
			<ReadonlyInput label={t("fields.firstName")} name='firstName' size='lg' value={data?.firstName || "N/A"} />
			<ReadonlyInput label={t("fields.lastName")} name='lastName' size='lg' value={data?.lastName || "N/A"} />
			<ReadonlyInput label={t("fields.email")} name='email' size='lg' value={data?.email || "N/A"} />

			<ReadonlyFieldLayout label={t("fields.phoneNumber")}>
				<PhoneInputReadonly className='w-[calc(340px-54px-8px)]' size='lg' value={data?.phoneNumber || "N/A"} />
			</ReadonlyFieldLayout>

			<ReadonlyFieldLayout label={t("fields.groups")}>
				<OptionsReadonlyField options={getListOfKey(data?.groups, "name") ?? []} />
			</ReadonlyFieldLayout>

			<ReadonlyFieldLayout label={t("fields.tags")}>
				<OptionsReadonlyField options={data?.tags || []} />
			</ReadonlyFieldLayout>

			<ReadonlyInput label={t("fields.country")} name='country' size='lg' value={data?.country || "N/A"} />

			<ReadonlyInput
				label={t("fields.createdAt")}
				name='createdAt'
				size='lg'
				value={data?.createdAt?.length ? format(new Date(data?.createdAt), "MM-dd-yyyy") : "N/A"}
			/>

			<ReadonlyFieldLayout className='col-span-2' label={t("fields.note")}>
				<Textarea className='rounded-lg' readOnly value={data?.note || "N/A"} />
			</ReadonlyFieldLayout>
		</div>
	)
}

export default ViewContactDialogContent

const ReadonlyFieldLayout = ({
	children,
	className,
	label,
	...props
}: { children: React.ReactNode; label: string } & React.HTMLAttributes<HTMLDivElement>) => (
	<div aria-label={label} className={twMerge("w-full", className)} {...props}>
		<Label htmlFor={label} size='lg'>
			{label}
		</Label>
		{children}
	</div>
)

const OptionsReadonlyField = ({ options }: { options: string[] }) => (
	<div className='flex h-[50px] w-[340px] max-w-full items-center justify-start gap-1 overflow-x-auto rounded-lg border border-gray-300 px-3 py-2.5 text-base text-gray-400'>
		{!options?.filter(Boolean)?.length ? (
			<>N/A</>
		) : (
			options?.map((option, idx) => (
				<Badge
					className='min-w-max max-w-[100ch] truncate rounded-md px-1 py-0.5 font-normal'
					key={option + idx}
					title={option}>
					{option}
				</Badge>
			))
		)}
	</div>
)
