import { ref } from 'vue'
import { useToggle } from '@vueuse/core'
import { useAudioStore } from '@/stores/Audio'
import { storeToRefs } from 'pinia'

const interactionOccured = ref<boolean | undefined>(undefined)
const audioContentLoaded = ref<boolean>(false)

export default function useAudioController() {
  const audioStore = useAudioStore()
  const { load, reset } = audioStore
  const { allowAudio, audioChannels, audioFiles } = storeToRefs(audioStore)

  const toggleAllowAudio = useToggle(allowAudio)

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
