export enum TaleJamApiEndpointId {
  GetStory = 'GET_STORY',
  GetScene = 'GET_SCENE',
  GetAudio = 'GET_AUDIO',
}

export interface TaleJamApiEndpointEntry {
  id: TaleJamApiEndpointId
  collectionId: string
}

export type TaleJamApiEndpointList = Array<TaleJamApiEndpointEntry>
export type TaleJamApiEndpointDict = Record<TaleJamApiEndpointId, TaleJamApiEndpointEntry>

export const taleJamApiEndpointList: TaleJamApiEndpointList = [
  {
    id: TaleJamApiEndpointId.GetStory,
    collectionId: 'tj_stories',
  },
  {
    id: TaleJamApiEndpointId.GetScene,
    collectionId: 'tj_scenes',
  },
  {
    id: TaleJamApiEndpointId.GetAudio,
    collectionId: 'tj_audio',
  },
]

export const taleJamApiEndpointDict: TaleJamApiEndpointDict = taleJamApiEndpointList.reduce((acc, entry) => {
  acc[entry.id] = entry
  return acc
}, {} as TaleJamApiEndpointDict)
