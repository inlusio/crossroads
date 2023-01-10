<script lang="ts" setup>
  // @ts-ignore
  import YarnBound from 'yarn-bound/src'
  import { ref, watch } from 'vue'
  import useGameScene from '@/composables/GameScene/GameScene'
  import { ViewShellFacet } from '@/components/ViewShell/ViewShellFacet'
  import ViewShell from '@/components/ViewShell/ViewShell.vue'

  interface YarnBoundOptions {
    dialogue: string
    startAt?: string
    functions?: Record<string, (...args: Array<unknown>) => unknown>
    variableStorage?: unknown
    handleCommand?: (...args: Array<unknown>) => unknown
    combineTextAndOptionsResults?: boolean
    locale?: string
  }

  const { content, scene } = useGameScene()

  const runner = ref<YarnBound | null>(null)

  watch(
    content,
    () => {
      if (content.value?.dialogue.code) {
        runner.value = new YarnBound({
          dialogue: content.value?.dialogue.code,
        } as YarnBoundOptions)

        console.log(runner.value.currentResult)
      }
    },
    { immediate: true },
  )
</script>

<template>
  <main class="p-page-scene s-layout-game">
    <div class="s-layout-game__main">
      <div class="s-layout-game__viewer">
        <div v-if="content" class="s-layout-game__viewer-frame">
          <ViewShell :background="content.illustration" :facets="[ViewShellFacet.Scene]" :height="900" :width="1600">
            <template #content="{ width, height }">
              <div class="s-container s-container--full-width">
                <div class="s-container__container p-page-story__main">
                  <h1>Intro:</h1>
                  <span>scene: {{ scene }}</span>

                  <br />

                  <details>
                    <summary>Raw content</summary>
                    <pre>{{ content }}</pre>
                  </details>

                  <br />

                  <div v-if="content">
                    <p v-if="runner" v-text="runner.currentResult.text" />
                    <!--                  <img :src="content.illustration" alt="" />-->
                  </div>
                </div>
              </div>
            </template>
          </ViewShell>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
  .p-page-scene {
    display: flex;
    flex-flow: column nowrap;
  }
</style>
