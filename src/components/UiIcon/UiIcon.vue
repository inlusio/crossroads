<script lang="ts" setup>
  import { computed, defineAsyncComponent } from 'vue'

  import type { UseBemProps } from '@/composables/Bem/BemFacetOptions'
  import useBem from '@/composables/Bem/Bem'
  import type { UiIconEntry, UiIconId, UiIconSizeId } from '@/models/UiIcon/UiIcon'
  import useUiIcon from '@/composables/UiIcon/UiIcon'

  // NOTE: Props extension currently not supported
  // https://vuejs.org/guide/typescript/composition-api.html#typing-component-props
  interface Props extends UseBemProps {
    facets?: Array<string>
    id: UiIconId
    size?: UiIconSizeId
    colorize?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    facets: () => [],
    size: undefined,
    colorize: false,
  })
  const { getEntry } = useUiIcon()
  const { bemAdd, bemFacets } = useBem<Props>('c-ui-icon', props, {})

  const rootClasses = computed<Array<string>>(() => {
    return [...bemFacets.value, bemAdd(props.size ?? ''), bemAdd(props.colorize ? 'colorize' : '')]
  })

  const entry = computed<UiIconEntry | undefined>(() => {
    return getEntry(props.id)
  })

  const icon = computed(() => {
    return defineAsyncComponent(() => import(`../../assets/svg/${entry.value?.icon}.svg`))
  })
</script>

<template>
  <span class="c-ui-icon" v-if="entry" :class="rootClasses">
    <component :is="icon" class="c-ui-icon--svg" />
  </span>
</template>

<style lang="scss" src="./_UiIcon.scss" />
