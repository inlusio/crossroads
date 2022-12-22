import useRouteRecord from '@/composables/RouteRecord/RouteRecord'
import { ref, watch } from 'vue'
import type { GameSceneContent, GameSceneId } from '@/models/GameScene/GameScene'
import useViteGlobUtils from '@/composables/ViteGlobUtils/ViteGlobUtils'

export default function useGameScene() {
  const { sceneParam } = useRouteRecord()
  const { mapToIds } = useViteGlobUtils()

  const modules = mapToIds(import.meta.glob('../../../content/cms/scene/*.json'), '.json')
  const content = ref<GameSceneContent | null>(null)

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

  return { scene: sceneParam, content }
}
