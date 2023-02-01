import screenfullApi from 'screenfull'
import { ref } from 'vue'

export default function useFullscreenController() {
  const screenfull = screenfullApi

  const showFullscreen = ref<boolean>(false)
  const isScreenfullEnabled = screenfullApi.isEnabled

  const toggleFullscreen = async () => {
    if (isScreenfullEnabled) {
      if (showFullscreen.value) {
        await screenfull.exit()
      } else {
        await screenfull.request()
      }
    }
  }

  screenfull.on('change', () => {
    showFullscreen.value = screenfull.isFullscreen
  })

  return {
    showFullscreen,
    toggleFullscreen,
  }
}
