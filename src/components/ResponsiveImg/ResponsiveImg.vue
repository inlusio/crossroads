<script lang="ts" setup>
  import { computed, useAttrs } from 'vue'

  type LoadingStrategy = 'auto' | 'eager' | 'lazy'

  interface RootAttrs {
    srcset: string
    sizes: string
    src: string
  }

  interface Emits {
    (e: 'load', value: boolean): void
  }

  interface Props {
    src: string
    width: number
    loading?: LoadingStrategy
    resolutions?: Array<number>
  }

  const emit = defineEmits<Emits>()
  const props = withDefaults(defineProps<Props>(), {
    loading: 'auto',
    resolutions: () => [1, 2],
  })
  const attrs = useAttrs()

  const maxResolution = computed(() => Math.max(...props.resolutions))
  const rootAttrs = computed(() => getResponsiveImage(props.src, props.width))
  const alt = computed<string | undefined>(() => {
    return (attrs.alt as string) || ''
  })

  const getResponsiveImage = (path: string, w: number): RootAttrs => {
    let srcset: string
    let sizes: string
    const src = `/${path.replace(/(^\/)|(\/$)/g, '')}`
    if (import.meta.env.VITE_DISPLAY_DEV_IMAGES === 'True') {
      srcset = ''
    } else {
      srcset = props.resolutions.map((m) => `${src}?nf_resize=fit&w=${w * m} ${w * m}w`).join(', ')
    }

    if (import.meta.env.VITE_DISPLAY_DEV_IMAGES === 'True') {
      const dppx = import.meta.env.SRR ? 1 : window.devicePixelRatio
      sizes = `${(w / maxResolution.value) * Math.min(maxResolution.value, dppx)}px`
    } else {
      sizes = ''
    }

    return {
      srcset,
      sizes,
      src,
    }
  }
</script>

<template>
  <img @load="emit('load', true)" :alt="alt" :loading="loading" class="c-responsive-img" v-bind="rootAttrs" />
</template>

<style lang="scss" scoped>
  .c-responsive-img {
    overflow: hidden;
  }
</style>
