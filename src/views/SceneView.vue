<script lang="ts" setup>
  //@ts-ignore
  import YarnBound from 'yarn-bound/src'
  import useGameScene from '@/composables/GameScene/GameScene'
  import { ViewShellFacet } from '@/components/ViewShell/ViewShellFacet'
  import ViewShell from '@/components/ViewShell/ViewShell.vue'
  import DialogBox from '@/components/DialogBox/DialogBox.vue'
  import useDialog from '@/composables/Dialog/Dialog'
  import useDebug from '@/composables/Debug/Debug'
  import ImageMapTooltip from '@/components/ImageMapTooltip/ImageMapTooltip.vue'
  import ResponsiveShell from '@/components/ResponsiveShell/ResponsiveShell.vue'
  import type { DialogHotspot } from '@/models/DialogHotspot/DialogHotspot'
  import useDialogCommand from '@/composables/DialogCommand/DialogCommand'

  const { content, scene } = useGameScene()
  const { dialog } = useDialog()
  const { isDebug } = useDebug()
  const { handleCommand } = useDialogCommand(dialog)

  const onActionRequested = (hotspot: DialogHotspot) => {
    handleCommand(hotspot.commandData)
  }
</script>

<template>
  <main class="p-page-scene s-layout-game s-layout-game--has-header">
    <div class="s-layout-game__main">
      <div class="s-layout-game__viewer">
        <div v-if="content" class="s-layout-game__viewer-frame">
          <ViewShell :background="content.illustration" :facets="[ViewShellFacet.Scene]" :height="900" :width="1600">
            <template #content="{ width, height }">
              <ResponsiveShell
                :outer-width="width"
                :outer-height="height"
                class="p-page-scene__responsive-shell u-typography-root"
              >
                <ul class="u-reset p-page-scene__image-tooltip-list">
                  <li
                    class="p-page-scene__image-tooltip-entry"
                    v-for="(hotspot, hotspotIdx) in dialog.hotspots"
                    :key="hotspotIdx"
                  >
                    <ImageMapTooltip
                      @action="onActionRequested(hotspot)"
                      :width="width"
                      :hotspot="hotspot"
                      :height="height"
                    />
                  </li>
                </ul>
              </ResponsiveShell>
              <div class="s-container s-container--full-width" v-if="isDebug">
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
  @use '@nirazul/scss-utils' as utils;

  .p-page-scene {
    display: flex;
    flex-flow: column nowrap;
  }

  .p-page-scene__responsive-shell {
    @include utils.overlay;
    pointer-events: none;
  }
</style>
