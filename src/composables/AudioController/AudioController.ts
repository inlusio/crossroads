import { ref } from 'vue'
import { useToggle } from '@vueuse/core'
import { useAudioStore } from '@/stores/Audio'
import { storeToRefs } from 'pinia'

const audioContentLoaded = ref<boolean>(false)

export default function useAudioController() {
  const audioStore = useAudioStore()
  const { load, reset } = audioStore
  const { allowAudio, audioChannels, audioFiles, interactionOccured } = storeToRefs(audioStore)

  const toggleAllowAudio = useToggle(allowAudio)

  // TODO: watch audioOverviewList

  load().then(() => {
    audioContentLoaded.value = true
  })

  return {
    allowAudio,
    audioContentLoaded,
    interactionOccured,
    audioChannels,
    audioFiles,
    toggleAllowAudio,
    reset,
  }
}
