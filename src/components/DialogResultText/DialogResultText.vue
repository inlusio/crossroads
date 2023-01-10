<script lang="ts" setup>
  import type { DialogResultMarkup, DialogResultMetadata, DialogResultTextData } from '@/models/Dialog/Dialog'
  import { computed } from 'vue'
  import useDialog from '@/composables/Dialog/Dialog'

  interface Props extends DialogResultTextData {
    text: string
    metadata: DialogResultMetadata
    hashtags: Array<string>
    markup: Array<DialogResultMarkup>
  }

  const props = defineProps<Props>()
  const {getCharacter} = useDialog()

  const character = computed<string | undefined>(() => {
    return getCharacter(props.markup)
  })
</script>

<template>
  <div class="c-dialog-result-text">
    <b class="c-dialog-result-text__character" v-if="character">
      {{ character }}:
    </b>
    <span class="c-dialog-result-text__text">
      {{ props.text }}
    </span>
  </div>
</template>

<style scoped lang="scss">

</style>
