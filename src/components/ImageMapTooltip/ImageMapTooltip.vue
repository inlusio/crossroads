<script lang="ts" setup>
  import useBem from '@/composables/Bem/Bem'
  import type { UseBemProps } from '@/composables/Bem/BemFacetOptions'
  import type { CSSProperties } from 'vue'
  import { computed, ref } from 'vue'
  import type { DialogHotspot } from '@/models/DialogHotspot/DialogHotspot'
  import useSegment from '@/composables/Segment/Segment'
  import type { Rect } from '@/models/Segment/Segment'

  interface Props extends UseBemProps {
    facets?: Array<string>
    width: number
    height: number
    hotspot: DialogHotspot
  }

  interface Emits {
    (e: 'action'): void
  }

  const props = defineProps<Props>()
  const emit = defineEmits<Emits>()
  const { bemAdd, bemFacets } = useBem('c-image-map-tooltip', props, {})

  const segmentRect = ref<Rect>({ x: 0, y: 0, width: props.width, height: props.height })
  const { getSegmentFeatures, getSegmentIdxOfPoint } = useSegment(segmentRect, [3, 3])

  const segmentIdx = computed<number>(() => {
    return getSegmentIdxOfPoint({
      x: props.hotspot.x,
      y: props.hotspot.y,
    })
  })
  const areaLabelStyles = computed<CSSProperties>(() => {
    const x = (props.hotspot.x / props.width) * 100
    const y = (props.hotspot.y / props.height) * 100

    return {
      top: `${y}%`,
      left: `${x}%`,
    }
  })

  const rootClasses = computed<Array<string>>(() => {
    return [...bemFacets.value]
  })

  const labelClasses = computed<Array<string>>(() => {
    if (segmentIdx.value == null) {
      return []
    }

    return Object.entries(getSegmentFeatures(segmentIdx.value)).map(([key, value]) => {
      return bemAdd(`${key}-${value}`, 'label')
    })
  })

  const onActionRequested = () => {
    emit('action')
  }
</script>

<template>
  <span :class="rootClasses" :style="areaLabelStyles" class="c-image-map-tooltip">
    <button class="c-image-map-tooltip__btn" @click="onActionRequested">
      <span class="c-image-map-tooltip__circle-inner" />
    </button>
    <span :class="labelClasses" class="s-tooltip-label c-image-map-tooltip__label">
      <slot :label="hotspot.label" />
    </span>
  </span>
</template>

<style lang="scss" scoped>
  @use 'sass:color';
  @use 'sass:math';
  @use '@nirazul/scss-utils' as utils;
  @use '@/assets/scss/util/color/color' as col;
  @use '@/assets/scss/util/transition' as trs;
  @use '@/assets/scss/base/font/font' as font;
  @use '@/assets/scss/base/typography/typography' as type;

  $sz--circle: 40px;
  $sz--circle-outer: 80px;
  $sz--circle-inner: 28px;
  $sz--label-offset: math.div($sz--circle, 2) + 12px;

  @keyframes pulse-ring {
    0% {
      transform: translate(-50%, -50%) scale(0.35);
    }
    80%,
    100% {
      opacity: 0;
    }
  }

  @keyframes pulse-dot {
    0% {
      transform: translate(-50%, -50%) scale(0.8);
    }
    50% {
      transform: translate(-50%, -50%) scale(1);
    }
    100% {
      transform: translate(-50%, -50%) scale(0.8);
    }
  }

  .c-image-map-tooltip {
    --value: calc(var(--scroll-bar) * -0.5);
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    transform: translateX(var(--value));
  }

  .c-image-map-tooltip__btn {
    @include trs.common-props;
    pointer-events: auto;
    cursor: pointer;
    z-index: 2;
    position: relative;
    display: block;
    width: $sz--circle;
    height: $sz--circle;
    background-color: col.$monochrome-black;
    border-radius: $sz--circle;
    padding: 2px;
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);

    @include utils.has-focus {
      &::after {
        background-color: col.$brand-red;
      }
    }

    &::before,
    &::after {
      @include trs.common-props;
      pointer-events: none;
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      display: block;
      transform: translate(-50%, -50%);
    }

    &::before {
      z-index: 1;
      width: $sz--circle-outer;
      height: $sz--circle-outer;
      border-radius: $sz--circle-outer;
      background-color: rgba(col.$brand-red-dark, 0.6);
      animation: pulse-ring 4000ms cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
    }

    &::after {
      z-index: 3;
      width: $sz--circle-inner;
      height: $sz--circle-inner;
      border-radius: $sz--circle-inner;
      background-color: color.change(col.$brand-red, $alpha: 0.6);
      transform: translate(-50%, -50%) scale(1);

      //transform: translate(-50%, -50%) scale(0);
      //animation: pulse-dot 4000ms cubic-bezier(0.455, 0.03, 0.515, 0.955) -400ms infinite;
    }
  }

  .c-image-map-tooltip__circle-inner {
    @include trs.common-props;
    pointer-events: none;
    z-index: 2;
    position: relative;
    top: 50%;
    left: 50%;
    display: block;
    width: 100%;
    height: 100%;
    transform: translate(-50%, -50%);
    background-color: col.$monochrome-white;
    border-radius: $sz--circle;
  }

  .c-image-map-tooltip__label {
    pointer-events: none;
    position: absolute;

    // Rows
    &.c-image-map-tooltip__label--row-0 {
      top: 0;
    }

    &.c-image-map-tooltip__label--row-1 {
      top: 0;
      transform: translateY(-50%);
    }

    &.c-image-map-tooltip__label--row-2 {
      bottom: 0;
    }

    // Columns
    &.c-image-map-tooltip__label--col-0 {
      left: $sz--label-offset;
    }

    &.c-image-map-tooltip__label--col-1 {
      top: $sz--label-offset;
      bottom: unset;
      transform: translateX(-50%);
    }

    &.c-image-map-tooltip__label--col-2 {
      right: $sz--label-offset;
    }

    // Segments
    &.c-image-map-tooltip__label--seg-5 {
      top: unset;
      bottom: $sz--label-offset;
    }
  }
</style>
