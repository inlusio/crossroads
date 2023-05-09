import { Directus } from '@directus/sdk'
import type { ManyItems } from '@directus/sdk'
import type { TaleJamCollections } from '@/models/TaleJam/TaleJam'
import type { TaleJamSceneOverview } from '@/models/TaleJam/TaleJam'

const directus = new Directus<TaleJamCollections>(import.meta.env.VITE_TALE_JAM_API_BASE_URL)

async function getStoryList() {
  // const {} = taleJamApiEndpointDict[TaleJamApiEndpointId.GetStory]
  return await directus.items('tj_stories').readByQuery({})
}

async function getStoryEntry(storyId: number) {
  // const {} = taleJamApiEndpointDict[TaleJamApiEndpointId.GetStory]
  return await directus.items('tj_stories').readOne(storyId)
}

async function getSceneList(sceneIds: Array<number>): Promise<ManyItems<TaleJamSceneOverview>> {
  // const {} = taleJamApiEndpointDict[TaleJamApiEndpointId.GetScene]
  return await directus.items('tj_scenes').readByQuery({
    filter: { id: { _in: sceneIds } },
    fields: ['id', 'scene_id'],
  })
}

async function getSceneEntry(storyId: number) {
  // const {} = taleJamApiEndpointDict[TaleJamApiEndpointId.GetScene]
  return await directus.items('tj_scenes').readOne(storyId)
}

export default function useTaleJamApi() {
  return {
    getStoryList,
    getStoryEntry,
    getSceneList,
    getSceneEntry,
  }
}
