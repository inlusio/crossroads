<script lang="ts" setup>
  import type { UseBemProps } from '@/composables/Bem/BemFacetOptions'
  import useBem from '@/composables/Bem/Bem'
  import ResponsiveShell from '@/components/ResponsiveShell/ResponsiveShell.vue'
  import ResponsiveImg from '@/components/ResponsiveImg/ResponsiveImg.vue'

  interface Props extends UseBemProps {
    facets?: Array<string>
    background?: string
    width: number
    height: number
  }

  // TODO: https://youtrack.jetbrains.com/issue/WEB-54555/Props-Destructure-syntax-in-Vue-script-setup
  const props = defineProps<Props>()
  const { bemFacets } = useBem('c-view-shell', props, {})
</script>

<template>
  <div :class="bemFacets" class="c-view-shell">
    <div v-if="background" class="c-view-shell__background-wrap">
      <ResponsiveShell :outer-width="width" :outer-height="height" class="c-view-shell__background-shell">
        <div class="c-view-shell__background-element" />
      </ResponsiveShell>
      <ResponsiveImg :src="background" :width="width" alt="" class="c-view-shell__blur" />
      <ResponsiveImg :src="background" :width="width" alt="" class="c-view-shell__image" />
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

    background-color: col.$monochrome-white;
  }

  .c-view-shell__background-shell {
    @include utils.overlay;
  }

  .c-view-shell__background-element {
    @include utils.overlay;
  }

  .c-view-shell__blur {
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

  .c-view-shell__image {
    z-index: 2;
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
  }

  .c-view-shell__content {
    z-index: 2;
    position: relative;
    width: 100%;
    height: 100%;
    padding-right: var(--scroll-lock);
  }

  .c-view-shell__debug {
    z-index: 1000;
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    color: col.$monochrome-white;
    background-color: col.$monochrome-black;
  }

  .c-view-shell--city,
  .c-view-shell--district,
  .c-view-shell--cinema-section {
    $image-w: 1200px;
    $image-h: 900px;
    $image-ratio: math.div($image-h, $image-w);

    .c-view-shell__image {
      max-width: $image-w;
      max-height: $image-h;
    }
  }

  .c-view-shell--location,
  .c-view-shell--cinema-room {
    $image-w: 1600px;
    $image-h: 900px;
    $image-ratio: math.div($image-h, $image-w);

    .c-view-shell__image {
      max-width: $image-w;
      max-height: $image-h;
    }
  }

  .c-view-shell--city,
  .c-view-shell--district {
    .c-view-shell__background-shell {
      background: radial-gradient(ellipse at center, white 0, col.$monochrome-white 40%, #baffff 100%);
    }
  }

  .c-view-shell--city,
  .c-view-shell--district {
    .c-view-shell__blur {
      display: none;
    }
  }

  .c-view-shell--location,
  .c-view-shell--cinema-room,
  .c-view-shell--cinema-section {
    .c-view-shell__background-wrap {
      //background-color: col.$monochrome-black;
    }
  }
</style>
