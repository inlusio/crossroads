<script lang="ts" setup>
  import type { AudioChannelEntry } from '@/models/AudioChannel/AudioChannel'
  import useAudioController from '@/composables/AudioController/AudioController'
  import { computed, defineAsyncComponent, ref, watch } from 'vue'
  import AudioPlayer from '@/components/AudioPlayer/AudioPlayer.vue'
  import type AudioTransitionSeamless from '@/components/AudioTransitionSeamless/AudioTransitionSeamless.vue'

  type AudioTransitionComponentType = typeof AudioTransitionSeamless

  interface Props {
    channel: AudioChannelEntry
  }

  const props = defineProps<Props>()
  const { allowAudio, interactionOccured } = useAudioController()

  const audioPlayerEl = ref<typeof AudioPlayer | null>(null)
  const transitionEl = ref<typeof AudioTransitionSeamless | null>(null)
  const audioTransitionComponent = computed<AudioTransitionComponentType>(() => {
    switch (props.channel.behaviour) {
      default:
        return defineAsyncComponent(() => import('../AudioTransitionSeamless/AudioTransitionSeamless.vue'))
    }
  })
  const repeatCount = ref<number>(0)
  const isScheduled = ref<boolean>(true)
  const isAllowedToRepeat = computed<boolean>(() => repeatCount.value < props.channel.repeat)
  const isAllowedToPlay = computed<boolean>(() => {
    return (
      allowAudio.value &&
      isScheduled.value &&
      !props.channel.stop &&
      isAllowedToRepeat.value &&
      interactionOccured.value !== false
    )
  })
  const identifierKey = computed<string>(() => {
    return `${props.channel.label}::${props.channel.file}::${isAllowedToPlay.value}`
  })

  const scheduleNextPlayback = () => {
    if (props.channel.behaviour === 'seamless') {
      isScheduled.value = true
    }
  }

  const onPlaybackResponse = (flag: boolean) => {
    if (flag) {
      console.log(`[${identifierKey.value}] success:`, props.channel)
      interactionOccured.value = flag
    } else if (interactionOccured.value === undefined) {
      console.log(`[${identifierKey.value}] failed:`, props.channel)
      interactionOccured.value = flag
    }
  }

  const onPlaying = () => {
    interactionOccured.value = true
  }

  const onEnded = () => {
    repeatCount.value += 1
    isScheduled.value = false
  }

  // Schedule next playback
  watch(
    () => isScheduled.value,
    (n) => {
      if (!n) {
        scheduleNextPlayback()
      } else {
        audioPlayerEl.value?.start()
      }
    },
    { immediate: true },
  )
</script>

<template>
  <component
    :is="audioTransitionComponent"
    ref="transitionEl"
    :channel="channel"
    :identifier-key="identifierKey"
    class="c-audio-channel"
    @playback="onPlaybackResponse"
  >
    <AudioPlayer
      v-if="isAllowedToPlay"
      :key="identifierKey"
      ref="audioPlayerEl"
      :channel="channel"
      :data-key="identifierKey"
      :data-repeat="repeatCount"
      @ended="onEnded"
      @playing="onPlaying"
    />
  </component>
</template>

<style lang="scss" scoped></style>
