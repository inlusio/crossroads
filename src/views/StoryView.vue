<script lang="ts" setup></script>

<template>
  <main>
    <h1>Story</h1>
    <RouterLink :to="{ name: 'scene', params: { scene: 'intro' } }">
      to scene: intro
    </RouterLink>
  </main>
</template>

<style scoped lang="scss"></style>
