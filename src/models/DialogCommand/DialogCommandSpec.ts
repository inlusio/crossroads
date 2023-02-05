import type arg from 'arg'

export interface DialogCommandSpecAddHotspot extends arg.Spec {
  '--x': arg.Handler<number>
  '--y': arg.Handler<number>
  '--click': [arg.Handler<string>]
}

interface DialogCommandResult {
  _: Array<string>
}

export interface DialogCommandResultAddHotspot extends DialogCommandResult {
  x: number
  y: number
  click: Array<string>
}

export const dialogCommandSpecAddHotspot: arg.Spec = {
  '--x': Number,
  '--y': Number,
  '--click': [String],
  '-x': '--x',
  '-y': '--y',
}
