export type AudioChannelVolumeStorage = Record<string, number>

export type AudioChannelBehaviour = 'fade' | 'seamless' | 'random'

export interface AudioChannel {
  label: string
  file: string
}

export type AudioChannelList = Array<AudioChannel>
export type AudioChannelDict = Record<string, AudioChannel>
