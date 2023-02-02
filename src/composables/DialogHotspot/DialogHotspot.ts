import type { Dialog } from '@/models/Dialog/Dialog'
import { useDialogStorage } from '@/composables/DialogStorage/DialogStorage'

const PREFIX = 'hotspot'

export function useDialogHotspot(dialog: Dialog) {
  const { storage } = useDialogStorage(dialog)

  const setHotspotShown = (id: string, flag: boolean) => {
    storage.set(`${PREFIX}.${id}`, flag)
  }

  const isHotspotShown = (id: string): boolean | undefined => {
    const result = storage.get(`${PREFIX}.${id}`)
    return typeof result === 'boolean' ? result : undefined
  }

  return {
    setHotspotShown,
    isHotspotShown,
  }
}
