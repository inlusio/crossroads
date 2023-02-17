import { useDialogStore } from '@/stores/Dialog'
import useStorageKey from '@/composables/StorageKey/StorageKey'

const PREFIX = 'Hotspot'

export function useDialogHotspot() {
  const dialogStore = useDialogStore()
  const { storage } = dialogStore
  const { join } = useStorageKey()

  const setHotspotShown = (id: string, flag: boolean) => {
    const key = join(PREFIX, id)
    storage.set(key, flag)
  }

  const isHotspotShown = (id: string): boolean | undefined => {
    const key = join(PREFIX, id)
    const result = storage.get(key)
    return typeof result === 'boolean' ? result : undefined
  }

  return {
    setHotspotShown,
    isHotspotShown,
  }
}
