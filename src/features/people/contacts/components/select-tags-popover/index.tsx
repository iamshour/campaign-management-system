//#region Import
import { ComboBox } from "@blueai/ui"
import { lazy } from "react"
import { useTranslation } from "react-i18next"

const SelectTagsPopoverContent = lazy(() => import("./select-tags-popover-content"))
//#endregion

interface SelectTagsPopoverProps
	extends Omit<React.ComponentPropsWithoutRef<typeof ComboBox>, "selectedOptions" | "updateSelectedOptions"> {
	/**
	 * List of selected strings resembling selected Options @template string[]
	 */
	selectedOptions: string[]

	/**
	 * Callback Function that updates selected options, that takes a list of strings as its first param
	 * @param options List of options @template string[]
	 */
	updateSelectedOptions: (options: string[]) => void

	/**
	 * Bool check used when the user can create new tags when using the popover
	 */
	creatable?: boolean
}

const SelectTagsPopover = ({
	selectedOptions,
	updateSelectedOptions,
	label,
	// creatable,
	...props
}: SelectTagsPopoverProps) => {
	const { t } = useTranslation("contacts", { keyPrefix: "components.tagsPopover" })

	return (
		<ComboBox
			label={label ?? t("label")}
			selectedOptions={selectedOptions?.map((op) => ({ label: op, value: op }))}
			updateSelectedOptions={(options) => updateSelectedOptions(options?.map(({ value }) => value))}
			{...props}>
			<ComboBox.Trigger>{t(props?.isMulti ? "placeholder.multi" : "placeholder.single")}</ComboBox.Trigger>

			<ComboBox.Content>
				<SelectTagsPopoverContent
				// creatable={creatable}
				/>
			</ComboBox.Content>
		</ComboBox>
	)
}

export default SelectTagsPopover

// TODO: Example Implementation for integrating createable prop on select Tags
// const [displayedTags, setDisplayedTags] = useState(fetchedTags)
// useEffect(() => {
// 	if (fetchedTags?.length) setDisplayedTags(fetchedTags)
// }, [fetchedTags])
// const onSearch = (value?: string) => {
// 	setTagsSearchTerm(value)

// 	if (creatable) {
// 		if (value?.trim() === "" || !value) return setDisplayedTags(fetchedTags)

// 		const filteredTags = fetchedTags.filter((user) => user.toLowerCase().includes(value?.toLowerCase()))

// 		// Check if the value doesn't match any existing tag
// 		if (!filteredTags.some((tag) => tag.toLowerCase()?.startsWith(value.toLowerCase()))) {
// 			setDisplayedTags([value, ...filteredTags])
// 		} else {
// 			setDisplayedTags(filteredTags)
// 		}

// 		displayedTags.forEach((tag) => {
// 			if (props.selection?.includes(tag)) {
// 				const newListOfTags = new Set([...fetchedTags, tag])
// 				setTags([...newListOfTags])
// 			}
// 		})

// 		// FIXME: Support typing to add another tag
// 	}
// }
