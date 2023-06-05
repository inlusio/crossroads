export enum TaleDeckApiEndpointId {
  GetStory = 'GET_STORY',
  GetScene = 'GET_SCENE',
  GetAudio = 'GET_AUDIO',
}

export interface TaleDeckApiEndpointEntry {
  id: TaleDeckApiEndpointId
  collectionId: string
}

export type TaleDeckApiEndpointList = Array<TaleDeckApiEndpointEntry>
export type TaleDeckApiEndpointDict = Record<TaleDeckApiEndpointId, TaleDeckApiEndpointEntry>

export const taleDeckApiEndpointList: TaleDeckApiEndpointList = [
  {
    id: TaleDeckApiEndpointId.GetStory,
    collectionId: 'tj_stories',
  },
  {
    id: TaleDeckApiEndpointId.GetScene,
    collectionId: 'tj_scenes',
  },
  {
    id: TaleDeckApiEndpointId.GetAudio,
    collectionId: 'tj_audio',
  },
]

export const taleDeckApiEndpointDict: TaleDeckApiEndpointDict = taleDeckApiEndpointList.reduce((acc, entry) => {
  acc[entry.id] = entry
  return acc
}, {} as TaleDeckApiEndpointDict)
