<script lang="ts" setup>
  // @ts-ignore
  import YarnBound from 'yarn-bound/src'
  import { cloneDeep } from 'lodash-es'
  import { computed, ref, watch } from 'vue'
  import { DialogResultType } from '@/models/DialogResult/DialogResult'
  import useDialogResult from '@/composables/DialogResult/DialogResult'
  import UiAccordion from '@/components/UiAccordion/UiAccordion.vue'

  export interface Props {
    facets?: Array<string>
    runner: YarnBound
  }

  interface ResultHistoryEntry {
    timestamp: number
    isOpen: boolean
    result: YarnBound.Result
  }

  const props = defineProps<Props>()
  const { getResultType, getResultComponent } = useDialogResult()

  const scrollEl = ref<HTMLDivElement | null>(null)
  const resultHistory = ref<Array<ResultHistoryEntry>>([])
  const currentResult = computed(() => props.runner.currentResult)
  const currentResultType = computed<DialogResultType>(() => {
    return getResultType(currentResult.value)
  })
  const isAdvanceDisabled = computed<boolean>(() => {
    return [DialogResultType.Options, DialogResultType.End].includes(currentResultType.value)
  })

  const advance = () => {
    props.runner.advance()
    // nextTick(scrollToBottom)
  }

  // const scrollToBottom = () => {
  //   scrollEl.value?.scroll({ top: scrollEl.value?.scrollHeight, behavior: 'smooth' })
  // }

  const onOptionChosen = (optionIdx: number) => {
    props.runner.advance(optionIdx)
  }

  const onAfterEnter = (entry: ResultHistoryEntry) => {
    if (entry) {
      entry.isOpen = true
    }
  }

  watch(
    currentResult,
    () => {
      resultHistory.value
        .filter(({ result }) => getResultType(result) === DialogResultType.Options)
        .forEach((result) => {
          result.isOpen = false
        })

      resultHistory.value.push({
        timestamp: Date.now(),
        isOpen: false,
        result: cloneDeep(currentResult.value),
      })
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
              <li v-for="entry in resultHistory" class="c-dialog-box__history-entry" :key="entry.timestamp">
                <Transition appear name="trs-simple-fade" @after-enter="onAfterEnter(entry)">
                  <UiAccordion
                    :data-open="entry.isOpen"
                    :key="entry.timestamp"
                    :facets="[]"
                    :open="entry.isOpen"
                    :passive="true"
                  >
                    <template #body>
                      <component
                        :is="getResultComponent(entry.result)"
                        v-bind="entry.result"
                        @choose="onOptionChosen($event)"
                      />
                    </template>
                  </UiAccordion>
                </Transition>
              </li>
            </ul>
          </div>
          <div class="c-dialog-box__actions">
            <button
              :disabled="isAdvanceDisabled"
              class="c-dialog-box__advance btn btn--primary btn--small"
              @click="advance"
            >
              weiter
            </button>
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

  .c-dialog-box__history-entry {
    display: block;
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
