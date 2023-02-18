export type AudioChannelVolumeStorage = Record<string, number>

export type AudioChannelBehaviour = 'fade' | 'seamless' | 'random'

export interface AudioChannel {
  label: string
  file: string
  volume: number
  repeat: number
  behaviour: AudioChannelBehaviour
}

export type AudioChannelList = Array<AudioChannel>
export type AudioChannelDict = Record<string, AudioChannel>
