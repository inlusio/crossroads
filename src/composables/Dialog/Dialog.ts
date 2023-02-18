import useDialogRunner from '@/composables/DialogRunner/DialogRunner'
import type { Dialog } from '@/models/Dialog/Dialog'
import { reactive, watch } from 'vue'
import useGameScene from '@/composables/GameScene/GameScene'
import type { GameSceneContent } from '@/models/GameScene/GameScene'
import { useDialogMainStore } from '@/stores/DialogMain'
import { storeToRefs } from 'pinia'
import { useDialogVariablesStore } from '@/stores/DialogVariables'
import { useDialogHotspotsStore } from '@/stores/DialogHotspots'

export default function useDialog() {
  const dialogMainStore = useDialogMainStore()
  const dialogVariablesStore = useDialogVariablesStore()
  const dialogHotspotsStore = useDialogHotspotsStore()

  const { reset: resetDialog } = dialogMainStore
  const { reset: resetDialogVariables, storage } = dialogVariablesStore
  const { reset: resetDialogHotspots } = dialogHotspotsStore

  const { hasStarted } = storeToRefs(dialogMainStore)
  const { variables } = storeToRefs(dialogVariablesStore)
  const { hotspots } = storeToRefs(dialogHotspotsStore)

  const { content } = useGameScene()

  const dialog = reactive<Dialog>({
    hotspots,
    isReady: false,
    sceneId: undefined,
    runner: null,
    hasStarted,
    variables,
  })

  const { createRunner } = useDialogRunner(dialog)

  const createDialog = ({ id, dialogue }: GameSceneContent) => {
    dialog.hotspots = []
    dialog.sceneId = id
    dialog.isReady = true
    dialog.hasStarted = true
    dialog.runner = createRunner(dialog, storage, dialogue.code)

    return dialog
  }

  const reset = () => {
    resetDialog()
    resetDialogVariables()
    resetDialogHotspots()
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
    reset,
  }
}
