<script lang="ts" setup></script>

<template>
  <main class="p-page-story s-layout-content">
    <div class="s-layout-content__main">
      <div class="s-container s-container--primary">
        <div class="s-container__container p-page-story__main">
          <div class="p-page-story__content u-typography-root">
            <h1 class="p-page-story__title">«Crossroads»</h1>
            <span class="p-page-story__subtitle"> A Game for Cultural Awareness </span>

            <div class="p-page-story__intro">
              <p>
                Hier könnte ein Introtext stehen. <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi
                beatae blanditiis, consectetur consequatur consequuntur cupiditate dignissimos dolorem enim esse
                explicabo.</span>
              </p>
              <p>
                A accusantium, animi assumenda cupiditate dolorem error fugit harum laudantium
                magnam modi molestias mollitia odio provident quis, repellat sunt suscipit temporibus veniam vitae
                voluptate.
              </p>
            </div>

            <RouterLink :to="{ name: 'scene', params: { scene: 'intro' } }">
              Story starten
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
  @use '@/assets/scss/util/color/color' as col;
  @use '@/assets/scss/base/typography/typography' as type;

  .p-page-story {
    background-image: url('/public/image/static/bg.jpg');
    background-size: cover;
    background-position: center center;
    background-color: col.$monochrome-magnet;

    background-blend-mode: multiply;
  }

  .p-page-story__main {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: stretch;
  }

  .p-page-story__title {
    margin-bottom: 4px;
  }

  .p-page-story__subtitle {
    @include type.h2;
    display: block;
    margin-bottom: 32px;
  }

  .p-page-story__intro {
    max-width: 600px;
    margin-bottom: 20px;
    color: col.$monochrome-white;
  }
</style>
