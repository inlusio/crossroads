import type { Ref } from 'vue'
import { useGameDataStore } from '@/stores/GameData'
import { storeToRefs } from 'pinia'
import type { TaleDeckAudioOverview, TaleDeckSceneOverview, TaleDeckStory } from '@/models/TaleDeck/TaleDeck'

export default function useGameStory() {
  const gameDataStore = useGameDataStore()
  const { audioOverviewList, sceneOverviewList, storyEntry, storyId } = storeToRefs(gameDataStore)

  return {
    storyEntry: storyEntry as Ref<TaleDeckStory | null>,
    storyId: storyId as Ref<number | null>,
    sceneOverviewList: sceneOverviewList as Ref<Array<TaleDeckSceneOverview>>,
    audioOverviewList: audioOverviewList as Ref<Array<TaleDeckAudioOverview>>,
  }
}
