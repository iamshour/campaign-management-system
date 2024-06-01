import { createContext, useContext } from "react"

type DropdownStateContextType = {
	/**
	 *  Callback function used to close Dropdown
	 */
	closeDropdown: () => void
}

export const DropdownStateContext = createContext<DropdownStateContextType>({} as DropdownStateContextType)

// eslint-disable-next-line react-refresh/only-export-components
export const useDropdownStateContext = (): DropdownStateContextType => useContext(DropdownStateContext)
