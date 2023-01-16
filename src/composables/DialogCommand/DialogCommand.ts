import { DialogCommand } from '@/models/DialogCommand/DialogCommand'
import useGameScene from '@/composables/GameScene/GameScene'
import type { GameSceneId } from '@/models/GameScene/GameScene'
import type { DialogResultCommandData } from '@/models/DialogResult/DialogResult'
import { useRouter } from 'vue-router'
import type { Dialog } from '@/models/Dialog/Dialog'

export default function useDialogCommand(dialog: Dialog) {
  const router = useRouter()
  const { toGameScene } = useGameScene()

  const handleCommand = async (commandResult: DialogResultCommandData) => {
    const [command, ...args] = commandResult.command.split(' ')

    switch (command as DialogCommand) {
      case DialogCommand.AddHint:
        break
      case DialogCommand.AddHotspot:
        const [label, coords, ...rawCommand] = args
        const [x, y] = coords.split(',').map((n) => parseInt(n, 10))

        dialog.hotspots.push({
          x,
          y,
          label,
          commandData: {
            command: rawCommand.join(' '),
            metadata: commandResult.metadata,
            hashtags: commandResult.hashtags,
          },
        })
        break
      case DialogCommand.Jump:
        dialog.runner.jump(...args)
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
