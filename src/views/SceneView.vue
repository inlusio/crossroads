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

      console.log(runner.currentResult)
    }
  }, { immediate: true })
</script>

<template>
  <div class="about">
    <h1>Intro:</h1>
    <span>scene: {{ scene }}</span>
    <pre>{{ content }}</pre>

    <div v-if="content">
      <img :src="content.illustration" alt="">
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
