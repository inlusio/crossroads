import type arg from 'arg'

export interface DialogCommandSpecGeneric extends arg.Spec {}

export type DialogCommandResultGeneric = arg.Result<DialogCommandSpecGeneric> & {}

export const dialogCommandSpecGeneric: arg.Spec = {}
