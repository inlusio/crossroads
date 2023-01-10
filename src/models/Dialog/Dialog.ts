import type DialogResultText from '@/components/DialogResultText/DialogResultText.vue'
import type DialogResultCommand from '@/components/DialogResultCommand/DialogResultCommand.vue'
import type DialogResultOptions from '@/components/DialogResultOptionList/DialogResultOptionList.vue'

export type DialogResultComponent = DialogResultCommand | DialogResultOptions | DialogResultText

export enum DialogResultType {
  Text = 'TextResult',
  Options = 'OptionsResult',
  Command = 'CommandResult',
}

export interface DialogResultMetadata {
  title: string
  filetags: Array<string>
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
