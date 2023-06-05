<script lang="ts" setup>
  import useDialog from '@/composables/Dialog/Dialog'
  import { useRouter } from 'vue-router'
  import useRouteRecord from '@/composables/RouteRecord/RouteRecord'
  import { RouteRecordId } from '@/models/RouteRecord/RouteRecord'
  import useAudioController from '@/composables/AudioController/AudioController'
  import { computed, ref, watch } from 'vue'
  import type { CSSProperties } from 'vue'
  import DotLoader from '@/components/DotLoader/DotLoader.vue'
  import useGameStory from '@/composables/GameStory/GameStory'
  import useTranslation from '@/composables/Translation/Translation'
  import useTaleDeckApi from '@/composables/TaleDeckApi/TaleDeckApi'

  const SCENE_INTRO = 'intro'
  const SCENE_MAP = 'map'

  const router = useRouter()
  const { t } = useTranslation()
  const { toRoute } = useRouteRecord()
  const { dialog, reset: resetDialog } = useDialog()
  const { reset: resetAudio } = useAudioController()
  const { storyEntry } = useGameStory()
  const { getFile } = useTaleDeckApi()

  const isLoaded = ref<boolean>(false)

  const rootStyles = computed<CSSProperties>(() => {
    const img = storyEntry.value?.story_image
    const url = img == null ? '' : getFile(img)

    return {
      'background-image': `url(${url})`,
    }
  })

  watch(
    () => storyEntry.value,
    (nVal) => {
      if (nVal != null) {
        isLoaded.value = true
      }
    },
    { immediate: true },
  )

  const onReset = () => {
    resetDialog()
    resetAudio()

    router.push(
      toRoute({
        name: RouteRecordId.Scene,
        params: { scene: SCENE_INTRO },
      }),
    )
  }
</script>

<template>
  <main class="p-page-home s-layout-content" :style="rootStyles">
    <div class="s-layout-content__main">
      <div class="s-container s-container--primary">
        <div class="s-container__container p-page-home__main">
          <div class="p-page-home__content u-typography-root">
            <div class="p-page-home__top" v-if="isLoaded">
              <h1 class="p-page-home__title">
                {{ storyEntry?.story_title }}
              </h1>
              <span class="p-page-home__subtitle">
                {{ storyEntry?.story_tagline }}
              </span>
            </div>
            <div class="p-page-home__details">
              <!-- <pre style="font-size: 1rem" v-text="story" /> -->
              <div class="p-page-home__actions" v-if="isLoaded">
                <template v-if="dialog.hasStarted">
                  <RouterLink
                    class="u-reset btn btn--medium btn--highlight"
                    :to="{ name: 'scene', params: { scene: SCENE_MAP } }"
                  >
                    Story fortsetzen
                  </RouterLink>
                  <button @click="onReset" class="u-reset btn btn--medium btn--highlight">Story neustarten</button>
                </template>
                <template v-else>
                  <RouterLink
                    class="u-reset btn btn--medium btn--highlight"
                    :to="{ name: 'scene', params: { scene: SCENE_INTRO } }"
                  >
                    Story starten
                  </RouterLink>
                </template>
              </div>
              <div class="p-page-home__actions" v-if="isLoaded && dialog.hasStarted">
                <a href="https://ww2.unipark.de/uc/crossroads/" class="u-reset btn btn--medium btn--highlight">
                  Zur Umfrage
                </a>
              </div>
              <div class="p-page-home__loading" v-if="!isLoaded">
                <b>
                  {{ t('general.loading') }}
                </b>
                <button @click="onReset" class="u-reset btn btn--medium btn--highlight" disabled>
                  <DotLoader :facets="['dark']" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
  @use '@/assets/scss/util/color/color' as col;
  @use '@/assets/scss/base/typography/typography' as type;

  .p-page-home {
    background-size: cover;
    background-position: center center;
    background-color: col.$monochrome-magnet;

    background-blend-mode: multiply;
  }

  .p-page-home__main {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: stretch;
  }

  .p-page-home__title {
    margin-bottom: 4px;
  }

  .p-page-home__subtitle {
    @include type.h2;
    display: block;
    margin-bottom: 40px;
  }

  .p-page-home__intro {
    max-width: 600px;
    margin-bottom: 32px;
    color: col.$monochrome-white;
  }

  .p-page-home__details {
    display: flex;
    flex-flow: column nowrap;
    gap: 32px;
  }

  .p-page-home__actions {
    display: flex;
    flex-flow: row nowrap;
    gap: 12px;
  }

  .p-page-home__loading {
    position: relative;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    gap: 12px;
  }
</style>
