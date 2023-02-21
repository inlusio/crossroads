<script lang="ts" setup>
  import useAudioController from '@/composables/AudioController/AudioController'

  const { allowAudio, interactionOccured, audioChannels } = useAudioController()
</script>

<template>
  <div class="debug-panel">
    <pre><b>Allow audio:</b> {{ allowAudio }}</pre>
    <pre><b>Interaction occured:</b> {{ interactionOccured }}</pre>
    <br />
    <pre><b>Channels:</b></pre>
    <pre v-for="channel in audioChannels" :key="channel.label" v-text="channel" />
  </div>
</template>

<style lang="scss" scoped>
  @use '@/assets/scss/util/color/color' as col;

  .debug-panel {
    z-index: 1000;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    padding: 4px;
    overflow-y: auto;
    font-size: 1.2rem;
    color: col.$monochrome-white;
    background-color: col.$monochrome-black;
  }
</style>
