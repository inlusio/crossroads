import { defineStore } from 'pinia'
import { StoreId } from '@/models/Store'
import usePersistentStorage from '@/composables/PersistentStorage/PersistentStorage'
import type { DialogHotspot, DialogHotspotVisibilityStorage } from '@/models/DialogHotspot/DialogHotspot'
import { ref } from 'vue'

export const useDialogHotspotsStore = defineStore(StoreId.DialogHotspots, () => {
  const { persistentRef } = usePersistentStorage(StoreId.DialogHotspots)

  const hotspots = ref<Array<DialogHotspot>>([])
  const hotspotsVisibility = persistentRef<DialogHotspotVisibilityStorage>('Hotspots', {})

  const reset = () => {
    hotspots.value = []
    hotspotsVisibility.value = {}
  }

  return {
    hotspots,
    hotspotsVisibility,
    reset,
  }
})
