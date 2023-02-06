import useRouteRecord from '@/composables/RouteRecord/RouteRecord'
import { ref, watch } from 'vue'
import { GameSceneId } from '@/models/GameScene/GameScene'

export default function useSceneTransition() {
  const { sceneParam } = useRouteRecord()

  const transitionName = ref<string>('')
  const transitionMode = ref<string>('')

  watch(
    () => sceneParam.value,
    (value, oldValue) => {
      if ([value, oldValue].every((v) => Object.values(GameSceneId).includes(v as GameSceneId))) {
        transitionName.value = 'trs-simple-fade'
        transitionMode.value = 'out-in'
      } else {
        transitionName.value = ''
        transitionMode.value = ''
      }
    },
    { immediate: true },
  )

  return {
    transitionName,
    transitionMode,
  }
}
