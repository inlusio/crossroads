<script lang="ts" setup>
  import { UiIconId, UiIconSizeId } from '@/models/UiIcon/UiIcon'
  import { RouteRecordId } from '@/models/RouteRecord/RouteRecord'
  import UiIcon from '@/components/UiIcon/UiIcon.vue'
</script>

<template>
  <div class="main-actions-nav u-typography-root">
    <ul class="main-actions-nav__list u-reset">
      <li class="main-actions-nav__entry">
        <button class="btn btn--icon-medium btn--bubble btn--highlight">
          <UiIcon :id="UiIconId.Fullscreen" :colorize="true" :size="UiIconSizeId.Medium" />
        </button>
      </li>
      <li class="main-actions-nav__entry">
        <RouterLink :to="{ name: RouteRecordId.Home }" class="btn btn--icon-medium btn--bubble btn--highlight">
          <UiIcon :id="UiIconId.QuestionMark" :colorize="true" :size="UiIconSizeId.Medium" />
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
  .main-actions-nav__list {
    display: flex;
    flex-flow: row nowrap;
    gap: 8px;
  }
</style>
