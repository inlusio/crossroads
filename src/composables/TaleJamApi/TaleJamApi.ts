import { Directus } from '@directus/sdk'
import type { ManyItems } from '@directus/sdk'
import type { TaleJamCollections } from '@/models/TaleJam/TaleJam'
import type { TaleJamSceneOverview } from '@/models/TaleJam/TaleJam'

const directus = new Directus<TaleJamCollections>(import.meta.env.VITE_TALE_JAM_API_BASE_URL)

async function getStoryList(tjIds: Array<number>) {
  // const {} = taleJamApiEndpointDict[TaleJamApiEndpointId.GetStory]
  return await directus.items('tj_stories').readByQuery({
    filter: { id: { _in: tjIds } },
    fields: ['id'],
  })
}

async function getStoryEntry(tjId: number) {
  // const {} = taleJamApiEndpointDict[TaleJamApiEndpointId.GetStory]
  return await directus.items('tj_stories').readOne(tjId)
}

async function getSceneList(tjIds: Array<number>): Promise<ManyItems<TaleJamSceneOverview>> {
  // const {} = taleJamApiEndpointDict[TaleJamApiEndpointId.GetScene]
  return await directus.items('tj_scenes').readByQuery({
    filter: { id: { _in: tjIds } },
    fields: ['id', 'scene_id'],
  })
}

async function getSceneEntry(tjId: number) {
  // const {} = taleJamApiEndpointDict[TaleJamApiEndpointId.GetScene]
  return await directus.items('tj_scenes').readOne(tjId)
}

async function getSceneEntryBySceneId(sceneId: string) {
  // const {} = taleJamApiEndpointDict[TaleJamApiEndpointId.GetScene]
  return await directus.items('tj_scenes').readByQuery({
    filter: { scene_id: { _eq: sceneId } },
    limit: 1,
  })
}

export default function useTaleJamApi() {
  return {
    getStoryList,
    getStoryEntry,
    getSceneList,
    getSceneEntry,
    getSceneEntryBySceneId,
  }
}
