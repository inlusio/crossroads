// @ts-ignore
import YarnBound from 'yarn-bound/src'
import useDialogRunner from '@/composables/DialogRunner/DialogRunner'
import type { Dialog } from '@/models/Dialog/Dialog'
import { reactive, watch } from 'vue'
import useGameScene from '@/composables/GameScene/GameScene'
import type { GameSceneContent } from '@/models/GameScene/GameScene'
import { useLocalStorage } from '@/composables/LocalStorage/LocalStorage'
import { useDialogStorage } from '@/composables/DialogStorage/DialogStorage'

export default function useDialog() {
  const { content } = useGameScene()
  const { createRunner } = useDialogRunner()
  const { getItem } = useLocalStorage()

  const dialog = reactive<Dialog>({
    isReady: false,
    sceneId: undefined,
    runner: null,
    variables: getItem('variables') || {},
  })

  const { variableStorage } = useDialogStorage(dialog)

  watch(
    content,
    (newVal, oldVal) => {
      dialog.isReady = false

      if (!newVal?.dialogue.code) {
        return
      }

      createDialog(newVal)
    },
    { immediate: true },
  )

  const createDialog = (content: GameSceneContent) => {
    dialog.runner = createRunner(dialog, variableStorage, content.dialogue.code)
    dialog.sceneId = content.id
    dialog.isReady = true

    return dialog
  }

  return {
    dialog,
    createDialog,
  }
}
