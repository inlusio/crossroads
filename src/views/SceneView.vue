<script lang="ts" setup>
  //@ts-ignore
  import YarnBound from 'yarn-bound/src'
  import useGameScene from '@/composables/GameScene/GameScene'
  import { ViewShellFacet } from '@/components/ViewShell/ViewShellFacet'
  import ViewShell from '@/components/ViewShell/ViewShell.vue'
  import DialogBox from '@/components/DialogBox/DialogBox.vue'
  import useDialog from '@/composables/Dialog/Dialog'

  const { content, scene } = useGameScene()
  const { dialog } = useDialog()
</script>

<template>
  <main class="p-page-scene s-layout-game s-layout-game--has-header">
    <div class="s-layout-game__main">
      <div class="s-layout-game__viewer">
        <div v-if="content" class="s-layout-game__viewer-frame">
          <ViewShell :background="content.illustration" :facets="[ViewShellFacet.Scene]" :height="900" :width="1600">
            <template #content="{ width, height }">
              <div class="s-container s-container--full-width">
                <div class="s-container__container">
                  <span>scene: {{ scene }}</span>
                  <br />
                  <details>
                    <summary>Raw content</summary>
                    <pre>{{ content }}</pre>
                  </details>
                </div>
              </div>
            </template>
          </ViewShell>
        </div>
      </div>
      <div class="s-layout-game__dialog-box">
        <DialogBox v-if="dialog.isReady" :key="dialog.sceneId" :runner="dialog.runner" />
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
