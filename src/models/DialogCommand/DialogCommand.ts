import type arg from 'arg'
import { dialogCommandSpecAddHotspot } from '@/models/DialogCommand/DialogCommandAddHotspot'
import { dialogCommandSpecPlayAudio } from '@/models/DialogCommand/DialogCommandPlayAudio'

export enum DialogBool {
  True = 'true',
  False = 'false',
}

export enum DialogCommandId {
  Test = 'test',
  AddHint = 'hint',
  AddHotspot = 'hotspot',
  GotoExternal = 'external',
  GotoRoute = 'page',
  GotoScene = 'scene',
  Jump = 'jump',
  ShowHotspot = 'show_hotspot',
  PlayAudio = 'audio',
}

export interface DialogCommandEntry {
  id: DialogCommandId
  spec: arg.Spec
}

export type DialogCommandList = Array<DialogCommandEntry>
export type DialogCommandDict = Record<DialogCommandId, DialogCommandEntry>

export const dialogCommandList: DialogCommandList = [
  {
    id: DialogCommandId.Test,
    spec: {},
  },
  {
    id: DialogCommandId.AddHint,
    spec: {},
  },
  {
    id: DialogCommandId.AddHotspot,
    spec: dialogCommandSpecAddHotspot,
  },
  {
    id: DialogCommandId.GotoExternal,
    spec: {},
  },
  {
    id: DialogCommandId.GotoRoute,
    spec: {},
  },
  {
    id: DialogCommandId.GotoScene,
    spec: {},
  },
  {
    id: DialogCommandId.Jump,
    spec: {},
  },
  {
    id: DialogCommandId.ShowHotspot,
    spec: {},
  },
  {
    id: DialogCommandId.PlayAudio,
    spec: dialogCommandSpecPlayAudio,
  },
]

export const dialogCommandDict: DialogCommandDict = dialogCommandList.reduce((acc, entry) => {
  acc[entry.id] = entry
  return acc
}, {} as DialogCommandDict)
