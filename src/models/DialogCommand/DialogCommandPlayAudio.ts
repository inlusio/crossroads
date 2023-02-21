import type arg from 'arg'
import type { AudioChannelBehaviour } from '@/models/AudioChannel/AudioChannel'

export interface DialogCommandSpecPlayAudio extends arg.Spec {
  '--file': arg.Handler<string>
  '--volume': arg.Handler<number>
  '--repeat': arg.Handler<number>
  '--behaviour': arg.Handler<AudioChannelBehaviour>
  '--stop': arg.Handler<boolean>
}

export type DialogCommandResultPlayAudio = arg.Result<DialogCommandSpecPlayAudio> & {
  file: string
  volume: number
  repeat: number
  behaviour: AudioChannelBehaviour
  stop: boolean
}

export const dialogCommandSpecPlayAudio: arg.Spec = {
  '--file': String,
  '--volume': Number,
  '--repeat': Number,
  '--behaviour': String,
  '--stop': Boolean,
  '-f': '--file',
  '-v': '--volume',
  '-r': '--repeat',
  '-b': '--behaviour',
}
