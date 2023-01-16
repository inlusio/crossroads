// @ts-ignore
import { _GameSceneId as GameSceneId } from '@/generated/model/GameSceneId/GameSceneId'

export { GameSceneId }

export interface GameSceneCode {
  code: string
}

export interface GameSceneContent {
  id: GameSceneId
  name: string
  dialogue: GameSceneCode
  illustration: string
}
