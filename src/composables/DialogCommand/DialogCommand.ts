import { DialogBool, DialogCommand } from '@/models/DialogCommand/DialogCommand'
import useGameScene from '@/composables/GameScene/GameScene'
import type { GameSceneId } from '@/models/GameScene/GameScene'
import type { DialogResultCommandData } from '@/models/DialogResult/DialogResult'
import { useRouter } from 'vue-router'
import type { Dialog } from '@/models/Dialog/Dialog'
import useRouteRecord from '@/composables/RouteRecord/RouteRecord'
import type { RouteRecordId } from '@/models/RouteRecord/RouteRecord'
import { useDialogHotspot } from '@/composables/DialogHotspot/DialogHotspot'

const parseBoolean = (flag: string) => {
  switch (flag) {
    case DialogBool.True:
      return true
    case DialogBool.False:
      return false
    default:
      throw new Error(`Dialog boolean value "${flag}" is invalid! Accepted values are "True" and "False".`)
  }
}

export default function useDialogCommand(dialog: Dialog) {
  const router = useRouter()
  const { toRoute } = useRouteRecord()
  const { toGameScene } = useGameScene()
  const { isHotspotShown, setHotspotShown } = useDialogHotspot(dialog)

  const handleCommand = async (commandResult: DialogResultCommandData) => {
    const [command, ...args] = commandResult.command.split(' ')

    switch (command as DialogCommand) {
      case DialogCommand.AddHint:
        console.warn('Dialog command "hint" is not implemented yet')
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
        setHotspotShown(label, isHotspotShown(label) ?? true)
        break
      }
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
      case DialogCommand.Jump:
        dialog.runner.jump(...args)
        break
      case DialogCommand.ShowHotspot:
        const [label, showFlag] = args
        setHotspotShown(label, parseBoolean(showFlag))
        break
    }
  }

  return {
    handleCommand,
  }
}
