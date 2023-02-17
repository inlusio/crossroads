import { computed, watch } from 'vue'
import { useToggle } from '@vueuse/core'
import { useAudioStore } from '@/stores/Audio'
import { storeToRefs } from 'pinia'

export default function useAudioController() {
  const audioStore = useAudioStore()
  const { reset } = audioStore
  const { allowAudio, playAudio } = storeToRefs(audioStore)

  const audioSrc = computed<string>(() => {
    // if (hierarchyId && fileId?.value) {
    //   return `/file/other/${hierarchyId}-audio/${fileId.value}.mp3`
    // }

    return ''
  })

  const toggleAllowAudio = useToggle(allowAudio)
  const togglePlayAudio = useToggle(playAudio)

  const handleAudioEntrance = () => {
    togglePlayAudio(playAudio.value)

    // if (route.name === RouteRecordId.GameDistrict) {
    //   togglePlayAudio(true)
    // } else {
    //   togglePlayAudio(false)
    // }
  }

  watch(
    allowAudio,
    (v) => {
      togglePlayAudio(v)
    },
    { immediate: true },
  )

  return {
    audioSrc,
    allowAudio,
    playAudio,
    toggleAllowAudio,
    togglePlayAudio,
    reset,
    handleAudioEntrance,
  }
}
