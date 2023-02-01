<script lang="ts" setup>
  import { computed, useAttrs } from 'vue'

  type LoadingStrategy = 'auto' | 'eager' | 'lazy'

  interface RootAttrs {
    srcset: string
    sizes: string
    src: string
  }

  interface Props {
    src: string
    width: number
    loading?: LoadingStrategy
    resolutions?: Array<number>
  }

  // TODO: https://youtrack.jetbrains.com/issue/WEB-54555/Props-Destructure-syntax-in-Vue-script-setup
  // const { src, width, loading = LoadingStrategy.Auto, resolutions = [1, 2] } = defineProps<Props>()
  /* TODO: replace when ready */
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
    if (import.meta.env.VITE_DISPLAY_DEV_IMAGES) {
      srcset = ''
    } else {
      srcset = props.resolutions.map((m) => `${src}?nf_resize=fit&w=${w * m} ${w * m}w`).join(', ')
    }

    if (import.meta.env.VITE_DISPLAY_DEV_IMAGES) {
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
  <img :alt="alt" :loading="loading" class="c-responsive-img" v-bind="rootAttrs" />
</template>

<style lang="scss" scoped>
  .c-responsive-img {
    overflow: hidden;
  }
</style>
