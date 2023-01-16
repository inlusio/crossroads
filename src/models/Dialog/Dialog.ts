//@ts-ignore
import YarnBound from 'yarn-bound/src'
import type { GameSceneId } from '@/models/GameScene/GameScene'
import type { DialogVariableStorage } from '@/models/DialogStorage/DialogStorage'
import type { DialogHotspot } from '@/models/DialogHotspot/DialogHotspot'

export interface Dialog {
  isReady: boolean
  sceneId: GameSceneId | undefined
  runner: YarnBound | null
  hasStarted: boolean
  variables: DialogVariableStorage
  hotspots: Array<DialogHotspot>
}
