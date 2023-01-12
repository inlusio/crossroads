import { useLocalStorage } from '@/composables/LocalStorage/LocalStorage'
import type { DialogVariableStorage } from '@/models/DialogStorage/DialogStorage'
import type { Dialog } from '@/models/Dialog/Dialog'

export function useDialogStorage(dialog: Dialog) {
  const { setItem } = useLocalStorage()

  const variableStorage = {
    get: (key: string) => dialog.variables[key],
    set: (key: string, value: string) => {
      dialog.variables[key] = value
      setItem<DialogVariableStorage>('variables', dialog.variables)
    },
  }

  const resetVariableStorage = () => {
    dialog.variables = {}
    setItem<DialogVariableStorage>('variables', {})
  }

  return {
    variableStorage,
    resetVariableStorage,
  }
}
