import type arg from 'arg'
import type { AudioChannelBehaviour } from '@/models/AudioChannel/AudioChannel'

export interface DialogCommandSpecPlayAudio extends arg.Spec {
  '--file': arg.Handler<string>
  '--volume': arg.Handler<number>
  '--loop': arg.Handler<boolean>
  '--repeat': arg.Handler<number>
  '--behaviour': arg.Handler<AudioChannelBehaviour>
}

export type DialogCommandResultPlayAudio = arg.Result<DialogCommandSpecPlayAudio> & {
  file: string
  volume: number
  loop: boolean
  repeat: number
  behaviour: AudioChannelBehaviour
}

export const dialogCommandSpecPlayAudio: arg.Spec = {
  '--file': String,
  '--volume': Number,
  '--repeat': Number,
  '--loop': Boolean,
  '--behaviour': String,
  '-s': '--file',
  '-v': '--volume',
  '-r': '--repeat',
  '-l': '--loop',
  '-b': '--behaviour',
}
