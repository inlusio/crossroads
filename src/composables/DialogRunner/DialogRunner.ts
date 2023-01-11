//@ts-ignore
import YarnBound from 'yarn-bound/src'
import { ref } from 'vue'
import type { YarnBoundOptions } from '@/models/YarnBound/YarnBound'
import useDialogCommand from '@/composables/DialogCommand/DialogCommand'
import type { Dialog } from '@/models/Dialog/Dialog'
import type { DialogVariableStorageHandler } from '@/models/DialogStorage/DialogStorage'

export default function useDialogRunner() {
  const { handleCommand } = useDialogCommand()

  const runner = ref<YarnBound | null>(null)

  const createRunner = (dialog: Dialog, variableStorage: DialogVariableStorageHandler, code: string): YarnBound => {
    runner.value = new YarnBound({
      dialogue: code,
      variableStorage,
      handleCommand,
    } as YarnBoundOptions)

    return runner.value
  }

  return {
    runner,
    createRunner,
  }
}
