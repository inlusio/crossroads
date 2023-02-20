<template>
  <audio :id="channel.label" ref="audioEl" @ended="onEnded">
    <source :src="channelSrc" type="audio/mp3" />
  </audio>
</template>

<script lang="ts" setup>
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
  const repeatCount = ref<number>(0)
  const channelSrc = computed<string>(() => {
    return audioFiles.value[props.channel.file].file
  })
  const isAllowedToStart = computed<boolean>(() => {
    return allowAudio.value && repeatCount.value < props.channel.repeat && !!interactionOccured.value
  })

  const cancelListener = onClickOutside(audioEl, () => {
    interactionOccured.value = true
  })

  const startPlayback = async () => {
    try {
      audioEl.value!.currentTime = 0
      await audioEl.value!.play()
      audioEl.value!.volume = props.channel.volume
      console.log('startPlayback – start – success', repeatCount.value, props.channel.repeat)
    } catch (exception) {
      // Audio couldn't be loaded, change state accordingly
      interactionOccured.value = false
      await audioEl.value!.pause()
      console.log('startPlayback – start – fail', repeatCount.value, props.channel.repeat)
    }
  }

  const stopPlayback = async () => {
    await audioEl.value!.pause()
  }

  watch(isAllowedToStart, (n) => {
    if (n) {
      startPlayback()
    } else {
      stopPlayback()
    }
  })

  watch(
    () => props.channel.volume,
    (v) => {
      audioEl.value!.volume = v
    },
  )

  watch(
    () => interactionOccured.value,
    (v) => {
      v && cancelListener && cancelListener()
    },
  )

  const onEnded = () => {
    repeatCount.value += 1
  }

  onMounted(() => {
    if (!audioEl.value) {
      return
    }

    startPlayback()
  })
</script>
