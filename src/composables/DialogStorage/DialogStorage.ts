import { useLocalStorage } from '@/composables/LocalStorage/LocalStorage'
import type { DialogVariableStorage } from '@/models/DialogStorage/DialogStorage'
import type { Dialog } from '@/models/Dialog/Dialog'

export function useDialogStorage(dialog: Dialog) {
  const { getItem, setItem } = useLocalStorage()

  const variableStorage = {
    get: (key: string) => dialog.variables[key],
    set: (key: string, value: string) => {
      dialog.variables[key] = value
      setItem<DialogVariableStorage>('variables', dialog.variables)
    },
  }

  return {
    variableStorage,
  }
}
