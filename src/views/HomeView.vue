<script lang="ts" setup>
  import useDialog from '@/composables/Dialog/Dialog'
  import { useRouter } from 'vue-router'
  import useRouteRecord from '@/composables/RouteRecord/RouteRecord'
  import { RouteRecordId } from '@/models/RouteRecord/RouteRecord'
  import { GameSceneId } from '@/models/GameScene/GameScene'

  const router = useRouter()
  const { toRoute } = useRouteRecord()
  const { dialog, resetDialog } = useDialog()

  const onReset = () => {
    resetDialog()
    router.push(
      toRoute({
        name: RouteRecordId.Scene,
        params: { scene: GameSceneId.Intro },
      }),
    )
  }
</script>

<template>
  <main class="p-page-home s-layout-content">
    <div class="s-layout-content__main">
      <div class="s-container s-container--primary">
        <div class="s-container__container p-page-home__main">
          <div class="p-page-home__content u-typography-root">
            <h1 class="p-page-home__title">«Crossroads»</h1>
            <span class="p-page-home__subtitle"> Die Suche nach der verschwundenen Wissenschaftlerin Mrs. Bloom </span>

            <!--
            <div class="p-page-home__intro">
              <p>
                Vorbemerkung: Bei dem folgenden Spiel handelt es sich um einen ersten Prototypen, um die Story und erste
                Spielmechaniken von «Crossroads» zu testen. Vielen Dank für eure Teilnahme an der Erprobung und viel
                Glück bei der Suche nach Mrs. Bloom.
              </p>
            </div>
            -->

            <div class="p-page-home__actions">
              <template v-if="dialog.hasStarted">
                <RouterLink
                  class="u-reset btn btn--medium btn--highlight"
                  :to="{ name: 'scene', params: { scene: GameSceneId.Map } }"
                >
                  Story fortsetzen
                </RouterLink>
                <button @click="onReset" class="u-reset btn btn--medium btn--highlight">Story neustarten</button>
              </template>
              <template v-else>
                <RouterLink
                  class="u-reset btn btn--medium btn--highlight"
                  :to="{ name: 'scene', params: { scene: GameSceneId.Intro } }"
                >
                  Story starten
                </RouterLink>
              </template>
            </div>
            <div class="p-page-home__actions" v-if="dialog.hasStarted">
              <a href="https://ww2.unipark.de/uc/crossroads/" class="u-reset btn btn--medium btn--highlight">
                Zur Umfrage
              </a>
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
    background-image: url('/image/static/bg.jpg');
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

  .p-page-home__actions {
    display: flex;
    flex-flow: row nowrap;
    gap: 12px;

    ~ .p-page-home__actions {
      margin-top: 32px;
    }
  }
</style>
