import { defineStore } from 'pinia'
import { StoreId } from '@/models/Store'
import usePersistentStorage from '@/composables/PersistentStorage/PersistentStorage'

export const useAudioStore = defineStore(StoreId.Audio, () => {
  const { persistentRef } = usePersistentStorage(StoreId.Audio)
  const allowAudio = persistentRef<boolean>('allowAudio', true)
  const playAudio = persistentRef<boolean>('playAudio', true)

  const reset = () => {
    allowAudio.value = true
    playAudio.value = true
  }

  return { allowAudio, playAudio, reset }
})
