//@ts-ignore
import YarnBound from 'yarn-bound/src'
import type { DialogVariableStorage } from '@/models/DialogVariable/DialogVariable'
import type { DialogHotspot } from '@/models/DialogHotspot/DialogHotspot'
import type { Ref, UnwrapNestedRefs } from 'vue'

export interface Dialog {
  hotspots: Ref<Array<DialogHotspot>>
  isReady: boolean
  sceneId: string | undefined
  runner: YarnBound | null
  hasStarted: Ref<boolean>
  variables: Ref<DialogVariableStorage>
}

export type ReactiveDialog = UnwrapNestedRefs<Dialog>
