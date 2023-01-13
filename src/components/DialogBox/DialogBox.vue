<script lang="ts" setup>
  // @ts-ignore
  import YarnBound from 'yarn-bound/src'
  import { cloneDeep } from 'lodash-es'
  import { computed, nextTick, ref, watch } from 'vue'
  import { DialogResultType } from '@/models/DialogResult/DialogResult'
  import useDialogResult from '@/composables/DialogResult/DialogResult'

  export interface Props {
    facets?: Array<string>
    runner: YarnBound
  }

  const props = defineProps<Props>()
  const { getResultType, getResultComponent } = useDialogResult()

  const scrollEl = ref<HTMLDivElement | null>(null)
  const resultHistory = ref<Array<YarnBound.Result>>([])
  const currentResult = computed(() => props.runner.currentResult)
  const currentResultType = computed<DialogResultType>(() => {
    return getResultType(currentResult.value)
  })
  const currentResultComponent = computed<string>(() => {
    return getResultComponent(currentResult.value)
  })
  const isAdvanceDisabled = computed<boolean>(() => {
    return [DialogResultType.Options, DialogResultType.End].includes(currentResultType.value)
  })

  const advance = () => {
    resultHistory.value.push(cloneDeep(currentResult.value))
    props.runner.advance()

    nextTick(scrollToBottom)
  }

  const onOptionChosen = (optionIdx: number) => {
    props.runner.advance(optionIdx)
  }

  const scrollToBottom = () => {
    scrollEl.value?.scroll({ top: scrollEl.value?.scrollHeight, behavior: 'smooth' })
  }

  watch(
    currentResult,
    () => {
      console.log(currentResult.value)
    },
    { immediate: true },
  )
</script>

<template>
  <div class="c-dialog-box">
    <div class="s-container--dialog">
      <div class="c-dialog-box__container s-container__container">
        <div class="c-dialog-box__wrap">
          <div ref="scrollEl" class="c-dialog-box__scroller">
            <ul class="c-dialog-box__history-entries u-reset">
              <li v-for="result in resultHistory" class="c-dialog-box__history-entry">
                <component :is="getResultComponent(result)" v-bind="result" />
              </li>
              <li class="c-dialog-box__current-entry">
                <component :is="currentResultComponent" v-bind="currentResult" @choose="onOptionChosen($event)" />
              </li>
            </ul>
          </div>
          <div class="c-dialog-box__actions">
            <button :disabled="isAdvanceDisabled" class="c-dialog-box__advance btn btn--primary btn--small" @click="advance">weiter</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @use 'sass:color';
  @use '@/assets/scss/util/color/color' as col;

  .c-dialog-box {
    display: flex;
    height: 100%;
  }

  .c-dialog-box__container {
    height: 100%;
  }

  .c-dialog-box__wrap {
    overflow: hidden;
    position: relative;
    display: flex;
    flex-flow: row nowrap;
    height: 100%;
    gap: 16px;
    padding: 20px 24px;
    margin-top: -24px;
    border-radius: 4px;
    border: 2px solid col.$monochrome-lead;
    box-shadow: 0 0 12px 2px col.$monochrome-lead;
    background-color: col.$monochrome-black;
  }

  .c-dialog-box__scroller {
    overflow: hidden;
    position: relative;
    flex: 0 1 100%;
    color: col.$monochrome-white;
    //background-color: col.$monochrome-white;
    //border: 2px solid color.change(col.$monochrome-tornado, $alpha: 0.04);
  }

  .c-dialog-box__history-entries {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }

  .c-dialog-box__actions {
    display: flex;
    flex-flow: row nowrap;
    justify-content: stretch;
    align-items: flex-end;
    flex: 0 0 auto;
    touch-action: manipulation;
    user-select: none;
  }

  .c-dialog-box__advance[disabled] {
    pointer-events: none;
    user-select: none;
    -webkit-user-select: none;
  }
</style>
