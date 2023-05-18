import { parseArgs } from 'string-args-parser'
import arg from 'arg'
import { DialogBool, dialogCommandDict, DialogCommandId } from '@/models/DialogCommand/DialogCommand'
import useGameScene from '@/composables/GameScene/GameScene'
import type { DialogResultCommandData } from '@/models/DialogResult/DialogResult'
import { useRouter } from 'vue-router'
import type { ReactiveDialog } from '@/models/Dialog/Dialog'
import useRouteRecord from '@/composables/RouteRecord/RouteRecord'
import type { RouteRecordId } from '@/models/RouteRecord/RouteRecord'
import { useDialogHotspot } from '@/composables/DialogHotspot/DialogHotspot'
import type {
  DialogCommandResultAddHotspot,
  DialogCommandSpecAddHotspot,
} from '@/models/DialogCommand/DialogCommandAddHotspot'
import type { DialogCommandResultGeneric, DialogCommandSpecGeneric } from '@/models/DialogCommand/DialogCommandGeneric'
import type {
  DialogCommandResultPlayAudio,
  DialogCommandSpecPlayAudio,
} from '@/models/DialogCommand/DialogCommandPlayAudio'
import useAudioController from '@/composables/AudioController/AudioController'

const PARSE_OPTIONS: arg.Options = {
  permissive: true,
  stopAtPositional: false,
}

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

const parseCommand = <TSpec extends arg.Spec, TResult extends arg.Result<TSpec>>(
  command: string,
): arg.Result<TSpec> & TResult => {
  const argv = parseArgs(command)
  const { spec } = dialogCommandDict[argv[0] as DialogCommandId]
  const result = arg(spec, { ...PARSE_OPTIONS, argv })
  Object.keys(result).forEach((key) => {
    result[key.replace(/^-+/, '')] = result[key]
  })

  return result as arg.Result<TSpec> & TResult
}

export default function useDialogCommand(dialog: ReactiveDialog) {
  const router = useRouter()
  const { toRoute } = useRouteRecord()
  const { toGameScene } = useGameScene()
  const { hotspots, isHotspotShown, setHotspotShown } = useDialogHotspot()
  const { audioChannels } = useAudioController()

  const handleCommand = async (commandResult: DialogResultCommandData) => {
    const { _: positional } = parseCommand<DialogCommandSpecGeneric, DialogCommandResultGeneric>(commandResult.command)
    const [command, ...args] = positional

    switch (command as DialogCommandId) {
      case DialogCommandId.AddHint:
        console.warn('Dialog command "hint" is not implemented yet')
        break
      case DialogCommandId.AddHotspot: {
        const parsed = parseCommand<DialogCommandSpecAddHotspot, DialogCommandResultAddHotspot>(commandResult.command)
        const [_, label] = parsed._
        const { x, y, click } = parsed
        const commandData = click.map((instruction) => {
          return {
            command: instruction,
            metadata: commandResult.metadata,
            hashtags: commandResult.hashtags,
          }
        })

        hotspots.value.push({ x, y, label, commandData })
        setHotspotShown(label, isHotspotShown(label) ?? true)
        break
      }
      case DialogCommandId.GotoExternal:
        window.location.href = args[0]
        break
      case DialogCommandId.GotoRoute: {
        const name = args[0] as RouteRecordId
        await router.push(toRoute({ name }))
        break
      }
      case DialogCommandId.GotoScene:
        await router.push(toGameScene(args[0]))
        break
      case DialogCommandId.Jump:
        dialog.runner.jump(...args)
        break
      case DialogCommandId.ShowHotspot: {
        const [label, showFlag] = args
        setHotspotShown(label, parseBoolean(showFlag))
        break
      }
      case DialogCommandId.PlayAudio: {
        const parsed = parseCommand<DialogCommandSpecPlayAudio, DialogCommandResultPlayAudio>(commandResult.command)
        const [_, label] = parsed._
        const { file, volume, repeat, behaviour, stop } = parsed

        audioChannels.value[label] = {
          label,
          file: file ?? '',
          volume: volume ?? 1,
          repeat: repeat ?? Number.MAX_SAFE_INTEGER,
          behaviour: behaviour ?? 'seamless',
          stop: stop ?? false,
        }
        break
      }
      case DialogCommandId.Test:
        console.log('test')
        break
    }
  }

  return {
    handleCommand,
  }
}
