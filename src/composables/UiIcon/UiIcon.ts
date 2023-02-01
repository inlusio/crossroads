import { find } from 'lodash-es'
import type { MaybeIconId, UiIconDict, UiIconEntry, UiIconList } from '@/models/UiIcon/UiIcon'
import { uiIconDict, UiIconId, uiIconList } from '@/models/UiIcon/UiIcon'
import { readonly } from 'vue'

const findIcon = (predicate: Partial<UiIconEntry>): UiIconId | undefined => {
  return find(uiIconList, predicate)?.id
}

const getEntry = (targetId: MaybeIconId): UiIconEntry | undefined => {
  return uiIconDict[targetId as UiIconId]
}

/**
 * useUiIcon
 */
export default function useUiIcon() {
  return {
    findIcon,
    getEntry,
    uiIconList: readonly<UiIconList>(uiIconList),
    uiIconDict: readonly<UiIconDict>(uiIconDict),
  }
}
