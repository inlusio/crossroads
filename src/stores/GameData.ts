import { defineStore } from 'pinia'
import { StoreId } from '@/models/Store'
import type { TaleJamScene, TaleJamSceneOverview, TaleJamStory } from '@/models/TaleJam/TaleJam'
import { ref, watch } from 'vue'
import useTaleJamApi from '@/composables/TaleJamApi/TaleJamApi'
import useRouteRecord from '@/composables/RouteRecord/RouteRecord'

export const useGameDataStore = defineStore(StoreId.GameData, () => {
  const { sceneParam } = useRouteRecord()
  const { getStoryEntry, getSceneList, getSceneEntryBySceneId } = useTaleJamApi()
  // const { persistentRef } = usePersistentStorage(StoreId.TaleJam)

  const storyId = ref<number | null>(null)
  const storyEntry = ref<TaleJamStory | null>(null)
  const sceneList = ref<Array<TaleJamSceneOverview>>([])
  const sceneEntry = ref<TaleJamScene | null>(null)

  // With persistent ref
  // const storyEntry = persistentRef<TaleJamStory | null>('storyEntry', null, { customSerializerId: CustomSerializerId.Object })
  // const sceneList = persistentRef<Array<TaleJamSceneOverview>>('sceneList', [], { customSerializerId: CustomSerializerId.Object })

  watch(
    () => storyId.value,
    async () => {
      if (typeof storyId.value != 'number') {
        return
      }

      const result = await getStoryEntry(storyId.value)
      storyEntry.value = result as TaleJamStory
    },
    { immediate: true },
  )

  watch(
    () => storyEntry.value,
    async () => {
      if (storyEntry.value == null) {
        return
      }

      const result = await getSceneList(storyEntry.value.tj_scenes)
      sceneList.value = result.data as Array<TaleJamSceneOverview>
    },
    { immediate: true },
  )

  watch(
    sceneParam,
    async () => {
      if (sceneParam.value != null) {
        const { data } = await getSceneEntryBySceneId(sceneParam.value)

        if (Array.isArray(data) && data.length > 0) {
          sceneEntry.value = data[0] as TaleJamScene
        } else {
          sceneEntry.value = null
        }
      } else {
        sceneEntry.value = null
      }
    },
    { immediate: true },
  )

  return {
    storyEntry,
    storyId,
    sceneList,
    sceneEntry,
  }
})
