import useStorageKey from '@/composables/StorageKey/StorageKey'
import { useDialogHotspotsStore } from '@/stores/DialogHotspots'
import { storeToRefs } from 'pinia'

const PREFIX = 'Hotspot'

export function useDialogHotspot() {
  const dialogHotspotsStore = useDialogHotspotsStore()
  const { hotspots, hotspotsVisibility } = storeToRefs(dialogHotspotsStore)

  const { join } = useStorageKey()

  const setHotspotShown = (id: string, flag: boolean) => {
    const key = join(PREFIX, id)
    hotspotsVisibility.value[key] = flag
  }

  const isHotspotShown = (id: string): boolean | undefined => {
    const key = join(PREFIX, id)
    const result = hotspotsVisibility.value[key]
    return typeof result === 'boolean' ? result : undefined
  }

  return {
    hotspots,
    setHotspotShown,
    isHotspotShown,
  }
}
