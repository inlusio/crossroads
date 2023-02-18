<template>
  <audio :id="channel.label" ref="audioEl" loop>
    <source :src="channelSrc" type="audio/mp3" />
  </audio>
</template>

<script lang="ts" setup>
  import { computed, onMounted, ref, watch } from 'vue'
  import useAudioController from '@/composables/AudioController/AudioController'
  import type { AudioChannel } from '@/models/AudioChannel/AudioChannel'

  interface Props {
    channel: AudioChannel
  }

  const props = defineProps<Props>()
  const { allowAudio, audioFiles } = useAudioController()

  const audioEl = ref<HTMLAudioElement | null>(null)
  const channelSrc = computed<string>(() => {
    return audioFiles.value[props.channel.file].file
  })

  const startAutoPlayIfPossible = async () => {
    if (!audioEl.value) {
      return
    }

    // if (playAudio.value) {
    //   try {
    //     await audioEl.value.play()
    //   } catch (exception) {
    //     // Audio couldn't be loaded, change state accordingly
    //     await audioEl.value.pause()
    //     togglePlayAudio(false)
    //   }
    // } else {
    //   await audioEl.value.pause()
    // }
  }

  // TODO
  const playAudio = computed<boolean>(() => true)

  watch([allowAudio, playAudio], ([n1, n2], [o1, o2]) => {
    if (!audioEl.value) {
      return
    }

    // NOTE: "allowAudio" changed from `false` to `true`
    if (n1 && !o1) {
      audioEl.value.play()
      return
    }

    // NOTE: "allowAudio" changed from `true` to `false`
    if (!n1 && o1) {
      audioEl.value.pause()
      return
    }

    // NOTE: "playAudio" changed from `false` to `true` / "allowAudio" stays `true`
    if (n1 && n2 && !o2) {
      audioEl.value.play()
    }

    // NOTE: "playAudio" changed from `true` to `false` / "allowAudio" stays `true`
    if (n1 && !n2 && o2) {
      audioEl.value.pause()
    }
  })

  onMounted(() => {
    if (!audioEl.value) {
      return
    }

    audioEl.value.volume = 0.6

    startAutoPlayIfPossible()
  })
</script>
