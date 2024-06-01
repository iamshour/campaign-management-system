//#region Import
import type { Country } from "react-phone-number-input"

import getCountryName from "@/core/utils/get-country-name"
import { useTranslation } from "react-i18next"

import type { SelectCountryPopoverProps } from "./select-country-popover"

import MultiBadgesPreview from "../select-async-popover/multi-badges-preview"
//#endregion

type SingleProps = { isMulti?: false; value?: Country }
type MultiProps = { isMulti: true; value: Country[] }

type SelectCountryPopoverTriggerProps = Pick<SelectCountryPopoverProps, "options" | "size"> & (MultiProps | SingleProps)

const SelectCountryPopoverTrigger = ({ isMulti, options, size, value }: SelectCountryPopoverTriggerProps) => {
	const { t } = useTranslation("ui", { keyPrefix: "selectCountryPopover" })

	if (isMulti)
		return (
			<MultiBadgesPreview
				placeholder={t("multi.placeholder")}
				selection={value?.map((code) => ({ label: getCountryName(code), value: code }))}
				size={size}
			/>
		)

	if (!value?.length) return t("single.placeholder")

	return options?.find((c) => c?.value === value)?.label
}

export default SelectCountryPopoverTrigger
