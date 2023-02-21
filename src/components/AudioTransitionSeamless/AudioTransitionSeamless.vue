<script lang="ts" setup>
  import type { UseAudioTransitionEmits } from '@/composables/AudioTransition/AudioTransition'
  import useAudioTransition from '@/composables/AudioTransition/AudioTransition'
  import type { AudioChannelEntry } from '@/models/AudioChannel/AudioChannel'

  interface Emits extends UseAudioTransitionEmits {
    (e: 'playback', flag: boolean): void
  }

  interface Props {
    channel: AudioChannelEntry
    identifierKey: string
  }

  const emit = defineEmits<Emits>()
  const props = defineProps<Props>()
  const { start, stop } = useAudioTransition(emit)

  // called before the element is inserted into the DOM.
  // use this to set the "enter-from" state of the element
  const onBeforeEnter = (_: Element) => {}

  // called one frame after the element is inserted.
  // use this to start the entering animation.
  const onEnter = (el: Element, done: () => void) => {
    ;(el as HTMLAudioElement).volume = props.channel.volume
    // call the done callback to indicate transition end
    // optional if used in combination with CSS
    start(el as HTMLAudioElement)
    done()
  }

  // called when the enter transition has finished.
  const onAfterEnter = (_: Element) => {}

  const onEnterCancelled = (_: Element) => {}

  // called before the leave hook.
  // Most of the time, you should just use the leave hook
  const onBeforeLeave = (_: Element) => {}

  // called when the leave transition starts.
  // use this to start the leaving animation.
  const onLeave = (el: Element, done: () => void) => {
    // call the done callback to indicate transition end
    // optional if used in combination with CSS
    stop(el as HTMLAudioElement)
    done()
  }

  // called when the leave transition has finished and the
  // element has been removed from the DOM.
  const onAfterLeave = (_: Element) => {}

  // only available with v-show transitions
  const onLeaveCancelled = (_: Element) => {}
</script>

<template>
  <TransitionGroup
    :css="false"
    appear
    tag="div"
    @enter="onEnter"
    @leave="onLeave"
    @before-enter="onBeforeEnter"
    @after-enter="onAfterEnter"
    @enter-cancelled="onEnterCancelled"
    @before-leave="onBeforeLeave"
    @after-leave="onAfterLeave"
    @leave-cancelled="onLeaveCancelled"
  >
    <slot />
  </TransitionGroup>
</template>

<style lang="scss" scoped></style>
