<script lang="ts" setup>
  import useBem from '@/composables/Bem/Bem'
  import type { UseBemProps } from '@/composables/Bem/BemFacetOptions'
  import { computed } from 'vue'

  interface Props extends UseBemProps {
    facets?: Array<string>
    isActive?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    facets: () => [],
    isActive: true,
  })

  const { bemAdd, bemFacets } = useBem('c-dot-loader', props, {})

  const rootClasses = computed<Array<string>>(() => {
    return [...bemFacets.value, bemAdd(props.isActive ? 'is-active' : '')]
  })
</script>

<template>
  <div class="c-dot-loader" :class="rootClasses">
    <div class="c-dot-loader__dot" v-for="dot in 3" :key="dot" />
  </div>
</template>

<style lang="scss" scoped>
  @use '@nirazul/scss-utils' as utils;
  @use '@/assets/scss/util/transition' as trs;
  @use '@/assets/scss/util/color/color' as col;

  ////
  /// Taken from:
  /// https://gist.github.com/jankorbel/2336513/cb2f68b59521438ac812ad72c1c93d8f656e49ad
  ////

  $num--dots: 3;
  $sz--dot: 8px;
  $trs--dot-loader-fn: linear;
  $trs--dot-loader-speed: 1200ms;
  $trs--dot-loader-delay: 200ms;
  $trs--dot-loader: $trs--dot-loader-speed $trs--dot-loader-fn;

  @keyframes ani-dot-loader {
    0% {
      opacity: 0;
    }

    50% {
      opacity: 1;
    }

    100% {
      opacity: 0;
    }
  }

  .c-dot-loader {
    @include utils.is-visible(false, trs.$default-speed);
    z-index: 10;

    position: absolute;
    top: 0;
    left: 0;

    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .c-dot-loader__loader {
    display: flex;
    justify-content: space-between;
    width: 36px;
    height: $sz--dot;
  }

  .c-dot-loader__dot {
    opacity: 0;
    border-radius: 50%;
    display: block;
    width: $sz--dot;
    height: $sz--dot;

    animation: ani-dot-loader $trs--dot-loader infinite;

    ~ .c-dot-loader__dot {
      margin-left: 8px;
    }

    @for $i from 1 through $num--dots {
      &.c-dot-loader__dot:nth-child(#{$i}) {
        animation-delay: ($i - 1) * $trs--dot-loader-delay;
      }
    }
  }

  .c-dot-loader.c-dot-loader--base {
    background-color: rgba(col.$monochrome-white, 0.125);

    .c-dot-loader__dot {
      background-color: rgba(col.$monochrome-white, 0.25);
    }
  }

  .c-dot-loader.c-dot-loader--dark {
    background-color: rgba(col.$monochrome-white, 0.125);

    .c-dot-loader__dot {
      background-color: rgba(col.$monochrome-black, 0.5);
    }
  }

  .c-dot-loader.c-dot-loader--is-active {
    @include utils.is-visible(true, trs.$default-speed);
  }
</style>
