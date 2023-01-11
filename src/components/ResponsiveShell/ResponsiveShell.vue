<script lang="ts" setup>
  import { useElementSize } from '@vueuse/core'
  import { computed, ref } from 'vue'
  import type { CSSProperties } from 'vue'

  interface Props {
    outerWidth: number
    outerHeight: number
    innerWidth?: string
    innerHeight?: string
  }

  interface Size extends CSSProperties {
    '--inner-width': string
    '--inner-height': string
  }

  const wrapperEl = ref<HTMLDivElement | null>(null)

  const props = defineProps<Props>()
  const { width, height } = useElementSize(wrapperEl)

  const innerWidth = computed<string>(() => {
    const w = Math.min((height.value * props.outerWidth) / props.outerHeight, width.value)
    return props.innerWidth ?? `${w}px`
  })

  const innerHeight = computed<string>(() => {
    const h = Math.min((width.value / props.outerWidth) * props.outerHeight, height.value)
    return props.innerHeight ?? `${h}px`
  })

  const sizeStyle = computed<Size>(() => {
    return {
      '--outer-width': `${props.outerWidth}px`,
      '--outer-height': `${props.outerHeight}px`,
      '--inner-width': innerWidth.value,
      '--inner-height': innerHeight.value,
    }
  })
</script>

<template>
  <div :style="sizeStyle" class="c-responsive-shell">
    <div ref="wrapperEl" class="c-responsive-shell__outer-wrapper">
      <div class="c-responsive-shell__inner-wrapper">
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .c-responsive-shell {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .c-responsive-shell__outer-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    max-width: var(--outer-width);
    max-height: var(--outer-height);
  }

  .c-responsive-shell__inner-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: var(--inner-width);
    height: var(--inner-height);
  }
</style>
