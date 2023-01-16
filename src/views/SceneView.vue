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
  import useTranslation from '@/composables/Translation/Translation'

  const { t } = useTranslation()
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
                :outer-height="height"
                :outer-width="width"
                class="p-page-scene__responsive-shell u-typography-root"
              >
                <ul class="u-reset p-page-scene__image-tooltip-list">
                  <li
                    v-for="(hotspot, hotspotIdx) in dialog.hotspots"
                    :key="hotspotIdx"
                    class="p-page-scene__image-tooltip-entry"
                  >
                    <ImageMapTooltip
                      :height="height"
                      :hotspot="hotspot"
                      :width="width"
                      @action="onActionRequested(hotspot)"
                    >
                      <template #default="{ label }">
                        {{ t(label) }}
                      </template>
                    </ImageMapTooltip>
                  </li>
                </ul>
              </ResponsiveShell>
              <div v-if="isDebug" class="s-container s-container--full-width">
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
