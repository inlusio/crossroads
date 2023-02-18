import { defineStore } from 'pinia'
import { StoreId } from '@/models/Store'
import usePersistentStorage from '@/composables/PersistentStorage/PersistentStorage'
import type { DialogVariableStorage, DialogVariableStorageHandler } from '@/models/DialogVariable/DialogVariable'

export const useDialogVariablesStore = defineStore(StoreId.DialogVariables, () => {
  const { persistentRef } = usePersistentStorage(StoreId.DialogVariables)
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
    variables,
    storage,
    reset,
  }
})
