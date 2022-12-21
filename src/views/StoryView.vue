<script lang="ts" setup>
  // @ts-ignore
  import YarnBound from 'yarn-bound/src'
  import dialogue from '../assets/yarn/test.yarn?raw'
  import { onMounted } from 'vue'

  interface YarnBoundOptions {
    dialogue: string
    startAt?: string
    functions?: Record<string, (...args: Array<unknown>) => unknown>
    variableStorage?: unknown
    handleCommand?: (...args: Array<unknown>) => unknown
    combineTextAndOptionsResults?: boolean
    locale?: string
  }

  onMounted(() => {
    const runner = new YarnBound({
      dialogue,
    } as YarnBoundOptions)

    console.log(runner.currentResult)
  })
</script>

<template>
  <div class="about">
    <h1>Story</h1>
  </div>
</template>

<style lang="scss" scoped></style>
