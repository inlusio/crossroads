import { defineStore } from 'pinia'
import { StoreId } from '@/models/Store'
import usePersistentStorage from '@/composables/PersistentStorage/PersistentStorage'
import type { DialogVariableStorage, DialogVariableStorageHandler } from '@/models/DialogStorage/DialogStorage'

export const useDialogStore = defineStore(StoreId.Dialog, () => {
  const { persistentRef } = usePersistentStorage(StoreId.Dialog)
  const hasStarted = persistentRef<boolean>('hasStarted', false)
  const variables = persistentRef<DialogVariableStorage>('Variables', {})

  const storage: DialogVariableStorageHandler = {
    get: (key: string): string | boolean | number | undefined => {
      const result = variables.value[key]
      return result ? JSON.parse(result) : undefined
    },
    set: (key: string, value: string | boolean | number) => {
      variables.value[key] = JSON.stringify(value)
    },
  }

  const reset = () => {
    variables.value = {}
  }

  return {
    hasStarted,
    variables,
    storage,
    reset,
  }
})
