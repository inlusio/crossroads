import { watch } from 'vue'
import { useToggle } from '@vueuse/core'
import { useAudioStore } from '@/stores/Audio'
import { storeToRefs } from 'pinia'

export default function useAudioController() {
  const audioStore = useAudioStore()
  const { load, reset } = audioStore
  const { allowAudio, audioChannels, audioFiles } = storeToRefs(audioStore)

  const toggleAllowAudio = useToggle(allowAudio)

  // const handleAudioEntrance = () => {
  //   Object.entries(audioChannels.value).forEach(([key, value]) => {
  //     console.log(key, value)
  //   })
  // }

  load().then(() => console.log('audio loaded'))

  watch(
    allowAudio,
    (v) => {
      console.log('TODO')
      console.log(v)
    },
    { immediate: true },
  )

  return {
    allowAudio,
    audioChannels,
    audioFiles,
    toggleAllowAudio,
    reset,
  }
}
