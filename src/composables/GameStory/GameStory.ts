import type { Ref } from 'vue'
import { useGameDataStore } from '@/stores/GameData'
import { storeToRefs } from 'pinia'
import type { TaleJamSceneOverview, TaleJamStory } from '@/models/TaleJam/TaleJam'

export default function useGameStory() {
  const gameDataStore = useGameDataStore()
  const { sceneList, storyEntry, storyId } = storeToRefs(gameDataStore)

  return {
    storyEntry: storyEntry as Ref<TaleJamStory | null>,
    storyId: storyId as Ref<number | null>,
    sceneList: sceneList as Ref<Array<TaleJamSceneOverview>>,
  }
}
