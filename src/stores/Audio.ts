import { defineStore } from 'pinia'
import { StoreId } from '@/models/Store'
import usePersistentStorage from '@/composables/PersistentStorage/PersistentStorage'
import type { AudioChannelDict } from '@/models/AudioChannel/AudioChannel'
import { ref } from 'vue'
import type { AudioFileContentDict } from '@/models/AudioFile/AudioFile'
import useGameStory from '@/composables/GameStory/GameStory'
import useTaleDeckApi from '@/composables/TaleDeckApi/TaleDeckApi'

export const useAudioStore = defineStore(StoreId.Audio, () => {
  const { persistentRef } = usePersistentStorage(StoreId.Audio)
  const { audioOverviewList } = useGameStory()
  const { getFile } = useTaleDeckApi()

  const allowAudio = persistentRef<boolean>('allowAudio', true)
  const audioChannels = ref<AudioChannelDict>({})
  const audioFiles = ref<AudioFileContentDict>({})
  const interactionOccured = ref<boolean | undefined>(undefined)

  const load = async () => {
    audioFiles.value = audioOverviewList.value.reduce((acc, { audio_slug, audio_file }) => {
      acc[audio_slug] = { id: audio_slug, file: getFile(audio_file) }
      return acc
    }, {} as AudioFileContentDict)
  }

  const reset = () => {
    allowAudio.value = true
    audioChannels.value = {}
  }

  return { allowAudio, audioChannels, audioFiles, interactionOccured, load, reset }
})
