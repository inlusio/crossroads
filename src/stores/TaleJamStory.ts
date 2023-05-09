import { defineStore } from 'pinia'
import { StoreId } from '@/models/Store'
import usePersistentStorage, { CustomSerializerId } from '@/composables/PersistentStorage/PersistentStorage'
import type { TaleJamStory } from '@/models/TaleJam/TaleJam'
import { ref } from 'vue'

export const useTaleJamStoryStore = defineStore(StoreId.TaleJamStory, () => {
  const { persistentRef } = usePersistentStorage(StoreId.TaleJamStory)

  const taleJamStoryId = ref<number | null>(null)

  const taleJamStory = persistentRef<TaleJamStory | null>('taleJamStory', null, {
    customSerializerId: CustomSerializerId.Object,
  })

  return {
    taleJamStory,
    taleJamStoryId,
  }
})
