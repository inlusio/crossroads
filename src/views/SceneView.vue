<script lang="ts" setup>
  // @ts-ignore
  import YarnBound from 'yarn-bound/src'
  import dialogue from '../assets/yarn/test.yarn?raw'
  import { onMounted } from 'vue'
  import { useRoute } from 'vue-router'

  interface YarnBoundOptions {
    dialogue: string
    startAt?: string
    functions?: Record<string, (...args: Array<unknown>) => unknown>
    variableStorage?: unknown
    handleCommand?: (...args: Array<unknown>) => unknown
    combineTextAndOptionsResults?: boolean
    locale?: string
  }

  const route = useRoute()

  onMounted(() => {
    const runner = new YarnBound({
      dialogue,
    } as YarnBoundOptions)

    console.log(runner.currentResult)
  })
</script>

<template>
  <div class="about">
    <h1>Intro:</h1>
    <span>scene: {{ route.params.scene }}</span>
  </div>
</template>

<style lang="scss" scoped></style>
