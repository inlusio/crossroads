import { defineStore } from 'pinia'
import { StoreId } from '@/models/Store'
import type { TaleJamAudioOverview, TaleJamScene, TaleJamSceneOverview, TaleJamStory } from '@/models/TaleJam/TaleJam'
import { ref, watch } from 'vue'
import useTaleJamApi from '@/composables/TaleJamApi/TaleJamApi'
import useRouteRecord from '@/composables/RouteRecord/RouteRecord'

export const useGameDataStore = defineStore(StoreId.GameData, () => {
  const { sceneParam } = useRouteRecord()
  const { getStoryEntry, getSceneList, getAudioList, getSceneEntryBySlug } = useTaleJamApi()
  // const { persistentRef } = usePersistentStorage(StoreId.TaleJam)

  const storyId = ref<number | null>(null)
  const storyEntry = ref<TaleJamStory | null>(null)
  const sceneOverviewList = ref<Array<TaleJamSceneOverview>>([])
  const sceneEntry = ref<TaleJamScene | null>(null)
  const audioOverviewList = ref<Array<TaleJamAudioOverview>>([])

  // With persistent ref
  // const storyEntry = persistentRef<TaleJamStory | null>('storyEntry', null, { customSerializerId: CustomSerializerId.Object })
  // const sceneOverviewList = persistentRef<Array<TaleJamSceneOverview>>('sceneOverviewList', [], { customSerializerId: CustomSerializerId.Object })

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

      const { tj_scenes, tj_audio } = storyEntry.value
      const [r1, r2] = await Promise.all([getSceneList(tj_scenes), getAudioList(tj_audio)])

      sceneOverviewList.value = r1.data as Array<TaleJamSceneOverview>
      audioOverviewList.value = r2.data as Array<TaleJamAudioOverview>
    },
    { immediate: true },
  )

  watch(
    sceneParam,
    async () => {
      if (sceneParam.value != null) {
        const { data } = await getSceneEntryBySlug(sceneParam.value)

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
    sceneOverviewList,
    sceneEntry,
    audioOverviewList,
  }
})
