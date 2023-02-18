<template>
  <audio :id="channel.label" ref="audioEl" loop>
    <source :src="channelSrc" type="audio/mp3" />
  </audio>
</template>

<script lang="ts" setup>
  import { isEqual } from 'lodash-es'
  import { computed, onMounted, ref, watch } from 'vue'
  import useAudioController from '@/composables/AudioController/AudioController'
  import type { AudioChannel } from '@/models/AudioChannel/AudioChannel'
  import { onClickOutside } from '@vueuse/core'

  interface Props {
    channel: AudioChannel
  }

  const props = defineProps<Props>()
  const { allowAudio, interactionOccured, audioFiles } = useAudioController()

  const audioEl = ref<HTMLAudioElement | null>(null)
  const channelSrc = computed<string>(() => {
    return audioFiles.value[props.channel.file].file
  })

  const cancel = onClickOutside(audioEl, () => startPlayback())

  const startPlayback = async () => {
    if (allowAudio.value) {
      try {
        await audioEl.value!.play()
        audioEl.value!.volume = props.channel.volume
        cancel && cancel()
        interactionOccured.value = true
      } catch (exception) {
        // Audio couldn't be loaded, change state accordingly
        interactionOccured.value = false
        await audioEl.value!.pause()
      }
    } else {
      await stopPlayback()
    }
  }

  const stopPlayback = async () => {
    await audioEl.value!.pause()
  }

  const updatePlayback = async () => {
    audioEl.value!.volume = props.channel.volume
  }

  watch([allowAudio, () => props.channel], ([n1, n2], [o1, o2]) => {
    if (!audioEl.value) {
      return
    }

    // NOTE: "allowAudio" changed from `false` to `true`
    if (n1 && !o1) {
      startPlayback()
      return
    }

    // NOTE: "allowAudio" changed from `true` to `false`
    if (!n1 && o1) {
      stopPlayback()
      return
    }

    // NOTE: "props.channel" changed / "allowAudio" stays `true`
    if (n1 && !isEqual(n2, o2)) {
      updatePlayback()
    }
  })

  onMounted(() => {
    if (!audioEl.value) {
      return
    }

    startPlayback()
  })
</script>
