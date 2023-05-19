<script lang="ts" setup>
  import useAudioController from '@/composables/AudioController/AudioController'
  import useGameStory from '@/composables/GameStory/GameStory'

  const { allowAudio, interactionOccured, audioChannels } = useAudioController()
  const { audioOverviewList, sceneOverviewList } = useGameStory()
</script>

<template>
  <div class="debug-panel">
    <pre class="debug-panel__item"><b>Allow audio:</b> {{ allowAudio ? 'true' : 'false' }}</pre>
    <pre class="debug-panel__item"><b>Interaction occured:</b> {{ interactionOccured ? 'true' : 'false' }}</pre>
    <details>
      <summary><b>Audio channels:</b></summary>
      <pre v-for="channel in audioChannels" :key="channel.label" v-text="channel" />
    </details>
    <details>
      <summary><b>Scene List:</b></summary>
      <pre>{{ sceneOverviewList }}</pre>
    </details>
    <details>
      <summary><b>Audio List:</b></summary>
      <pre>{{ audioOverviewList }}</pre>
    </details>
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

  details {
    padding: 0.5em 0.5em 0;
  }

  .debug-panel__item {
    padding: 0.5em;
  }

  details,
  .debug-panel__item {
    border: 1px solid #aaa;
    border-radius: 4px;

    ~ details,
    ~ .debug-panel__item {
      margin-top: 4px;
    }
  }

  summary {
    font-weight: bold;
    margin: -0.5em -0.5em 0;
    padding: 0.5em;
  }

  details[open] {
    padding: 0.5em;
  }

  details[open] summary {
    border-bottom: 1px solid #aaa;
    margin-bottom: 0.5em;
  }
</style>
