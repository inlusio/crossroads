import { DialogResultOptionListFacet } from '@/models/DialogResultOptionListFacet/DialogResultOptionListFacet'

export enum DialogResultType {
  End = 'End',
  Text = 'TextResult',
  Options = 'OptionsResult',
  Command = 'CommandResult',
}

export interface DialogResultMetadata {
  title: string
  position?: string
  options?: keyof typeof DialogResultOptionListFacet
  filetags?: Array<string>
}

export interface DialogResultMarkup {
  name: string
  properties: Record<string, string>
}

export interface DialogResultOptionEntryData {
  text: string
  isAvailable: boolean
  markup: Array<DialogResultMarkup>
}

export interface DialogResultCommandData {
  command: string
  metadata: DialogResultMetadata
  hashtags: Array<string>
}

export interface DialogResultOptionListData {
  options: Array<DialogResultOptionEntryData>
  metadata: DialogResultMetadata
}

export interface DialogResultTextData {
  text: string
  metadata: DialogResultMetadata
  hashtags: Array<string>
  markup: Array<DialogResultMarkup>
}
