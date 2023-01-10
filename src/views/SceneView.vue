<script lang="ts" setup>
  // @ts-ignore
  import YarnBound from 'yarn-bound/src'
  import { computed, onMounted, ref, watch } from 'vue'
  import useGameScene from '@/composables/GameScene/GameScene'

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

  watch(content, () => {
    if (content.value?.dialogue.code) {
      runner.value = new YarnBound({
        dialogue: content.value?.dialogue.code,
      } as YarnBoundOptions)

      console.log(runner.value.currentResult)
    }
  }, { immediate: true })
</script>

<template>
  <div class="about">
    <h1>Intro:</h1>
    <span>scene: {{ scene }}</span>

    <br>

    <details>
      <summary>Raw content</summary>
      <pre>{{ content }}</pre>
    </details>

    <br>

    <div v-if="content">
      <p v-if="runner" v-text="runner.currentResult.text"/>
      <img :src="content.illustration" alt="">
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
