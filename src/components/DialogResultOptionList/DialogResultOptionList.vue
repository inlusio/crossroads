<script lang="ts" setup>
  import type {
    DialogResultMetadata,
    DialogResultOptionEntryData,
    DialogResultOptionListData,
  } from '@/models/DialogResult/DialogResult'
  import useDialogResult from '@/composables/DialogResult/DialogResult'
  import { computed } from 'vue'
  import useBem from '@/composables/Bem/Bem'
  import type { UseBemProps } from '@/composables/Bem/BemFacetOptions'
  import { DialogResultOptionListFacet } from '@/models/DialogResultOptionListFacet/DialogResultOptionListFacet'

  interface Props extends DialogResultOptionListData, UseBemProps {
    facets?: Array<string>
    options: Array<DialogResultOptionEntryData>
    metadata: DialogResultMetadata
  }

  interface Emits {
    (e: 'choose', optionIdx: number): void
  }

  const props = defineProps<Props>()
  const emit = defineEmits<Emits>()
  const { bemAdd, bemFacets } = useBem('c-dialog-result-option-list', props, {})
  const { getCharacter } = useDialogResult()

  const availableOptions = computed<Array<DialogResultOptionEntryData>>(() => {
    return props.options.filter(({ isAvailable }) => isAvailable)
  })

  const rootClasses = computed<Array<string>>(() => {
    const optionsFacet = DialogResultOptionListFacet[props.metadata.options ?? 'Choice']

    return [
      ...bemFacets.value,
      bemAdd(optionsFacet),
    ]
  })

  const chooseOption = (targetOption: DialogResultOptionEntryData) => {
    const optionIdx = props.options.findIndex((option) => option === targetOption)
    emit('choose', optionIdx)
  }
</script>

<template>
  <div :class="rootClasses" class="c-dialog-result-option-list">
    <ul class="c-dialog-result-option-list__list u-reset">
      <li v-for="option in availableOptions" class="c-dialog-result-option-list__entry">
        <button class="c-dialog-result-option-list__btn" @click="chooseOption(option)">
          <b v-if="getCharacter(option.markup)" class="c-dialog-result-option-list__character">
            {{ getCharacter(option.markup) }}:
          </b>
          <span class="c-dialog-result-option-list__text">
            {{ option.text }}
          </span>
        </button>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
  @use '@/assets/scss/util/color/color' as col;
  @use '@/assets/scss/base/typography/typography' as type;

  .c-dialog-result-option-list__btn {
    @include type.link;
    text-align: left;
    cursor: pointer;
  }

  .c-dialog-result-option-list--choice {
    .c-dialog-result-option-list__btn {
      color: col.$brand-yellow;
    }
  }

  .c-dialog-result-option-list--hint {
    .c-dialog-result-option-list__btn {
      color: col.$brand-green;
    }
  }
</style>
