import { defineStore } from 'pinia'
import { StoreId } from '@/models/Store'
import usePersistentStorage from '@/composables/PersistentStorage/PersistentStorage'

export const useDialogMainStore = defineStore(StoreId.DialogMain, () => {
  const { persistentRef } = usePersistentStorage(StoreId.DialogMain)
  const hasStarted = persistentRef<boolean>('hasStarted', false)

  const reset = () => {
    hasStarted.value = false
  }

  return {
    hasStarted,
    reset,
  }
})
