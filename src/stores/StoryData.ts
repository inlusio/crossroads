import { defineStore } from 'pinia'
import { StoreId } from '@/models/Store'
import type { TaleJamSceneOverview, TaleJamStory } from '@/models/TaleJam/TaleJam'
import { ref } from 'vue'

export const useStoryDataStore = defineStore(StoreId.StoryData, () => {
  // const { persistentRef } = usePersistentStorage(StoreId.TaleJam)

  const storyId = ref<number | null>(null)

  const storyEntry = ref<TaleJamStory | null>(null)
  const sceneList = ref<Array<TaleJamSceneOverview>>([])

  // With persistent ref
  // const storyEntry = persistentRef<TaleJamStory | null>('storyEntry', null, { customSerializerId: CustomSerializerId.Object })
  // const sceneList = persistentRef<Array<TaleJamSceneOverview>>('sceneList', [], { customSerializerId: CustomSerializerId.Object })

  return {
    storyEntry,
    storyId,
    sceneList,
  }
})
