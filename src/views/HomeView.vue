<script lang="ts" setup></script>

<template>
  <main class="p-page-home s-layout-content">
    <div class="s-layout-content__main">
      <div class="s-container s-container--primary">
        <div class="s-container__container p-page-home__main">
          <div class="p-page-home__content u-typography-root">
            <h1 class="p-page-home__title">«Crossroads»</h1>
            <span class="p-page-home__subtitle"> Die Suche nach der verschwundenen Wissenschaftlerin Mrs. Bloom </span>

            <RouterLink class="u-reset btn btn--medium btn--highlight" to="/story"> Weiter zur Story</RouterLink>
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
    margin-bottom: 32px;
  }
</style>
