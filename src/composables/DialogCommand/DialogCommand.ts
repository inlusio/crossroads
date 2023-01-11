import { DialogCommand } from '@/models/DialogCommand/DialogCommand'
import useGameScene from '@/composables/GameScene/GameScene'
import type { GameSceneId } from '@/models/GameScene/GameScene'
import type { DialogResultCommandData } from '@/models/DialogResult/DialogResult'
import { useRouter } from 'vue-router'

export default function useDialogCommand() {
  const router = useRouter()
  const { toGameScene } = useGameScene()

  const handleCommand = async (commandResult: DialogResultCommandData) => {
    const [command, ...args] = commandResult.command.split(' ')

    switch (command as DialogCommand) {
      case DialogCommand.AddHint:
        break
      case DialogCommand.GotoRoute:
        break
      case DialogCommand.GotoScene:
        await router.push(toGameScene(args[0] as GameSceneId))
        break
    }
  }

  return {
    handleCommand,
  }
}
