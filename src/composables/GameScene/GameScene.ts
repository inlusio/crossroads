import useRouteRecord from '@/composables/RouteRecord/RouteRecord'
import type { RouteRecord } from 'vue-router'
import { RouteRecordId, RouteRecordParam } from '@/models/RouteRecord/RouteRecord'
import { useGameDataStore } from '@/stores/GameData'
import { storeToRefs } from 'pinia'
import type { TaleDeckScene } from '@/models/TaleDeck/TaleDeck'
import type { Ref } from 'vue'

export default function useGameScene() {
  const gameDataStore = useGameDataStore()
  const { sceneEntry } = storeToRefs(gameDataStore)
  const { toRoute, sceneParam } = useRouteRecord()

  const toGameScene = (targetId: string): RouteRecord => {
    return toRoute({
      name: RouteRecordId.Scene,
      params: {
        [RouteRecordParam.Scene]: targetId.toString(),
      },
    })
  }

  return {
    content: sceneEntry as Ref<TaleDeckScene | null>,
    sceneId: sceneParam,
    toGameScene,
  }
}
