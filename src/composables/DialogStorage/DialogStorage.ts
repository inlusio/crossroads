import { useLocalStorage } from '@/composables/LocalStorage/LocalStorage'
import type { DialogVariableStorage } from '@/models/DialogStorage/DialogStorage'
import type { Dialog } from '@/models/Dialog/Dialog'

export function useDialogStorage(dialog: Dialog) {
  const { setItem } = useLocalStorage()

  const storage = {
    get: (key: string): string | boolean | number | undefined => {
      const result = dialog.variables[key]
      return result ? JSON.parse(result) : undefined
    },
    set: (key: string, value: string | boolean | number) => {
      dialog.variables[key] = JSON.stringify(value)
      setItem<DialogVariableStorage>('variables', dialog.variables)
    },
  }

  const resetStorage = () => {
    dialog.variables = {}
    setItem<DialogVariableStorage>('variables', {})
  }

  return {
    storage,
    resetStorage,
  }
}
