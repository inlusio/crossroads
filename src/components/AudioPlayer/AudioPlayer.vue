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
    return allowAudio.value && repeatCount.value < props.channel.repeat
  })

  const cancelListener = onClickOutside(audioEl, () => {
    interactionOccured.value = true
  })

  const startPlayback = async () => {
    if (isAllowedToStart.value) {
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
    } else {
      console.log('startPlayback – stop', repeatCount.value, props.channel.repeat)
      await stopPlayback()
    }
  }

  const stopPlayback = async () => {
    await audioEl.value!.pause()
  }

  const handleRepeat = (repeat: number) => {
    if (isAllowedToStart.value) {
      console.log('handle repeat start', repeatCount.value, repeat)
      startPlayback()
    } else {
      console.log('handle repeat stop', repeatCount.value, repeat)
      stopPlayback()
    }
  }

  watch(allowAudio, (n) => {
    if (!audioEl.value) {
      return
    }

    if (n) {
      startPlayback()
    } else {
      stopPlayback()
    }
  })

  watch(repeatCount, () => {
    handleRepeat(props.channel.repeat)
  })

  watch(
    () => props.channel.volume,
    (v) => {
      audioEl.value!.volume = v
    },
  )

  watch(
    () => props.channel.repeat,
    (v) => {
      handleRepeat(v)
    },
  )

  watch(
    () => interactionOccured.value,
    (v) => {
      if (v) {
        cancelListener && cancelListener()
        startPlayback()
      }
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
