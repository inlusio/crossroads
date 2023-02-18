<script lang="ts" setup>
  import { RouterView } from 'vue-router'
  import { useBootstrapStore } from '@/stores/Bootstrap'
  import AudioPlayer from '@/components/AudioPlayer/AudioPlayer.vue'
  import useAudioController from '@/composables/AudioController/AudioController'

  useBootstrapStore()
  const { audioChannels } = useAudioController()
</script>

<template>
  <AudioPlayer v-for="channel in audioChannels" :key="`${channel.label}::${channel.file}`" :channel="channel" />

  <header>
    <div class="s-app__wrapper">
      <nav />
    </div>
  </header>

  <RouterView class="s-app__main" />
</template>

<style lang="scss" scoped></style>
