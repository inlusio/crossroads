//@ts-ignore
import YarnBound from 'yarn-bound/src'
import { ref } from 'vue'
import type { YarnBoundOptions } from '@/models/YarnBound/YarnBound'
import useDialogCommand from '@/composables/DialogCommand/DialogCommand'
import type { Dialog } from '@/models/Dialog/Dialog'
import type { DialogVariableStorageHandler } from '@/models/DialogStorage/DialogStorage'

export default function useDialogRunner(dialog: Dialog) {
  const { handleCommand } = useDialogCommand(dialog)

  const runner = ref<YarnBound | null>(null)

  const createRunner = (dialog: Dialog, storage: DialogVariableStorageHandler, code: string): YarnBound => {
    runner.value = new YarnBound({
      dialogue: code,
      variableStorage: storage,
      handleCommand,
    } as YarnBoundOptions)

    return runner.value
  }

  return {
    runner,
    createRunner,
  }
}
