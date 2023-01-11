<script lang="ts" setup>
  import type { DialogResultMarkup, DialogResultMetadata, DialogResultTextData } from '@/models/DialogResult/DialogResult'
  import { computed } from 'vue'
  import useDialogResult from '@/composables/DialogResult/DialogResult'

  interface Props extends DialogResultTextData {
    text: string
    metadata: DialogResultMetadata
    hashtags: Array<string>
    markup: Array<DialogResultMarkup>
  }

  const props = defineProps<Props>()
  const { getCharacter } = useDialogResult()

  const character = computed<string | undefined>(() => {
    return getCharacter(props.markup)
  })
</script>

<template>
  <div class="c-dialog-result-text">
    <b v-if="character" class="c-dialog-result-text__character"> {{ character }}: </b>
    <span class="c-dialog-result-text__text">
      {{ props.text }}
    </span>
  </div>
</template>

<style lang="scss" scoped></style>
