import useRouteRecord from '@/composables/RouteRecord/RouteRecord'
import { ref, watch } from 'vue'
import useGameStory from '@/composables/GameStory/GameStory'

export default function useSceneTransition() {
  const { sceneParam } = useRouteRecord()
  const { sceneOverviewList } = useGameStory()

  const transitionName = ref<string>('')
  const transitionMode = ref<'default' | 'out-in' | 'in-out'>('default')

  watch(
    () => sceneParam.value,
    (nVal, oVal) => {
      if ([nVal, oVal].every((v) => sceneOverviewList.value.some(({ scene_slug }) => scene_slug === v))) {
        transitionName.value = 'trs-scene-fade'
        transitionMode.value = 'out-in'
      } else {
        transitionName.value = ''
        transitionMode.value = 'default'
      }
    },
    { immediate: true },
  )

  return {
    transitionName,
    transitionMode,
  }
}
