<script lang="ts" setup>
  import type {
    DialogResultMetadata,
    DialogResultOptionEntryData,
    DialogResultOptionListData,
  } from '@/models/DialogResult/DialogResult'
  import useDialogResult from '@/composables/DialogResult/DialogResult'
  import { computed } from 'vue'

  interface Props extends DialogResultOptionListData {
    options: Array<DialogResultOptionEntryData>
    metadata: DialogResultMetadata
  }

  interface Emits {
    (e: 'choose', optionIdx: number): void
  }

  const props = defineProps<Props>()
  const emit = defineEmits<Emits>()
  const { getCharacter } = useDialogResult()

  const availableOptions = computed<Array<DialogResultOptionEntryData>>(() => {
    return props.options.filter(({ isAvailable }) => isAvailable)
  })

  const chooseOption = (targetOption: DialogResultOptionEntryData) => {
    const optionIdx = props.options.findIndex((option) => option === targetOption)
    emit('choose', optionIdx)
  }
</script>

<template>
  <div class="c-dialog-result-option-list">
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
    color: col.$brand-yellow;
    text-align: left;
    cursor: pointer;
  }
</style>
