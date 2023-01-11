//@ts-ignore
import YarnBound from 'yarn-bound/src'
import type { GameSceneId } from '@/models/GameScene/GameScene'
import type { DialogVariableStorage } from '@/models/DialogStorage/DialogStorage'

export interface Dialog {
  isReady: boolean
  sceneId: GameSceneId | undefined
  runner: YarnBound | null
  variables: DialogVariableStorage
}
