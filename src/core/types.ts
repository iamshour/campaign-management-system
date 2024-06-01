//#region Import
import type { GetListReturnType } from "./lib/redux-toolkit/types"
//#endregion

/**
 * Shared Component Types for Views that uses `List`, `count`, and `boolean`
 * Example of Views that uses this shared type: `ContactsView`, `AddContactsToGroupView`, `ExportsView`, etc.
 */
export type SharedListViewProps<TData> = GetListReturnType<TData> & { isFetching: boolean }
