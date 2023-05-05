import { Directus } from '@directus/sdk'
import { taleJamApiEndpointDict, TaleJamApiEndpointId } from '@/composables/TaleJamApi/TaleJamApiEndpoints'

const directus = new Directus(import.meta.env.VITE_TALE_JAM_API_BASE_URL)

interface TaleJamStory {
  id: number
}

async function getStoryList() {
  const { collectionId } = taleJamApiEndpointDict[TaleJamApiEndpointId.GetStoryList]
  const publicData = await directus.items<string, TaleJamStory>(collectionId).readByQuery()

  console.log(publicData)
}

export default function useTaleJamApi() {
  return { getStoryList }
}
