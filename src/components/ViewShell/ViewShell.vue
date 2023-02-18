<script lang="ts" setup>
  import type { UseBemProps } from '@/composables/Bem/BemFacetOptions'
  import useBem from '@/composables/Bem/Bem'
  import ResponsiveShell from '@/components/ResponsiveShell/ResponsiveShell.vue'
  import ResponsiveImg from '@/components/ResponsiveImg/ResponsiveImg.vue'
  import { computed, ref } from 'vue'

  interface Props extends UseBemProps {
    facets?: Array<string>
    background?: string
    width: number
    height: number
  }

  const props = withDefaults(defineProps<Props>(), {
    facets: () => [],
    background: '',
  })
  const { bemAdd, bemFacets } = useBem('c-view-shell', props, {})

  const isBackgroundLoaded = ref<boolean>(false)

  const blurImageClasses = computed<Array<string>>(() => {
    return [bemAdd(isBackgroundLoaded.value ? 'is-shown' : '', 'blur-image')]
  })

  const mainImageClasses = computed<Array<string>>(() => {
    return [bemAdd(isBackgroundLoaded.value ? 'is-shown' : '', 'main-image')]
  })

  const onLoad = () => {
    isBackgroundLoaded.value = true
  }
</script>

<template>
  <div :class="bemFacets" class="c-view-shell">
    <div v-if="background" class="c-view-shell__background-wrap">
      <ResponsiveShell :outer-width="width" :outer-height="height" class="c-view-shell__background-shell">
        <div class="c-view-shell__background-element" />
      </ResponsiveShell>
      <ResponsiveImg
        @load="onLoad"
        :resolutions="[1]"
        :class="blurImageClasses"
        :src="background"
        :width="width"
        alt=""
        class="c-view-shell__blur-image"
      />
      <ResponsiveImg
        @load="onLoad"
        :resolutions="[1]"
        :class="mainImageClasses"
        :src="background"
        :width="width"
        alt=""
        class="c-view-shell__main-image"
      />
    </div>
    <div class="c-view-shell__content">
      <slot :height="height" :width="width" name="content" />
    </div>
    <div class="c-view-shell__debug">
      <slot name="debug" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @use 'sass:color';
  @use 'sass:math';
  @use '@nirazul/scss-utils' as utils;
  @use '@/assets/scss/util/color/color' as col;
  @use '@/assets/scss/util/transition' as trs;

  $blur: 40px;

  .c-view-shell {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .c-view-shell__background-wrap {
    pointer-events: none;
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    padding-right: var(--scroll-lock);
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .c-view-shell__background-shell {
    @include utils.overlay;
  }

  .c-view-shell__background-element {
    @include utils.overlay;
  }

  .c-view-shell__blur-image {
    z-index: 1;
    position: absolute;
    top: 50%;
    left: 50%;
    width: calc(100% + #{$blur * 2});
    height: calc(100% + #{$blur * 2});
    filter: blur($blur);
    transform: translate(-50%, -50%);
    max-width: unset;
    max-height: unset;
  }

  .c-view-shell__blur-image {
    opacity: 0;
    transition: 200ms trs.$default-fn opacity;

    &.c-view-shell__blur-image--is-shown {
      opacity: 1;
    }
  }

  .c-view-shell__main-image {
    z-index: 2;
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
    opacity: 0;
    transition: 1600ms trs.$default-fn opacity;

    &.c-view-shell__main-image--is-shown {
      opacity: 1;
    }
  }

  .c-view-shell__content {
    z-index: 2;
    position: relative;
    width: 100%;
    height: 100%;
    padding-right: var(--scroll-lock);
  }

  .c-view-shell--scene {
    $image-w: 1600px;
    $image-h: 900px;
    $image-ratio: math.div($image-h, $image-w);

    .c-view-shell__main-image {
      max-width: $image-w;
      max-height: $image-h;
    }
  }
</style>
