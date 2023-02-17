import useDialogRunner from '@/composables/DialogRunner/DialogRunner'
import type { Dialog } from '@/models/Dialog/Dialog'
import { reactive, watch } from 'vue'
import useGameScene from '@/composables/GameScene/GameScene'
import type { GameSceneContent } from '@/models/GameScene/GameScene'
import { useDialogStore } from '@/stores/Dialog'
import { storeToRefs } from 'pinia'

export default function useDialog() {
  const dialogStore = useDialogStore()
  const { storage, reset } = dialogStore
  const { hasStarted, variables } = storeToRefs(dialogStore)
  const { content } = useGameScene()

  const dialog = reactive<Dialog>({
    isReady: false,
    sceneId: undefined,
    runner: null,
    hasStarted,
    hotspots: [],
    variables,
  })

  const { createRunner } = useDialogRunner(dialog)

  const createDialog = (content: GameSceneContent) => {
    dialog.hotspots = []
    dialog.sceneId = content.id
    dialog.isReady = true
    dialog.hasStarted = true
    dialog.runner = createRunner(dialog, storage, content.dialogue.code)
    return dialog
  }

  const resetDialog = () => {
    dialog.hasStarted = false
    reset()
  }

  watch(
    content,
    () => {
      dialog.isReady = false

      if (!content.value?.dialogue.code) {
        return
      }

      createDialog(content.value)
    },
    { immediate: true },
  )

  return {
    dialog,
    createDialog,
    resetDialog,
  }
}
