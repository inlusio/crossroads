import { Directus } from '@directus/sdk'
import type { ManyItems } from '@directus/sdk'
import type { TaleJamAudioOverview, TaleJamCollections } from '@/models/TaleJam/TaleJam'
import type { TaleJamSceneOverview } from '@/models/TaleJam/TaleJam'

const directus = new Directus<TaleJamCollections>(import.meta.env.VITE_TALE_JAM_API_BASE_URL)

function getFile(tjFileId: string): string {
  return `${import.meta.env.VITE_TALE_JAM_API_BASE_URL}assets/${tjFileId}`
}

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
    fields: ['id', 'scene_slug'],
  })
}

async function getSceneEntry(tjId: number) {
  // const {} = taleJamApiEndpointDict[TaleJamApiEndpointId.GetScene]
  return await directus.items('tj_scenes').readOne(tjId)
}

async function getSceneEntryBySlug(slug: string) {
  // const {} = taleJamApiEndpointDict[TaleJamApiEndpointId.GetScene]
  return await directus.items('tj_scenes').readByQuery({
    filter: { scene_slug: { _eq: slug } },
    limit: 1,
  })
}

async function getAudioList(tjIds: Array<number>): Promise<ManyItems<TaleJamAudioOverview>> {
  // const {} = taleJamApiEndpointDict[TaleJamApiEndpointId.GetAudio]
  return await directus.items('tj_audio').readByQuery({
    filter: { id: { _in: tjIds } },
    fields: ['id', 'audio_file', 'audio_slug'],
  })
}

export default function useTaleJamApi() {
  return {
    getFile,
    getStoryList,
    getStoryEntry,
    getSceneList,
    getSceneEntry,
    getSceneEntryBySlug,
    getAudioList,
  }
}
