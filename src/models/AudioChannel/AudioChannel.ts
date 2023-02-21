export type AudioChannelVolumeStorage = Record<string, number>

export type AudioChannelBehaviour = 'fade' | 'seamless' | 'random'

export interface AudioChannelEntry {
  label: string
  file: string
  volume: number
  repeat: number
  behaviour: AudioChannelBehaviour
  stop: boolean
}

export type AudioChannelList = Array<AudioChannelEntry>
export type AudioChannelDict = Record<string, AudioChannelEntry>
