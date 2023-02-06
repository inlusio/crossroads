<script lang="ts" setup>
  import { RouterView } from 'vue-router'
  import { useBootstrapStore } from '@/stores/Bootstrap'

  useBootstrapStore()
</script>

<template>
  <header>
    <!--<img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />-->

    <div class="s-app__wrapper">
      <nav>
        <!--<RouterLink to="/">Home</RouterLink>-->
        <!--<pre>{{ transitionName }}</pre>-->
      </nav>
    </div>
  </header>

  <!--  <RouterView class="s-app__main">-->
  <!--    <template #default="{ Component }">-->
  <!--      <Transition :name="transitionName" :mode="transitionMode">-->
  <!--        <Component :is="Component" :key="sceneParam" />-->
  <!--      </Transition>-->
  <!--    </template>-->
  <!--  </RouterView>-->

  <RouterView class="s-app__main" />
</template>

<style lang="scss" scoped></style>
