import { defineStore } from 'pinia'
import { StoreId } from '@/models/Store'
import type {
  TaleDeckAudioOverview,
  TaleDeckScene,
  TaleDeckSceneOverview,
  TaleDeckStory,
} from '@/models/TaleDeck/TaleDeck'
import { ref, watch } from 'vue'
import useTaleDeckApi from '@/composables/TaleDeckApi/TaleDeckApi'
import useRouteRecord from '@/composables/RouteRecord/RouteRecord'

export const useGameDataStore = defineStore(StoreId.GameData, () => {
  const { sceneParam } = useRouteRecord()
  const { getStoryEntry, getSceneList, getAudioList, getSceneEntryBySlug } = useTaleDeckApi()
  // const { persistentRef } = usePersistentStorage(StoreId.TaleDeck)

  const storyId = ref<number | null>(null)
  const storyEntry = ref<TaleDeckStory | null>(null)
  const sceneOverviewList = ref<Array<TaleDeckSceneOverview>>([])
  const sceneEntry = ref<TaleDeckScene | null>(null)
  const audioOverviewList = ref<Array<TaleDeckAudioOverview>>([])

  // With persistent ref
  // const storyEntry = persistentRef<TaleDeckStory | null>('storyEntry', null, { customSerializerId: CustomSerializerId.Object })
  // const sceneOverviewList = persistentRef<Array<TaleDeckSceneOverview>>('sceneOverviewList', [], { customSerializerId: CustomSerializerId.Object })

  watch(
    () => storyId.value,
    async () => {
      if (typeof storyId.value != 'number') {
        return
      }

      const result = await getStoryEntry(storyId.value)
      storyEntry.value = result as TaleDeckStory
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

      sceneOverviewList.value = r1.data as Array<TaleDeckSceneOverview>
      audioOverviewList.value = r2.data as Array<TaleDeckAudioOverview>
    },
    { immediate: true },
  )

  watch(
    sceneParam,
    async () => {
      if (sceneParam.value != null) {
        const { data } = await getSceneEntryBySlug(sceneParam.value)

        if (Array.isArray(data) && data.length > 0) {
          sceneEntry.value = data[0] as TaleDeckScene
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
