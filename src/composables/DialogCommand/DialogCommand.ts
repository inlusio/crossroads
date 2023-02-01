import { DialogCommand } from '@/models/DialogCommand/DialogCommand'
import useGameScene from '@/composables/GameScene/GameScene'
import type { GameSceneId } from '@/models/GameScene/GameScene'
import type { DialogResultCommandData } from '@/models/DialogResult/DialogResult'
import { useRouter } from 'vue-router'
import type { Dialog } from '@/models/Dialog/Dialog'
import useRouteRecord from '@/composables/RouteRecord/RouteRecord'
import type { RouteRecordId } from '@/models/RouteRecord/RouteRecord'

export default function useDialogCommand(dialog: Dialog) {
  const router = useRouter()
  const { toRoute } = useRouteRecord()
  const { toGameScene } = useGameScene()

  const handleCommand = async (commandResult: DialogResultCommandData) => {
    const [command, ...args] = commandResult.command.split(' ')

    switch (command as DialogCommand) {
      case DialogCommand.AddHint:
        break
      case DialogCommand.AddHotspot: {
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
      }
      case DialogCommand.Jump:
        dialog.runner.jump(...args)
        break
      case DialogCommand.GotoExternal:
        window.location.href = args[0]
        break
      case DialogCommand.GotoRoute: {
        const name = args[0] as RouteRecordId
        await router.push(toRoute({ name }))
        break
      }
      case DialogCommand.GotoScene:
        await router.push(toGameScene(args[0] as GameSceneId))
        break
    }
  }

  return {
    handleCommand,
  }
}
