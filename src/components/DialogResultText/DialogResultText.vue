<script lang="ts" setup>
  import type {
    DialogResultMarkup,
    DialogResultMetadata,
    DialogResultTextData,
  } from '@/models/DialogResult/DialogResult'
  import { computed } from 'vue'
  import useDialogResult from '@/composables/DialogResult/DialogResult'
  import type { UseBemProps } from '@/composables/Bem/BemFacetOptions'
  import useBem from '@/composables/Bem/Bem'

  interface Props extends DialogResultTextData, UseBemProps {
    facets?: Array<string>
    text: string
    metadata: DialogResultMetadata
    hashtags: Array<string>
    markup: Array<DialogResultMarkup>
  }

  const props = defineProps<Props>()
  const { bemAdd, bemFacets } = useBem('c-dialog-result-text', props, {})
  const { getCharacter, getResultFacets } = useDialogResult()

  const character = computed<string | undefined>(() => {
    return getCharacter(props.markup)
  })

  const rootClasses = computed<Array<string>>(() => {
    return [...bemFacets.value, ...getResultFacets(props).map((facet) => bemAdd(facet))]
  })
</script>

<template>
  <div :class="rootClasses" class="c-dialog-result-text">
    <b v-if="character" class="c-dialog-result-text__character"> {{ character }}: </b>
    <span class="c-dialog-result-text__text">
      {{ props.text }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
  @use '@/assets/scss/util/color/color' as col;

  .c-dialog-result-text__character {
    margin-right: 2px;
  }

  .c-dialog-result-text--thoughts {
    .c-dialog-result-text__text {
      font-style: italic;
    }
  }

  .c-dialog-result-text--hint {
    .c-dialog-result-text__text {
      font-style: italic;
      color: col.$brand-green;
    }
  }

  .c-dialog-result-text--detective {
    .c-dialog-result-text__character {
      color: col.$brand-blue;
    }
  }

  .c-dialog-result-text--manager {
    .c-dialog-result-text__character {
      color: col.$brand-red;
    }
  }

  .c-dialog-result-text--male-researcher {
    .c-dialog-result-text__character {
      color: col.$brand-green;
    }
  }

  .c-dialog-result-text--female-researcher {
    .c-dialog-result-text__character {
      color: col.$brand-green-light;
    }
  }
</style>
