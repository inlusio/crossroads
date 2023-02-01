import useDialogRunner from '@/composables/DialogRunner/DialogRunner'
import type { Dialog } from '@/models/Dialog/Dialog'
import { reactive, watch } from 'vue'
import useGameScene from '@/composables/GameScene/GameScene'
import type { GameSceneContent } from '@/models/GameScene/GameScene'
import { useLocalStorage } from '@/composables/LocalStorage/LocalStorage'
import { useDialogStorage } from '@/composables/DialogStorage/DialogStorage'

export default function useDialog() {
  const { content } = useGameScene()
  const { getItem, setItem } = useLocalStorage()

  const dialog = reactive<Dialog>({
    isReady: false,
    sceneId: undefined,
    runner: null,
    hasStarted: getItem('has-started') || false,
    hotspots: [],
    variables: getItem('variables') || {},
  })

  const { createRunner } = useDialogRunner(dialog)
  const { variableStorage, resetVariableStorage } = useDialogStorage(dialog)

  const createDialog = (content: GameSceneContent) => {
    dialog.hotspots = []
    dialog.sceneId = content.id
    dialog.isReady = true
    dialog.hasStarted = true
    dialog.runner = createRunner(dialog, variableStorage, content.dialogue.code)
    return dialog
  }

  const resetDialog = () => {
    dialog.hasStarted = false
    resetVariableStorage()
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

  watch(
    () => dialog.hasStarted,
    () => {
      setItem('has-started', dialog.hasStarted)
    },
    { immediate: true },
  )

  return {
    dialog,
    createDialog,
    resetDialog,
  }
}
