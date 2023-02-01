<script lang="ts" setup>
  import { computed, nextTick, onMounted, ref, watch } from 'vue'
  import useBem from '@/composables/Bem/Bem'
  import type { UseBemProps } from '@/composables/Bem/BemFacetOptions'
  import useIsMounted from '@/composables/IsMounted/IsMounted'

  interface Emits {
    (e: 'change', value: boolean): void
    (e: 'changed', value: boolean): void
    (e: 'request-change', value: boolean): void
  }

  interface Props extends UseBemProps {
    facets?: Array<string>
    open?: boolean
    passive?: boolean
    targetHeight?: number
  }

  const TRANSITION_END_KEY_PROP = 'max-height'
  const emit = defineEmits<Emits>()
  const props = withDefaults(defineProps<Props>(), {
    open: false,
    passive: false,
    targetHeight: 0,
  })
  const { bemAdd, bemFacets } = useBem('c-ui-accordion', props, {})
  const { isMounted } = useIsMounted()

  const body = ref<HTMLDivElement | null>(null)
  const isAnimating = ref(false)
  const isOpen = ref(props.open)

  const rootClasses = computed(() => {
    return [
      bemFacets.value,
      bemAdd(isAnimating.value ? 'is-animating' : ''),
      bemAdd(isMounted.value && isOpen.value ? 'is-open' : ''),
    ]
  })

  const isVisible = computed(() => {
    const wasOpened = isOpen.value && !isAnimating.value
    const isClosing = !isOpen.value && isAnimating.value

    return isClosing || wasOpened
  })

  const startAnimation = () => {
    if (!body.value) {
      return
    }

    body.value.style.maxHeight = `${body.value.scrollHeight}px`

    // NOTE: Make the accordion animations smooth on any browser
    if (!isOpen.value) {
      // eslint-disable-next-line no-unused-expressions
      body.value.offsetHeight // Force reflow
      body.value.style.maxHeight = `${props.targetHeight}px`
    }

    emit('change', isOpen.value)
  }

  const finishAnimation = () => {
    isAnimating.value = false

    if (isOpen.value && body.value) {
      body.value.style.maxHeight = 'inherit'
    }
  }

  const change = async (val: boolean) => {
    isOpen.value = val
    isAnimating.value = true

    await nextTick()
    startAnimation()
  }

  const onRequestChange = (val: boolean) => {
    emit('request-change', val)

    if (!props.passive) {
      change(val)
    }
  }

  const onTransitionEnd = (event: TransitionEvent) => {
    if (!body.value) {
      return
    }

    const isTargetElement = event.target === (body.value as EventTarget)
    const isTargetProperty = event.propertyName === TRANSITION_END_KEY_PROP

    if (!isTargetElement || !isTargetProperty) {
      return
    }

    finishAnimation()
    emit('changed', isOpen.value)
  }

  watch(
    () => props.open,
    (value) => {
      if (props.passive) {
        change(value)
      }
    },
  )

  onMounted(() => {
    // NOTE: If it's opened by default we init the component already opened
    finishAnimation()
  })
</script>

<template>
  <div :class="rootClasses" class="c-ui-accordion">
    <div
      v-if="$slots.head"
      :aria-expanded="open ? 'true' : 'false'"
      class="u-reset c-ui-accordion__head"
      role="heading"
      tabindex="0"
      @keypress.enter="onRequestChange(!open)"
      @click.prevent="onRequestChange(!open)"
    >
      <slot :is-open="open" name="head" />
    </div>
    <div ref="body" class="c-ui-accordion__body" role="presentation" @transitionend="onTransitionEnd">
      <slot :is-open="open" :is-visible="isVisible" name="body" />
    </div>
  </div>
</template>

<style lang="scss" src="./_UiAccordion.scss"></style>
