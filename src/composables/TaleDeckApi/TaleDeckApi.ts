import { Directus } from '@directus/sdk'
import type { ManyItems } from '@directus/sdk'
import type { TaleDeckAudioOverview, TaleDeckCollections } from '@/models/TaleDeck/TaleDeck'
import type { TaleDeckSceneOverview } from '@/models/TaleDeck/TaleDeck'

const directus = new Directus<TaleDeckCollections>(import.meta.env.VITE_TALE_JAM_API_BASE_URL)

function getFile(tjFileId: string): string {
  return `${import.meta.env.VITE_TALE_JAM_API_BASE_URL}assets/${tjFileId}`
}

async function getStoryList(tjIds: Array<number>) {
  // const {} = taleDeckApiEndpointDict[TaleDeckApiEndpointId.GetStory]
  return await directus.items('tj_stories').readByQuery({
    filter: { id: { _in: tjIds } },
    fields: ['id'],
  })
}

async function getStoryEntry(tjId: number) {
  // const {} = taleDeckApiEndpointDict[TaleDeckApiEndpointId.GetStory]
  return await directus.items('tj_stories').readOne(tjId)
}

async function getSceneList(tjIds: Array<number>): Promise<ManyItems<TaleDeckSceneOverview>> {
  // const {} = taleDeckApiEndpointDict[TaleDeckApiEndpointId.GetScene]
  return await directus.items('tj_scenes').readByQuery({
    filter: { id: { _in: tjIds } },
    fields: ['id', 'scene_slug'],
  })
}

async function getSceneEntry(tjId: number) {
  // const {} = taleDeckApiEndpointDict[TaleDeckApiEndpointId.GetScene]
  return await directus.items('tj_scenes').readOne(tjId)
}

async function getSceneEntryBySlug(slug: string) {
  // const {} = taleDeckApiEndpointDict[TaleDeckApiEndpointId.GetScene]
  return await directus.items('tj_scenes').readByQuery({
    filter: { scene_slug: { _eq: slug } },
    limit: 1,
  })
}

async function getAudioList(tjIds: Array<number>): Promise<ManyItems<TaleDeckAudioOverview>> {
  // const {} = taleDeckApiEndpointDict[TaleDeckApiEndpointId.GetAudio]
  return await directus.items('tj_audio').readByQuery({
    filter: { id: { _in: tjIds } },
    fields: ['id', 'audio_file', 'audio_slug'],
  })
}

export default function useTaleDeckApi() {
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
