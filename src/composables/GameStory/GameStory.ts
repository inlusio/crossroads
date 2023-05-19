import type { Ref } from 'vue'
import { useGameDataStore } from '@/stores/GameData'
import { storeToRefs } from 'pinia'
import type { TaleJamAudioOverview, TaleJamSceneOverview, TaleJamStory } from '@/models/TaleJam/TaleJam'

export default function useGameStory() {
  const gameDataStore = useGameDataStore()
  const { audioOverviewList, sceneOverviewList, storyEntry, storyId } = storeToRefs(gameDataStore)

  return {
    storyEntry: storyEntry as Ref<TaleJamStory | null>,
    storyId: storyId as Ref<number | null>,
    sceneOverviewList: sceneOverviewList as Ref<Array<TaleJamSceneOverview>>,
    audioOverviewList: audioOverviewList as Ref<Array<TaleJamAudioOverview>>,
  }
}
