<script lang="ts" setup>
  import { RouterView } from 'vue-router'
  import { useBootstrapStore } from '@/stores/Bootstrap'
  import useAudioController from '@/composables/AudioController/AudioController'
  import { onBeforeUnmount, onMounted } from 'vue'
  import useGameStory from '@/composables/GameStory/GameStory'

  useBootstrapStore()
  const { storyId } = useGameStory()
  const { interactionOccured } = useAudioController()

  storyId.value = Number(import.meta.env.VITE_TALE_DECK_STORY_ID)

  const setInteractionOccured = () => {
    interactionOccured.value = true
    document.removeEventListener('click', setInteractionOccured)
  }

  onMounted(() => {
    document.addEventListener('click', setInteractionOccured)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('click', setInteractionOccured)
  })
</script>

<template>
  <header>
    <div class="s-app__wrapper">
      <nav />
    </div>
  </header>

  <RouterView class="s-app__main" />
</template>

<style lang="scss" scoped></style>
