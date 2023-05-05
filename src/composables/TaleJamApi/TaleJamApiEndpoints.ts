export enum TaleJamApiEndpointId {
  GetStoryList = 'GET_STORY_LIST',
}

export interface TaleJamApiEndpointEntry {
  id: TaleJamApiEndpointId
  collectionId: string
}

export type TaleJamApiEndpointList = Array<TaleJamApiEndpointEntry>
export type TaleJamApiEndpointDict = Record<TaleJamApiEndpointId, TaleJamApiEndpointEntry>

export const taleJamApiEndpointList: TaleJamApiEndpointList = [
  {
    id: TaleJamApiEndpointId.GetStoryList,
    collectionId: 'tj_stories',
  },
]

export const taleJamApiEndpointDict: TaleJamApiEndpointDict = taleJamApiEndpointList.reduce((acc, entry) => {
  acc[entry.id] = entry
  return acc
}, {} as TaleJamApiEndpointDict)
