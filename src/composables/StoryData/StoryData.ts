import type { Ref } from 'vue'
import { watch } from 'vue'
import { useTaleJamStoryStore } from '@/stores/TaleJamStory'
import { storeToRefs } from 'pinia'
import useTaleJamApi from '@/composables/TaleJamApi/TaleJamApi'
import type { TaleJamStory } from '@/models/TaleJam/TaleJam'

export default function useStoryData() {
  const taleJamStoryStore = useTaleJamStoryStore()
  const { taleJamStory, taleJamStoryId } = storeToRefs(taleJamStoryStore)
  const { getStoryEntry } = useTaleJamApi()

  watch(
    () => taleJamStoryId.value,
    async () => {
      if (typeof taleJamStoryId.value != 'number') {
        return
      }

      taleJamStory.value = (await getStoryEntry(taleJamStoryId.value)) as TaleJamStory
    },
    { immediate: true },
  )

  return {
    taleJamStory: taleJamStory as Ref<TaleJamStory | null>,
    taleJamStoryId: taleJamStoryId as Ref<number | null>,
  }
}
