<script lang="ts" setup>
  import { UiIconId, UiIconSizeId } from '@/models/UiIcon/UiIcon'
  import { RouteRecordId } from '@/models/RouteRecord/RouteRecord'
  import UiIcon from '@/components/UiIcon/UiIcon.vue'
  import useFullscreenController from '@/composables/FullscreenController/FullscreenController'
  import { computed } from 'vue'
  import useBem from '@/composables/Bem/Bem'
  import type { UseBemProps } from '@/composables/Bem/BemFacetOptions'
  import useTranslation from '@/composables/Translation/Translation'
  import useAudioController from '@/composables/AudioController/AudioController'

  interface Props extends UseBemProps {
    facets?: Array<string>
  }

  const props = defineProps<Props>()
  const { t } = useTranslation()
  const { bemFacets } = useBem('c-c-main-actions-nav', props, {})
  const { showFullscreen, toggleFullscreen } = useFullscreenController()
  const { allowAudio, toggleAllowAudio } = useAudioController()

  const audioIcon = computed<UiIconId>(() => {
    return allowAudio.value ? UiIconId.VolumeUp : UiIconId.VolumeOff
  })

  const fullscreenIcon = computed<UiIconId>(() => {
    return showFullscreen.value ? UiIconId.FullscreenExit : UiIconId.Fullscreen
  })

  const fullscreenBtnClasses = computed<Array<string>>(() => {
    return [showFullscreen.value ? 'u-toggle' : '']
  })
</script>

<template>
  <div class="c-main-actions-nav u-typography-root" :class="bemFacets">
    <ul class="c-main-actions-nav__list u-reset">
      <li class="c-main-actions-nav__entry">
        <button
          @click="toggleAllowAudio()"
          class="c-main-actions-nav__btn btn btn--icon-medium btn--bubble btn--highlight"
        >
          <UiIcon :key="audioIcon" :id="audioIcon" :colorize="true" :size="UiIconSizeId.Medium" />
          <span class="s-tooltip-label c-main-actions-nav__btn-tooltip">
            <template v-if="allowAudio">
              {{ t('main_actions_nav.audio_on') }}
            </template>
            <template v-else>
              {{ t('main_actions_nav.audio_off') }}
            </template>
          </span>
        </button>
      </li>
      <li class="c-main-actions-nav__entry">
        <button
          @click="toggleFullscreen"
          class="c-main-actions-nav__btn btn btn--icon-medium btn--bubble btn--highlight"
          :class="fullscreenBtnClasses"
        >
          <UiIcon :key="fullscreenIcon" :id="fullscreenIcon" :colorize="true" :size="UiIconSizeId.Medium" />
          <span class="s-tooltip-label c-main-actions-nav__btn-tooltip">
            <template v-if="showFullscreen">
              {{ t('main_actions_nav.fullscreen_on') }}
            </template>
            <template v-else>
              {{ t('main_actions_nav.fullscreen_off') }}
            </template>
          </span>
        </button>
      </li>
      <li class="c-main-actions-nav__entry">
        <RouterLink
          :to="{ name: RouteRecordId.Home }"
          class="c-main-actions-nav__btn btn btn--icon-medium btn--bubble btn--highlight"
        >
          <UiIcon :id="UiIconId.QuestionMark" :colorize="true" :size="UiIconSizeId.Medium" />
          <span class="s-tooltip-label c-main-actions-nav__btn-tooltip">
            {{ t('main_actions_nav.to_home') }}
          </span>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
  @use '@nirazul/scss-utils' as utils;

  .c-main-actions-nav__list {
    display: flex;
    flex-flow: row nowrap;
    gap: 8px;
  }

  .c-main-actions-nav__btn {
    position: relative;
    cursor: pointer;

    &:disabled {
      cursor: not-allowed;
    }

    @include utils.has-focus {
      &:not(:disabled) {
        .c-main-actions-nav__btn-tooltip {
          opacity: 1;
        }
      }
    }
  }

  .c-main-actions-nav__btn-tooltip {
    pointer-events: none;
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    opacity: 0;
  }
</style>
