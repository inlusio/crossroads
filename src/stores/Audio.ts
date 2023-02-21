import { defineStore } from 'pinia'
import { StoreId } from '@/models/Store'
import usePersistentStorage from '@/composables/PersistentStorage/PersistentStorage'
import type { AudioChannelDict } from '@/models/AudioChannel/AudioChannel'
import { ref } from 'vue'
import type { AudioFileContent, AudioFileContentDict, AudioFileContentList } from '@/models/AudioFile/AudioFile'
import useViteGlobUtils from '@/composables/ViteGlobUtils/ViteGlobUtils'

export const useAudioStore = defineStore(StoreId.Audio, () => {
  const { mapToIds } = useViteGlobUtils()
  const { persistentRef } = usePersistentStorage(StoreId.Audio)

  const modules = mapToIds<AudioFileContent>(
    import.meta.glob<AudioFileContent>('../../content/cms/audio/*.json'),
    '.json',
  )

  const allowAudio = persistentRef<boolean>('allowAudio', true)
  const audioChannels = ref<AudioChannelDict>({})
  const audioFiles = ref<AudioFileContentDict>({})
  const interactionOccured = ref<boolean | undefined>(undefined)

  const load = async () => {
    const promises = Object.values(modules).map(async (value) => {
      return value()
    })
    const files = (await Promise.all(promises)) as AudioFileContentList

    audioFiles.value = files.reduce((acc, value) => {
      acc[value.id] = value
      return acc
    }, {} as AudioFileContentDict)
  }

  const reset = () => {
    allowAudio.value = true
    audioChannels.value = {}
  }

  return { allowAudio, audioChannels, audioFiles, interactionOccured, load, reset }
})
