<script lang="ts" setup>
  import type {
    DialogResultContentData,
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
  const { getCharacter, getResultFacets } = useDialogResult()

  const availableOptions = computed<Array<DialogResultOptionEntryData>>(() => {
    return props.options.filter(({ isAvailable }) => isAvailable)
  })

  const rootClasses = computed<Array<string>>(() => {
    const optionsFacet = DialogResultOptionListFacet[props.metadata.options ?? 'Choice']

    return [...bemFacets.value, bemAdd(optionsFacet)]
  })

  const getOptionEntryClasses = (option: DialogResultContentData) => {
    return [...getResultFacets(option).map((facet) => bemAdd(facet, 'entry'))]
  }

  const chooseOption = (targetOption: DialogResultOptionEntryData) => {
    const optionIdx = props.options.findIndex((option) => option === targetOption)
    emit('choose', optionIdx)
  }
</script>

<template>
  <div :class="rootClasses" class="c-dialog-result-option-list">
    <ul class="c-dialog-result-option-list__list u-reset">
      <li
        v-for="(option, optionIdx) in availableOptions"
        :key="optionIdx"
        :class="getOptionEntryClasses(option)"
        class="c-dialog-result-option-list__entry"
      >
        <b v-if="getCharacter(option.markup)" class="c-dialog-result-option-list__character">
          {{ getCharacter(option.markup) }}:
        </b>
        <button class="c-dialog-result-option-list__btn" @click="chooseOption(option)">
          <span class="c-dialog-result-option-list__text">
            {{ option.text }}
          </span>
        </button>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
  @use '@nirazul/scss-utils' as utils;
  @use '@/assets/scss/util/color/color' as col;
  @use '@/assets/scss/base/typography/typography' as type;

  .c-dialog-result-option-list__btn {
    @include type.link;
    text-align: left;
    cursor: pointer;
  }

  .c-dialog-result-option-list__character {
    margin-right: 2px;
  }

  .c-dialog-result-option-list__entry,
  .c-dialog-result-option-list__entry--choice {
    .c-dialog-result-option-list__btn {
      color: col.$brand-yellow;

      @include utils.has-focus {
        color: col.$monochrome-lead;
        background-color: col.$brand-yellow-light;
      }
    }
  }

  .c-dialog-result-option-list__entry--thoughts {
    .c-dialog-result-option-list__text {
      font-style: italic;
    }
  }

  .c-dialog-result-option-list__entry--hint {
    .c-dialog-result-option-list__btn {
      color: col.$brand-green;

      @include utils.has-focus {
        color: col.$monochrome-lead;
        background-color: col.$brand-green-light;
      }
    }
  }

  .c-dialog-result-option-list__entry--detective {
    .c-dialog-result-option-list__character {
      color: col.$brand-blue;
    }
  }

  .c-dialog-result-option-list__entry--manager {
    .c-dialog-result-option-list__character {
      color: col.$brand-red;
    }
  }

  .c-dialog-result-option-list__entry--male-researcher {
    .c-dialog-result-option-list__character {
      color: col.$brand-green;
    }
  }

  .c-dialog-result-option-list__entry--female-researcher {
    .c-dialog-result-option-list__character {
      color: col.$brand-green-light;
    }
  }
</style>
