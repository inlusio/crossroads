//@ts-ignore
import YarnBound from 'yarn-bound/src'
import { ref } from 'vue'
import type { YarnBoundOptions } from '@/models/YarnBound/YarnBound'
import useDialogCommand from '@/composables/DialogCommand/DialogCommand'
import type { ReactiveDialog } from '@/models/Dialog/Dialog'
import type { DialogVariableStorageHandler } from '@/models/DialogVariable/DialogVariable'

export default function useDialogRunner(dialog: ReactiveDialog) {
  const { handleCommand } = useDialogCommand(dialog)

  const runner = ref<YarnBound | null>(null)

  const createRunner = (dialog: ReactiveDialog, storage: DialogVariableStorageHandler, code: string) => {
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
