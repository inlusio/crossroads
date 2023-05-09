import type { Ref } from 'vue'
import { watch } from 'vue'
import { useStoryDataStore } from '@/stores/StoryData'
import { storeToRefs } from 'pinia'
import useTaleJamApi from '@/composables/TaleJamApi/TaleJamApi'
import type { TaleJamSceneOverview, TaleJamStory } from '@/models/TaleJam/TaleJam'

export default function useStoryData() {
  const storyDataStore = useStoryDataStore()
  const { sceneList, storyEntry, storyId } = storeToRefs(storyDataStore)
  const { getStoryEntry, getSceneList } = useTaleJamApi()

  watch(
    () => storyId.value,
    async () => {
      if (typeof storyId.value != 'number') {
        return
      }

      storyEntry.value = (await getStoryEntry(storyId.value)) as TaleJamStory
    },
    { immediate: true },
  )

  watch(
    () => storyEntry.value,
    async () => {
      if (storyEntry.value == null) {
        return
      }

      sceneList.value = (await getSceneList(storyEntry.value.tj_scenes)) as Array<TaleJamSceneOverview>
    },
    { immediate: true },
  )

  return {
    storyEntry: storyEntry as Ref<TaleJamStory | null>,
    storyId: storyId as Ref<number | null>,
  }
}
