<script lang="ts" setup>
  import useAudioController from '@/composables/AudioController/AudioController'

  const { allowAudio, interactionOccured, audioChannels } = useAudioController()
</script>

<template>
  <div class="debug-panel">
    <pre><b>Allow audio:</b> {{ allowAudio }}</pre>
    <br />
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
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    padding: 4px;
    font-size: 1.2rem;
    color: col.$monochrome-white;
    background-color: col.$monochrome-black;
  }
</style>
