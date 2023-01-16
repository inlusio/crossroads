import useRouteRecord from '@/composables/RouteRecord/RouteRecord'
import { ref, watch } from 'vue'
import type { GameSceneContent, GameSceneId } from '@/models/GameScene/GameScene'
import useViteGlobUtils from '@/composables/ViteGlobUtils/ViteGlobUtils'
import type { RouteRecord } from 'vue-router'
import { RouteRecordId, RouteRecordParam } from '@/models/RouteRecord/RouteRecord'

export default function useGameScene() {
  const { toRoute, sceneParam } = useRouteRecord()
  const { mapToIds } = useViteGlobUtils()

  const modules = mapToIds(import.meta.glob('../../../content/cms/scene/de/*.json'), '.json')
  const content = ref<GameSceneContent | null>(null)

  const toGameScene = (targetId: GameSceneId): RouteRecord => {
    return toRoute({
      name: RouteRecordId.Scene,
      params: {
        [RouteRecordParam.Scene]: targetId,
      },
    })
  }

  watch(
    sceneParam,
    async () => {
      const activeGameScene = sceneParam.value as GameSceneId

      if (modules[activeGameScene]) {
        const result = await modules[activeGameScene]()
        content.value = result.default as GameSceneContent
      } else {
        content.value = null
      }
    },
    { immediate: true },
  )

  return {
    content,
    scene: sceneParam,
    toGameScene,
  }
}
